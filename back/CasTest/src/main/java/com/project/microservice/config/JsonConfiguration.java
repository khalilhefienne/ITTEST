package com.project.microservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;

@Configuration
public class JsonConfiguration {
    @Bean
    public Module hibernateModule() {
        Hibernate5Module hibernateModule = new Hibernate5Module();
        hibernateModule.configure(Hibernate5Module.Feature.FORCE_LAZY_LOADING, true); // Force le chargement des associations de clés étrangères
        return hibernateModule;
    }
    
    

}
