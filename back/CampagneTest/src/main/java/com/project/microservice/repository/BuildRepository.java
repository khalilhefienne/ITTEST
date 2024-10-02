package com.project.microservice.repository;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import com.project.microservice.entity.Build;

@Repository
public interface BuildRepository extends CrudRepository <Build, Integer> {
	
	
	
	
	
}