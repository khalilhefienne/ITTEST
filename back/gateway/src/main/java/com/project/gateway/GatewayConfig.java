package com.project.gateway;

import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.cloud.gateway.discovery.DiscoveryClientRouteDefinitionLocator;
import org.springframework.cloud.gateway.discovery.DiscoveryLocatorProperties;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;


@Configuration
public class GatewayConfig {
	  @Bean
	    public CorsWebFilter corsWebFilter() {
	        CorsConfiguration corsConfig = new CorsConfiguration();
	        corsConfig.addAllowedOrigin("http://localhost:4200");
	        corsConfig.addAllowedMethod("*");
	        corsConfig.addAllowedHeader("*");

	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", corsConfig);

	        return new CorsWebFilter(source);
	    }
	
	//façon stattic

/*    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route( r -> r.path("/projets/**").uri("lb://projet"))
                .route( r -> r.path("/sequences/**")  .uri("lb://sequenceTest"))
                .build();
    }
    */
	
	//façon dynamic
	
	
	
	@Bean
	DiscoveryClientRouteDefinitionLocator dynamicRoutes(ReactiveDiscoveryClient rdc,
	DiscoveryLocatorProperties dlp){

	return new DiscoveryClientRouteDefinitionLocator(rdc,dlp); 
	}
}
