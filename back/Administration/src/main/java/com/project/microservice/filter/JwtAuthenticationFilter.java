package com.project.microservice.filter;

import java.io.BufferedReader;
import org.springframework.security.authentication.DisabledException;


import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.microservice.entity.Utilisateur;
import com.project.microservice.repository.UtilisateurRepository;
import com.project.microservice.service.UtilisateurService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private AuthenticationManager authenticationManager;
	
	@Autowired
	 UtilisateurService utilisateurService;
		
	  public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
		super();
		this.authenticationManager = authenticationManager;
	}

	  @Override
	  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
	      System.out.println("attemptAuthentication");
	      try {
	          // Lecture du corps de la requête HTTP pour obtenir les données au format JSON
	          StringBuilder requestBody = new StringBuilder();
	          String line;
	          BufferedReader reader = request.getReader();
	          while ((line = reader.readLine()) != null) {
	              requestBody.append(line);
	          }

	          // Conversion des données JSON en objets Java
	          ObjectMapper objectMapper = new ObjectMapper();
	          JsonNode jsonNode = objectMapper.readTree(requestBody.toString());
	          String username = jsonNode.get("username").asText();
	          String password = jsonNode.get("password").asText();
	          System.out.println(username);
	          System.out.println(password);

	          // Création de l'objet d'authentification
	          UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);

	          // Appel de l'objet d'authentification pour valider les informations d'identification
	          Authentication authentication = authenticationManager.authenticate(authenticationToken);

	          // Si l'authentification réussit, renvoyer l'objet d'authentification
	          return authentication;

	      } catch (IOException e) {
	          throw new RuntimeException("Erreur lors de la lecture des données JSON", e);
	      } catch (DisabledException e) {
	    	  throw new DisabledException("Le compte utilisateur n'est pas activé.");
	      }
	  }

	
	 @Override
	    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
		  System.out.println("successfulAuthentication");
		//user contient username et role 
		  User user =(User) authResult.getPrincipal();
		
		  //genrer letoken jwt
		  Algorithm algorithm =Algorithm.HMAC256("mySecret1234");
		  /*  Claims claims = Jwts.claims().setSubject(user.getUsername());
		  claims.put("role", utilisateur.getProfil().getPermissions());
		 
		  String newaccesstoken = Jwts.builder().setClaims(claims)
				  .setIssuedAt(new Date())
				  .setExpiration(new Date(System.currentTimeMillis()+5*60*1000))
				  .signWith(SignatureAlgorithm.HS512, "mySecret1234")
				  .compact();*/
		  String jwtAccessToken= JWT.create()
				           //subject
				          .withSubject(user.getUsername())
				          //date expiration :expire en 5 min
				          .withExpiresAt(new Date(System.currentTimeMillis()+60*60*1000))
				          //date generation
				          .withIssuer(request.getRequestURI().toString())
				         .withClaim("profils", user.getAuthorities().stream().map(ga-> ga.getAuthority()).collect(Collectors.toList()))
				        //  .withClaim("role", utilisateur.getProfil().getPermissions().stream().map(ga-> ga.getFonction().getTitre()).collect(Collectors.toList()))
				         // .addClaim("role", utilisateur.getProfil().getPermissions())
				          //recupere la liste des profils en les convertant to string
				          .withClaim("statut", user.isEnabled())
				  // signature
				          .sign(algorithm);
		  
		  // une fois que access token expire, il faut le renouveller  en appellant le service pour renouveler : refresh tokenn
		  String jwtRefreshToken= JWT.create()
		           //subject
		          .withSubject(user.getUsername())
		          //date expiration :expire en 5 min
		          .withExpiresAt(new Date(System.currentTimeMillis()+15*60*1000))
		          //date generation
		          .withIssuer(request.getRequestURI().toString())
		          //recupere la liste des profils en les convertant to string
		         // .withClaim("profils", user.getAuthorities().stream().map(ga-> ga.getAuthority()).collect(Collectors.toList()))
		  // signature
		          .sign(algorithm); 
		  //envoyer les jwt au client au fromat json
		  Map<String,String>idToken = new HashMap<>();
		  idToken.put("access-token",jwtAccessToken );
		  idToken.put("refresh-token", jwtRefreshToken);
		  response.setContentType("application/json");
		    new ObjectMapper().writeValue(response.getOutputStream(),idToken);
		 
		  }
		  
		 
	       
	    
	  
	 
}
