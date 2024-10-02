package com.project.microservice.repository;

import java.util.List;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.microservice.entity.Projet;

@Repository
public interface ProjetRepository extends CrudRepository <Projet, Integer> {
	
	
	  List<Projet> findByCreatorId(int creator_id);

	
	
}