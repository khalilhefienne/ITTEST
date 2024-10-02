package com.project.microservice.repository;

import java.util.List;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.microservice.entity.SenarioTest;

@Repository
public interface SenarioTestRepository extends CrudRepository <SenarioTest, Integer> {
	
	List<SenarioTest> findBySequenceId(int sequence_id);
	int countBySequenceId(int SequenceId);	

	
	
	
}