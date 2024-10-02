package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.CasTest;
import com.project.microservice.entity.Etape;

public interface EtapeServiceI {
	
	public Etape addEtape(Etape c,int test_id);

		public void deleteEtape(int id);
		public List<Etape> retrieveAllEtapes() ;
		public Etape retrieveEtape(int id);
		public Etape updateEtape(Etape u,int id) ;
		public List<Etape> retrieveEtapesByCasTest(CasTest casTest);
		 public Etape update(Etape employee);
		 public int getEtapeCountByTestCase(CasTest casTest);
		 
}
