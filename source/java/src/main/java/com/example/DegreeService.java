package com.example;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface DegreeService {

	Map<String, Object> getDegress(String actorurl1, String actorurl2)
			throws JsonProcessingException, IOException, ExecutionException;

}