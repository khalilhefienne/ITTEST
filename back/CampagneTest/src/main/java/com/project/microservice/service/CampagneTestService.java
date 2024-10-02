package com.project.microservice.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.microservice.entity.CampagneTest;
import com.project.microservice.repository.CampagneTestRepository;

@Service
public class CampagneTestService  implements CampagneTestServiceI  {
	
	@Autowired
	CampagneTestRepository CampagneTestRepository;
		
//------------------------------------------------------------
	@Override
	public CampagneTest addCampagneTest(CampagneTest c) {
		CampagneTestRepository.save(c);
		return c;
	}
//------------------------------------------------------------	

	@Override
	public void deleteCampagneTest(int id) {
		CampagneTestRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<CampagneTest> retrieveAllCampagneTests() {
			
		return (List<CampagneTest>)this.CampagneTestRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public CampagneTest retrieveCampagneTest(int id) {
		return this.CampagneTestRepository.findById(id).get();
	}
//------------------------------------------------------------	

	@Override
	public CampagneTest updateCampagneTest(CampagneTest u,int id) {
		
		CampagneTest fct = CampagneTestRepository.findById(id).orElse(null);
		
		fct.setNom(u.getNom());
		fct.setPublic(u.isPublic());
		fct.setActif(u.isActif());
fct.setPlatforme(u.getPlatforme());

	
		
		return this.CampagneTestRepository.save(fct);
	}
	//---------------------------------------------
	 public CampagneTest update(CampagneTest employee) {
	        return 
	        		CampagneTestRepository.save(employee);
	    }
	 
}