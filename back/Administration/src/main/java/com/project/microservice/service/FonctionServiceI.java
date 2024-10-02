package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.Fonction;

public interface FonctionServiceI {
	
	public Fonction addFonction(Fonction c) ;

	public void deleteFonction(int id);

	public List<Fonction> retrieveAllFonctions() ;


	public Fonction retrieveFonction(int id) ;


	public Fonction updateFonction(Fonction u,int id);
	 public Fonction update(Fonction employee);

}