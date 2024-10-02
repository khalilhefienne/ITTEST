package com.project.microservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.microservice.entity.MotsCle;
import com.project.microservice.repository.MotsCleRepository;

@Service
public class MotsCleService  implements MotsCleServiceI  {
	
	@Autowired
	MotsCleRepository MotsCleRepository;
		
//------------------------------------------------------------
	@Override
	public MotsCle addMotsCle(MotsCle c) {
		MotsCleRepository.save(c);
		return c;
	}
//------------------------------------------------------------	

	@Override
	public void deleteMotsCle(int id) {
		MotsCleRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<MotsCle> retrieveAllMotsCles() {
			
		return (List<MotsCle>)this.MotsCleRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public MotsCle retrieveMotsCle(int id) {
		return this.MotsCleRepository.findById(id).get();
	}
//------------------------------------------------------------	

	@Override
	public MotsCle updateMotsCle(MotsCle u,int id) {
		
		MotsCle fct = MotsCleRepository.findById(id).orElse(null);
		
		fct.setMot(u.getMot());
		fct.setDescription(u.getDescription());
		

	
		
		return this.MotsCleRepository.save(fct);
	}
	//---------------------------------------------
	 public MotsCle update(MotsCle employee) {
	        return MotsCleRepository.save(employee);
	    }
	 
}