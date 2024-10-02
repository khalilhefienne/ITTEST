package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.Projet;

public interface ProjetServiceI {
	
		public Projet addProjet(Projet c);


		public void deleteProjet(int id);
		public List<Projet> retrieveAllProjets() ;
		public Projet retrieveProjet(int id);
		public Projet updateProjet(Projet u,int id) ;
		public List<Projet> retrieveProjetsByCreator(int creatorId);
		 public Projet update(Projet employee);
}
