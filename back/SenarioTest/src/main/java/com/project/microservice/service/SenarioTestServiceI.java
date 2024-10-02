package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.SenarioTest;

public interface SenarioTestServiceI {
	
		public SenarioTest addSenarioTest(SenarioTest c);


		public void deleteSenarioTest(int id);
		public List<SenarioTest> retrieveAllSenarioTests() ;
		public SenarioTest retrieveSenarioTest(int id);
		public SenarioTest updateSenarioTest(SenarioTest u,int id) ;
	    public List<SenarioTest> getSenarioTestsByProjetId(int sequenceId) ;
		 public SenarioTest update(SenarioTest employee);
		 public SenarioTest addSenarioTest(SenarioTest c,int sequenceId);
		 public int getSenarioCountBySequence(int SequenceId);
}
