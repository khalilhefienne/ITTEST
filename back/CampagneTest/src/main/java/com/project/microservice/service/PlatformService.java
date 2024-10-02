package com.project.microservice.service;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.microservice.entity.Platform;
import com.project.microservice.repository.PlatformRepository;

@Service
public class PlatformService  implements PlatformServiceI  {
	
	@Autowired
	PlatformRepository PlatformRepository;
		
//------------------------------------------------------------
	@Override
	public Platform addPlatform(Platform c) {
		PlatformRepository.save(c);
		return c;
	}
//------------------------------------------------------------	

	@Override
	public void deletePlatform(int id) {
		PlatformRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<Platform> retrieveAllPlatforms() {
			
		return (List<Platform>)this.PlatformRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public Platform retrievePlatform(int id) {
		return this.PlatformRepository.findById(id).get();
	}
//------------------------------------------------------------	

	@Override
	public Platform updatePlatform(Platform u,int id) {
		
		Platform fct = PlatformRepository.findById(id).orElse(null);
		
		fct.setPlatform(u.getPlatform());
		fct.setEnDesign(u.isEnDesign());
		fct.setEnExecution(u.isEnExecution());
	
		
		return this.PlatformRepository.save(fct);
	}
	//---------------------------------------------
	 public Platform update(Platform employee) {
	        return 
	        		PlatformRepository.save(employee);
	    }
	 
}