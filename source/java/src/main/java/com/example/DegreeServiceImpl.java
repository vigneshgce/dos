package com.example;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.common.base.Optional;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.CacheStats;
import com.google.common.cache.LoadingCache;

@Service("degreeService")
public class DegreeServiceImpl implements DegreeService {
	private static final RestTemplate restTemplate;
	static {
		HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory(
				HttpClientBuilder.create().build());
		restTemplate = new RestTemplate(clientHttpRequestFactory);
	}

	private static LoadingCache<String, Optional<EntityObj>> cache = CacheBuilder.newBuilder().maximumSize(30000)
			.expireAfterAccess(24, TimeUnit.HOURS).recordStats().build(new CacheLoader<String, Optional<EntityObj>>() {
				@Override
				public Optional<EntityObj> load(String s) throws IOException {
					return geMvitEntity(s);
				}
			});

	public static CacheStats getCacheStats() {
		return cache.stats();
	}

	static String endPoint = "http://data.moviebuff.com/";
	List<EntityObj> successors1 = null;
	List<EntityObj> successors2 = null;
	List<String> degrees = null;
	static int counter = 0;

	public Map<String, Object> getDegress(String actorurl1, String actorurl2)
			throws JsonProcessingException, IOException, ExecutionException {
		int count = 0;
		Map<String, Object> response = new HashMap<String, Object>();
		Map<String, Object> result = processData(actorurl1, actorurl2);
		if (result != null && !result.isEmpty()) {
			count = (int) result.get("COUNT");
			EntityObj personData = (EntityObj) result.get("INTROBJ");
			EntityObj referencePerson = (EntityObj) result.get("REFER");
			degrees.add("" + personData.getMovieUrl() + ":" + personData.getName() + ":" + referencePerson.getName());
		}
		response.put("COUNT", count);
		response.put("DEGREES", degrees);
		return response;
	}

	private Map<String, Object> processData(String actorurl1, String actorurl2) {
		Map<String, Object> result = new HashMap<String, Object>();
		successors1 = new ArrayList<EntityObj>();
		successors2 = new ArrayList<EntityObj>();
		degrees = new ArrayList<String>();
		counter = 0;
		EntityObj actor1 = geMvitEntityWrapper(actorurl1);
		EntityObj actor2 = geMvitEntityWrapper(actorurl2);
		int count = 1;
		CacheStats cacheStatus = getCacheStats();
		if (cacheStatus != null)
			System.out.println("cahce stats " + cacheStatus.toString());
		if (actor1 != null && actor2 != null) {
			if (actor1.getUrl().equals(actor2.getUrl())) {
				return null;
			}
			successors1.add(actor1);
			successors2.add(actor2);
			// System.out.println("name is " + actor1.getName()+"first movie ");
			while (!successors1.isEmpty() && !successors2.isEmpty()) {
				System.out.println("loop with   " + actor1.getName() + " and " + actor2.getName());
				successors1 = successor(successors1);
				EntityObj interSectItem1 = intersects(successors1, successors2);
				if (interSectItem1 != null) {
					result.put("COUNT", count);
					result.put("INTROBJ", interSectItem1);
					result.put("REFER", actor1);
					System.out.println("found  " + interSectItem1.getMovieUrl());
					return result;
				}
				count++;
				successors2 = successor(successors2);
				EntityObj interSectItem2 = intersects(successors2, successors1);
				if (interSectItem2 != null) {
					System.out.println("found 2 " + interSectItem2.getMovieUrl());
					result.put("COUNT", count);
					result.put("INTROBJ", interSectItem2);
					result.put("REFER", actor2);

					return result;
				}
				count++;

			}

		}
		return null;
	}

	private EntityObj intersects(List<EntityObj> successors1, List<EntityObj> successors2) {
		for (EntityObj obj : successors1) {
			if (successors2.contains(obj)) {
				System.out.println("intersects is " + obj.getName() + " " + obj.getUrl());
				return obj;
			}
		}
		return null;
	}

	private List<EntityObj> successor(List<EntityObj> successorsPrev) {
		List<EntityObj> successors = new ArrayList<EntityObj>();
		for (EntityObj actor : successorsPrev) {
			if (actor != null) {
				if (actor.getType() == null && actor.getMovies() == null) {
					actor = geMvitEntityWrapper(actor.getUrl());
				}
				if (actor != null && actor.getType() != null && actor.getMovies() != null) {
					switch (actor.getType()) {
					case "Person":
						for (EntityObj movie : actor.getMovies()) {
							EntityObj movieDetial = geMvitEntityWrapper(movie.getUrl());

							if (movieDetial != null) {
								if (movieDetial.getCast() != null && !movieDetial.getCast().isEmpty()) {

									successors.addAll(updateMovie(movieDetial.getCast(), movieDetial));
								}
								if (movieDetial.getCrew() != null && !movieDetial.getCrew().isEmpty()) {

									successors.addAll(updateMovie(movieDetial.getCrew(), movieDetial));
								}
							}
						}
						break;
					case "default":
						break;
					}
				}
			}
		}
		return successors;
	}

	private List<EntityObj> updateMovie(List<EntityObj> crewOrCast, EntityObj movieDetial) {
		for (EntityObj person : crewOrCast) {
			person.setMovieUrl(movieDetial.getUrl());
		}
		return crewOrCast;
	}

	private static EntityObj geMvitEntityWrapper(String entityUrl) {
		EntityObj entityObj = null;
		try {
			entityObj = cache.get(entityUrl).get();
		} catch (Exception ex) {
			System.out.println("Got exception wrapper null " + ex.getMessage());
		}
		return entityObj;
	}

	private static Optional<EntityObj> geMvitEntity(String entityUrl) {
		EntityObj entityObj = null;
		System.out.println("counter tst " + counter++);
		try {
			entityObj = restTemplate.getForObject(endPoint + entityUrl, EntityObj.class);
		} catch (Exception ex) {
			System.out.println("Got exception return null " + ex.getMessage());
		}
		return Optional.fromNullable(entityObj);
	}

	private static EntityObj geMvitEntityNoCache(String entityUrl) {
		EntityObj entityObj = null;
		System.out.println("counter tst " + counter++);
		try {
			entityObj = restTemplate.getForObject(endPoint + entityUrl, EntityObj.class);
		} catch (Exception ex) {
			System.out.println("Got exception return null " + ex.getMessage());
		}
		return entityObj;
	}

}