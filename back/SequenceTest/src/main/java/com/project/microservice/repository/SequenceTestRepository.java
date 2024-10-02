package com.project.microservice.repository;

import java.util.List;


import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;


import com.project.microservice.entity.SequenceTest;

@Repository
public interface SequenceTestRepository extends CrudRepository <SequenceTest, Integer> {
	
	List<SequenceTest> findByProjetId(int projet_id);
	
	int countByProjetId(int projetId);	
	
}