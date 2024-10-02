package com.project.microservice.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import com.project.microservice.entity.CasTest;
import com.project.microservice.entity.Etape;
import com.project.microservice.entity.MotsCle;

@Repository
public interface EtapeRepository extends CrudRepository <Etape, Integer> {
	
	
	  List<Etape> findByCasTest(CasTest casTest);
	  int countByCasTest(CasTest casTest);
	
	
}