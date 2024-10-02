package com.project.microservice.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.microservice.entity.Utilisateur;

public interface UtilisateurServiceI {
	
	public Utilisateur updateUser(Utilisateur existingUtilisateur, MultipartFile file) throws IOException;
	 public Utilisateur saveUtilisateur(Utilisateur user);

		public void deleteUtilisateur(int id);

		public List<Utilisateur> retrieveAllUtilisateurs() ;
		 public String processMessage(String message);
		 public void ActivateCompte(int userId,String expirationTime);
		public Utilisateur retrieveUtilisateur(int id) ;

		 public Utilisateur loadUserByUserName(String username);
		 
		 public Utilisateur updateUtilisateur(int id, Utilisateur user)	;	 public void affecterProfilToUser(int id , int profil_id);
}
