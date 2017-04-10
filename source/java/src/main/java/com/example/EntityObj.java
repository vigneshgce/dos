package com.example;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

public class EntityObj implements Serializable {
	EntityObj() {

	}

	private String url;
	private String type;
	private String name;
	private String role;
	private String movieUrl;

	public String getMovieUrl() {
		return movieUrl;
	}

	public void setMovieUrl(String movieUrl) {
		this.movieUrl = movieUrl;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<EntityObj> getCast() {
		return cast;
	}

	public void setCast(List<EntityObj> cast) {
		this.cast = cast;
	}

	public List<EntityObj> getCrew() {
		return crew;
	}

	public void setCrew(List<EntityObj> crew) {
		this.crew = crew;
	}

	public List<EntityObj> getMovies() {
		return movies;
	}

	public void setMovies(List<EntityObj> movies) {
		this.movies = movies;
	}

	private List<EntityObj> cast;
	private List<EntityObj> crew;
	private List<EntityObj> movies;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public boolean equals(Object arg0) {

		// System.out.println("in equals");
		if (arg0 == null) {
			return false;
		}
		if (arg0 == this) {
			return true;
		}
		if (getClass() != arg0.getClass()) {
			return false;
		}

		EntityObj obj = (EntityObj) arg0;

		// System.out.println("1st "+getName());
		// System.out.println("2nd "+obj.getName());

		if (this.getUrl().equals(obj.getUrl())) {
			return true;
		}
		return false;
	}

	@Override
	public int hashCode() {
		return Objects.hash(super.hashCode(), getUrl());
	}

}
