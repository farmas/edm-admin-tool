package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class APIController {
  private final String docFinityUrl = "https://sandbox-edu.cloudtest.docfinity.com/docfinity/webservices/rest/category";

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private DocFinityProperties docFinityProperties;

  @GetMapping("/api/docfinity")
	public String getDocFinity() {
    HttpHeaders requestHeaders = new HttpHeaders();
    requestHeaders.add("Authorization", "Bearer " + docFinityProperties.getApiKey());
    requestHeaders.add("X-XSRF-TOKEN", "edm-token");
    requestHeaders.add("Cookie", "XSRF-TOKEN=edm-token");

    HttpEntity<String> requestEntity = new HttpEntity<String>(null, requestHeaders);
    
    ResponseEntity<String> response = restTemplate.exchange(docFinityUrl, HttpMethod.GET, requestEntity, String.class);

		return response.getBody();
	}
}
