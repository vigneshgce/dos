package com.example;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/degree")
public class DegreeAPI {

	@Autowired
	DegreeService degreeService;

	@RequestMapping("/get")
	Map<String, Object> getDegree(@RequestParam(required = true, value = "actorurl1") String actorUrl1,
			@RequestParam(required = true, value = "actorurl2") String actorUrl2) {

		try {
			return degreeService.getDegress(actorUrl1, actorUrl2);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
