package com.example.demo.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "edm.docfinity")
public class DocFinityProperties {
  private String apiKey;
}
