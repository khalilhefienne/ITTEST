package com.project.microservice.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.project.microservice.entity.Projet;
import com.project.microservice.repository.ProjetRepository;

@Service
public class ProjetService  implements ProjetServiceI  {
	
	@Autowired
	ProjetRepository ProjetRepository;
		
//------------------------------------------------------------
	@Override
	public Projet addProjet(Projet c) {
		ProjetRepository.save(c);
		return c;
	}
//------------------------------------------------------------	

	@Override
	public void deleteProjet(int id) {
		ProjetRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<Projet> retrieveAllProjets() {
			
		return (List<Projet>)this.ProjetRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public Projet retrieveProjet(int id) {
		return this.ProjetRepository.findById(id).get();
	}
//------------------------------------------------------------
	

		@Override
		public List<Projet> retrieveProjetsByCreator(int creatorId) {
		    return this.ProjetRepository.findByCreatorId(creatorId);
		}
		//------------------------------------------------------------	
	@Override
	public Projet updateProjet(Projet u,int id) {
		
		Projet fct = ProjetRepository.findById(id).orElse(null);
		
		fct.setGestionnaireAnomalie(u.isGestionnaireAnomalie());
		fct.setNom(u.getNom());
		fct.setNomGestionnaire(u.getNomGestionnaire());
		fct.setPrefixe(u.getPrefixe());
		fct.setStatut(u.getStatut());
		fct.setDescription(u.getDescription());
		fct.setCreatorId(u.getCreatorId());
	
		
		return this.ProjetRepository.save(fct);
	}
	//---------------------------------------------
	 public Projet update(Projet employee) {
	        return ProjetRepository.save(employee);
	    }
	 
}