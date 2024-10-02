package com.project.microservice;

import org.springframework.boot.SpringApplication;



import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication

@EnableEurekaClient
public class SenarioTestApplication {


	public static void main(String[] args) {
		SpringApplication.run(SenarioTestApplication.class, args);
	}

}
