package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.CampagneTest;

public interface CampagneTestServiceI {
	
		public CampagneTest addCampagneTest(CampagneTest c);


		public void deleteCampagneTest(int id);
		public List<CampagneTest> retrieveAllCampagneTests() ;
		public CampagneTest retrieveCampagneTest(int id);
		public CampagneTest updateCampagneTest(CampagneTest u,int id) ;
	
		 public CampagneTest update(CampagneTest employee);
}
