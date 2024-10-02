package com.project.microservice.service;


import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.microservice.entity.Fonction;
import com.project.microservice.repository.FonctionRepository;

@Service
public class FonctionService  implements FonctionServiceI  {
	
	@Autowired
	 FonctionRepository fonctionRepository;
		
//------------------------------------------------------------
	@Override
	public Fonction addFonction(Fonction c) {
		fonctionRepository.save(c);
		return c;
	}
//------------------------------------------------------------	

	@Override
	public void deleteFonction(int id) {
		fonctionRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<Fonction> retrieveAllFonctions() {
			
		return (List<Fonction>)this.fonctionRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public Fonction retrieveFonction(int id) {
		return this.fonctionRepository.findById(id).get();
	}
//------------------------------------------------------------	

	@Override
	public Fonction updateFonction(Fonction u,int id) {
		
		Fonction fct = fonctionRepository.findById(id).orElse(null);
		
		fct.setTitre(u.getTitre());
		fct.setDescription(u.getDescription());
	
		
		return this.fonctionRepository.save(fct);
	}
	//---------------------------------------------
	 public Fonction update(Fonction employee) {
	        return fonctionRepository.save(employee);
	    }

}