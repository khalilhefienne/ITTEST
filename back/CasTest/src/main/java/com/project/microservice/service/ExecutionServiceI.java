package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.CasTest;
import com.project.microservice.entity.Execution;

public interface ExecutionServiceI {
	
		public Execution addExecution(Execution c);


		public void deleteExecution(int id);
		public List<Execution> retrieveAllExecutions() ;
		public List<Execution> retrieveExecutionsByCasTest(CasTest casTest);
		public Execution retrieveExecution(int id);
		public Execution updateExecution(Execution u,int id) ;
		public String ajouterExecution(int test_id);
		 public Execution update(Execution employee);
		 public int getExecutionCountByTestCase(CasTest casTest);
}
