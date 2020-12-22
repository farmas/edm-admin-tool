package com.example.demo;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "edm.docfinity")
public class DocFinityProperties {
  private String apiKey;
}
