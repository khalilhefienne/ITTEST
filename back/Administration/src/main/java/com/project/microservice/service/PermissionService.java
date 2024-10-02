package com.project.microservice.service;

import java.util.List;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.microservice.entity.Fonction;
import com.project.microservice.entity.Permission;
import com.project.microservice.entity.Profil;
import com.project.microservice.repository.FonctionRepository;
import com.project.microservice.repository.PermissionRepository;
import com.project.microservice.repository.ProfilRepository;
import org.springframework.transaction.annotation.Transactional;


@Service
public class PermissionService  implements PermissionServiceI  {
	
	@Autowired
	 PermissionRepository permissionRepository;
	
	 @Autowired
	    private ProfilRepository profilRepository;
    @Autowired
    private FonctionRepository fonctionRepository;
		
//------------------------------------------------------------
	@Override
    public Permission savePermission(Permission permission) {

		//Fonction fonction = fonctionRepository.findById(fonction_id).orElse(null);
      //  permission.setFonction(fonction);
    	//
        return permissionRepository.save(permission);
	}
    
//------------------------------------------------------------	

	@Override
	public void deletePermission(int id) {
		permissionRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<Permission> retrieveAllPermissions() {
			
		return (List<Permission>)this.permissionRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public Permission retrievePermission(int id) {
		return this.permissionRepository.findById(id).get();
	}
//------------------------------------------------------------	
	 @Transactional
	 public Permission modifierPermissionById(int permissionId, Permission u) {
		  
		 Permission fct = permissionRepository.findById(permissionId).orElse(null);
				
				fct.setType(u.getType());
				fct.setProfil(u.getProfil());
			fct.setFonction(u.getFonction());
		    
		        return permissionRepository.save(fct);
		 
		}

	
}
