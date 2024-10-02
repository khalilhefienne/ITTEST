package com.project.microservice.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.microservice.entity.Permission;
import com.project.microservice.entity.Profil;
import com.project.microservice.repository.PermissionRepository;
import com.project.microservice.repository.ProfilRepository;

@Service
public class ProfilService  implements ProfilServiceI  {
	
	@Autowired
	 ProfilRepository profilRepository;
	@Autowired
	 PermissionRepository permissionRepository;	
//------------------------------------------------------------
	@Override
	public Profil addProfil(Profil c) {
		profilRepository.save(c);
		return c;
	}
//------------------------------------------------------------	

	@Override
	public void deleteProfil(int id) {
		profilRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<Profil> retrieveAllProfils() {
			
		return (List<Profil>)this.profilRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public Profil retrieveProfil(int id) {
		return this.profilRepository.findById(id).get();
	}
//------------------------------------------------------------	

	@Override
    public Profil updateProfil(int id, Profil profil) {
		
	
		Profil existingProfil = profilRepository.findById(id).orElse(null);
        existingProfil.setDescription(profil.getDescription());
        existingProfil.setNom(profil.getNom());
      
       
        return profilRepository.save(existingProfil);
    }
//------------------------------------------------------------		
	

}
