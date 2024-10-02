package com.project.microservice.config;

import java.util.ArrayList;

import java.util.Arrays;
import java.util.Collection;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
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

import com.project.microservice.entity.Profil;
import com.project.microservice.entity.Utilisateur;
import com.project.microservice.filter.JwtAuthenticationFilter;
import com.project.microservice.filter.JwtAuthorizationFilter;

import com.project.microservice.repository.ProfilRepository;
import com.project.microservice.service.UtilisateurService;

import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	UtilisateurService utilisateurService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(new UserDetailsService() {
			@Override
			public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
				Utilisateur utilisateur = utilisateurService.loadUserByUserName(username);
				System.out.println("+++++++++++++++++++++++++ " + utilisateur.getProfil().getNom());
				Collection<GrantedAuthority> authorities = new ArrayList<>();
				/*
				 * utilisateur.getProfil().getPermissions().forEach(r -> {
				 * authorities.add(new SimpleGrantedAuthority(r.getFonction().getTitre()));
				 * System.out.println("+++++++++++++++++++++++++ " +
				 * r.getFonction().getTitre());
				 * });
				 */
				authorities.add(new SimpleGrantedAuthority(utilisateur.getProfil().getNom()));
				boolean isAdmin = authorities.stream()
						.anyMatch(authority -> authority.getAuthority().equals("Administrateur"));

				System.out.println("+++++++++++++++++++++++++ isAdmin" + isAdmin);
				boolean enabled = utilisateur.isStatut(); // Utiliser l'attribut statut de la classe Utilisateur
				System.out.println("+++++++++++++++++++++++++ " + enabled);
				System.out.println("Autorités de l'utilisateur : " + authorities);

				if (!enabled) {
					if (!isAdmin) {
						throw new DisabledException("Le compte utilisateur n'est pas activé.");
					} else {
						return new User(utilisateur.getUsername(), utilisateur.getPassword(), enabled, true, true, true,
								authorities);
					}

				} else {
					// Authentification réussie
					return new User(utilisateur.getUsername(), utilisateur.getPassword(), enabled, true, true, true,
							authorities);
				}
			}
		});
	}

	@Autowired
	private ApplicationContext applicationContext;

	private ITemplateResolver templateResolver() {
		SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
		templateResolver.setApplicationContext(applicationContext);
		templateResolver.setPrefix("classpath:/templates/");
		templateResolver.setSuffix(".html");
		templateResolver.setTemplateMode(TemplateMode.HTML);
		// Autres configurations du template resolver

		return templateResolver;
	}

	@Bean
	public SpringTemplateEngine templateEngine() {
		SpringTemplateEngine templateEngine = new SpringTemplateEngine();
		templateEngine.setTemplateResolver(templateResolver());
		// Autres configurations du moteur de template

		return templateEngine;
	}

	// specfier les droits d'acces

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// desactiver csrf
		http.csrf().disable();
		// je vais utiliser statless pas neseccaire d'utiliser les sessions et la
		// formulaire ne marche pas
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		// desactiver les frameworks(htm..
		http.headers().frameOptions().disable();
		// activer formulaire d'authetification et ona la desativer car on va faire cote
		// frontend
		// http.formLogin();

		http.authorizeRequests()
				.antMatchers("/register").permitAll()
				.antMatchers("/login").permitAll()
				.antMatchers("/chat").permitAll()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.antMatchers("/activate").permitAll()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.antMatchers("/reset_password").permitAll()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.antMatchers("/forgot-password").permitAll()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll();
		http
				// Autres configurations de sécurité...
				.cors() // Activer la configuration CORS
				.and();
		// toutes les requetes ne necissitent pa une authentification
		// http.authorizeRequests().anyRequest().permitAll();
		// nececitent une authentification
		http.authorizeRequests().anyRequest().authenticated();

		// intgrere le filtre dans la configuration
		http.addFilter(new JwtAuthenticationFilter(authenticationManagerBean()));
		http.addFilterBefore(new JwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

	}

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

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManager();
	}
}