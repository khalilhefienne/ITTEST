package com.project.microservice.repository;

import java.util.List;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.microservice.entity.CasTest;

import com.project.microservice.entity.Execution;

@Repository
public interface ExecutionRepository extends CrudRepository <Execution, Integer> {
	  List<Execution> findByCasTest(CasTest casTest);
	  int countByCasTest(CasTest casTest);
	


	
}