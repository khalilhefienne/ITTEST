package com.project.microservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.microservice.entity.Utilisateur;

@Repository
public interface UtilisateurRepository  extends JpaRepository <Utilisateur, Integer> {
	Utilisateur findByUsername (String username);
	Utilisateur findByEmail(String email);
	Utilisateur findByResetPasswordToken(String token);
}