package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DocFinityRequestModel {
  private String urlPath;
  private String method;
  private String body;
}
