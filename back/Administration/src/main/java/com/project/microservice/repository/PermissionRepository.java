package com.project.microservice.repository;

import javax.persistence.PersistenceContext;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.microservice.entity.Permission;

@Repository
public interface PermissionRepository extends CrudRepository <Permission, Integer> {
	
	

	
	
	
	
}