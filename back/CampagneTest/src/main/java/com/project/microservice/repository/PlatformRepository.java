package com.project.microservice.repository;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import com.project.microservice.entity.Platform;

@Repository
public interface PlatformRepository extends CrudRepository <Platform, Integer> {
	
	
	
	
	
}