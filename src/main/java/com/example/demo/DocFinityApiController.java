package com.example.demo;

import com.example.demo.models.DocFinityRequestModel;
import com.example.demo.properties.DocFinityProperties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class DocFinityApiController {
  private final String docFinityUrl = "https://sandbox-edu.cloudtest.docfinity.com/docfinity/webservices/rest";

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private DocFinityProperties docFinityProperties;

  @RequestMapping(value = "/api/docfinity", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> getDocFinity(@RequestBody DocFinityRequestModel request) {
    HttpHeaders requestHeaders = new HttpHeaders();
    requestHeaders.add("Authorization", "Bearer " + docFinityProperties.getApiKey());
    requestHeaders.add("X-XSRF-TOKEN", "edm-token");
    requestHeaders.add("Cookie", "XSRF-TOKEN=edm-token");

    HttpEntity<String> requestEntity = new HttpEntity<String>(request.getBody(), requestHeaders);

    return restTemplate.exchange(docFinityUrl + request.getUrlPath(),
        HttpMethod.valueOf(request.getMethod().toUpperCase()), requestEntity, String.class);
  }
}
