package com.project.microservice.repository;

import java.util.List;


import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import com.project.microservice.entity.CasTest;
import com.project.microservice.entity.CasTest;

@Repository
public interface CasTestRepository extends CrudRepository <CasTest, Integer> {
	
	
	int countByCampagneId(int campagneId);	
	int countBySenarioId(int senario);	
	List<CasTest> findBySenarioId(int senarioId);

}