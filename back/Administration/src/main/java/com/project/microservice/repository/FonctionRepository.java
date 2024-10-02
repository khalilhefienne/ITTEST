package com.project.microservice.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.microservice.entity.Fonction;

@Repository
public interface FonctionRepository extends CrudRepository <Fonction, Integer> {
	
	
	
	
	
}