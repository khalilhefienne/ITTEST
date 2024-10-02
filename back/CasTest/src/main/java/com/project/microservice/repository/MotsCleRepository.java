package com.project.microservice.repository;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import com.project.microservice.entity.CasTest;
import com.project.microservice.entity.MotsCle;

@Repository
public interface MotsCleRepository extends CrudRepository <MotsCle, Integer> {
	
	
	
	
	
}