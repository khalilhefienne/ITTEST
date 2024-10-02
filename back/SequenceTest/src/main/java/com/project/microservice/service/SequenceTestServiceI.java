package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.SequenceTest;

public interface SequenceTestServiceI {
	
		public SequenceTest addSequenceTest(SequenceTest c);


		public void deleteSequenceTest(int id);
		public List<SequenceTest> retrieveAllSequenceTests() ;
		public SequenceTest retrieveSequenceTest(int id);
		public SequenceTest updateSequenceTest(SequenceTest u,int id) ;
		   public List<SequenceTest> getSequenceTestsByProjetId(int projetId);
		 public SequenceTest update(SequenceTest employee);
		 public SequenceTest addSequenceTest(SequenceTest c,int projetId);
		  public int getSequenceCountByProjet(int projetId);
}
