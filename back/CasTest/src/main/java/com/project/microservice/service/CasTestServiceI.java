package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.CasTest;

public interface CasTestServiceI {
	
		public CasTest addCasTest(CasTest c);

		public List<CasTest> getCasTestsBySenarioId(int senarioId) ;
		public CasTest addCasTest(CasTest casTest, int senarioId) ;
		public void deleteCasTest(int id);
		public List<CasTest> retrieveAllCasTests() ;
		public CasTest retrieveCasTest(int id);
		public CasTest updateCasTest(CasTest u,int id) ;
		  public int getCasTestCountByCampagne(int campagneId);
		 public CasTest update(CasTest employee);
		 public int getCasTestCountBySenario(int senarioId);
}
