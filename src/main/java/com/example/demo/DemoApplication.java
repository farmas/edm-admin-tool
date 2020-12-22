package com.example.demo;

import java.time.Duration;

import com.example.demo.properties.DocFinityProperties;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
@EnableConfigurationProperties({DocFinityProperties.class})
public class DemoApplication {

	public static void main(String[] args) {
    String pid = "/data/edm-admin-web/run/edm-admin-web.pid";

    new SpringApplicationBuilder(DemoApplication.class)
      .listeners(new ApplicationPidFileWriter(pid))
      .run(args);
	}

  @Bean
  public RestTemplate restTemplate(RestTemplateBuilder builder) {
      return builder
              .setConnectTimeout(Duration.ofMillis(3000))
              .setReadTimeout(Duration.ofMillis(3000))
              .build();
  }
}
