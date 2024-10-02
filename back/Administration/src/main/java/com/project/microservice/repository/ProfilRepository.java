package com.project.microservice.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.microservice.entity.Profil;

@Repository
public interface ProfilRepository extends CrudRepository <Profil, Integer> {
	Profil findByNom (String nom);
	
	
	
	
	
}