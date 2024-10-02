package com.project.microservice.config;

import java.util.ArrayList;

import java.util.Arrays;
import java.util.Collection;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.GrantedAuthority;




import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.project.microservice.JwtAuthorizationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {



	 



	
	

	//specfier les droits d'acces 
	
		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			//desactiver csrf
			http.csrf().disable();
			//je vais utiliser statless pas neseccaire d'utiliser les sessions et la formulaire ne marche pas
			http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
			//desactiver les frameworks(htm..
			http.headers().frameOptions().disable();
			//activer formulaire d'authetification et ona la desativer car on va faire cote frontend
				//http.formLogin();
		    http
            // Autres configurations de sécurité...
            .cors() // Activer la configuration CORS
            .and();		
			//toutes les requetes ne necissitent pa une authentification
			//http.authorizeRequests().anyRequest().permitAll();
			//nececitent une authentification
			http.authorizeRequests().anyRequest().authenticated();
			
			//intgrere le filtre dans la configuration
		http.addFilterBefore(new JwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
		
		}

		
		/*
		@Bean
		public WebMvcConfigurer crosConfigure() {
			return new WebMvcConfigurer() {
				@Override
				public void addCorsMappings(CorsRegistry registry) {
			        registry.addMapping("/**")
	                .allowedOrigins("http://localhost:4200")
	                .allowedMethods("*")
	                .allowedHeaders("*");

					
				}
				   @Override
				    public void addResourceHandlers(ResourceHandlerRegistry registry) {
					   registry.addResourceHandler("/images/**")
		                .addResourceLocations("file:/path/to/uploads/");
				    }
			};
		}
		
		*/

	
    @Bean
	@Override
	  public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManager();
    }
}