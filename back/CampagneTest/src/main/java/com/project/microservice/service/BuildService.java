package com.project.microservice.service;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.microservice.entity.Build;
import com.project.microservice.repository.BuildRepository;

@Service
public class BuildService  implements BuildServiceI  {
	
	@Autowired
	BuildRepository BuildRepository;
		
//------------------------------------------------------------
	@Override
	public Build addBuild(Build c) {
		BuildRepository.save(c);
		return c;
	}
//------------------------------------------------------------	

	@Override
	public void deleteBuild(int id) {
		BuildRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<Build> retrieveAllBuilds() {
			
		return (List<Build>)this.BuildRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public Build retrieveBuild(int id) {
		return this.BuildRepository.findById(id).get();
	}
//------------------------------------------------------------	

	@Override
	public Build updateBuild(Build u,int id) {
		
		Build fct = BuildRepository.findById(id).orElse(null);
		
		fct.setCampagneTest(u.getCampagneTest());
		fct.setTitre(u.getTitre());
		fct.setDescription(u.getDescription());
		fct.setDate_livraison(u.getDate_livraison());
		fct.setActif(u.isActif());
		
		return this.BuildRepository.save(fct);
	}
	//---------------------------------------------
	 public Build update(Build employee) {
	        return 
	        		BuildRepository.save(employee);
	    }
	 
}