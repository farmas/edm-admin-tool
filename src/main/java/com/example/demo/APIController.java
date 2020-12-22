package com.example.demo;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class APIController {

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private DocFinityProperties docFinityProperties;

	@GetMapping("/api/docfinity")
	public String getDocFinity() {
    final String uri = "https://gturnquist-quoters.cfapps.io/api/random";

    String result = restTemplate.getForObject(uri, String.class);

		return docFinityProperties.getApiKey();
	}
}
