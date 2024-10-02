package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.Profil;

public interface ProfilServiceI {
	
	public Profil addProfil(Profil c) ;

	public void deleteProfil(int id);

	public List<Profil> retrieveAllProfils() ;


	public Profil retrieveProfil(int id) ;


	public Profil updateProfil(int id, Profil profil);
}
