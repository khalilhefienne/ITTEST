package com.project.microservice.controller;

import java.util.HashSet;




import java.util.List;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.project.microservice.entity.ChatRequest;
import com.project.microservice.entity.ChatResponse;
import com.project.microservice.entity.Fonction;
import com.project.microservice.entity.Permission;
import com.project.microservice.entity.Profil;

import com.project.microservice.entity.Utilisateur;
import com.project.microservice.service.FonctionService;
import com.project.microservice.service.PermissionService;
import com.project.microservice.service.ProfilService;
import com.project.microservice.service.UtilisateurService;

import lombok.Data;


@RestController


public class AdministrationRestAPI {
	
	@Autowired  
	ProfilService ProfilServImp;

	@Autowired  
	FonctionService FonctionServiceImp;
	  @Autowired
	    private PermissionService PermissionServiceImp;
	
	
	//profil crud 
	
	@GetMapping("retrieve-all-Profils")
	@ResponseBody
	public List<Profil> getAllProfilts(){
		return this.ProfilServImp.retrieveAllProfils();
	}
	
	@GetMapping("/retrieve-Profil/{profil_id}")  
	@ResponseBody
	private Optional<Profil> getProfil(@PathVariable("profil_id") int profil_id)   
	{  
		return Optional.ofNullable(this.ProfilServImp.retrieveProfil(profil_id)); 
	}
	
	@DeleteMapping("/remove-Profil/{profil_id}")  
	@ResponseBody
	private void deleteProfil(@PathVariable("profil_id") int profil_id)   
	{  
		this.ProfilServImp.deleteProfil(profil_id);
	}
	
	@PutMapping("/modify-Profil/{id}")
	@ResponseBody
	public ResponseEntity<Profil> updateProfil(@PathVariable int id, @RequestBody Profil c){
		Profil updatedProfil = ProfilServImp.updateProfil(id, c);
		return ResponseEntity.ok(updatedProfil);
	}
	
	@PostMapping("/add-Profil")
	@ResponseBody
	public Profil addProfil(@RequestBody Profil c) {
		return this.ProfilServImp.addProfil(c);
	}
	
	//fonction crud 
	@GetMapping("retrieve-all-Fonctions")
	@ResponseBody
	public List<Fonction> getAllFonctions(){
		return this.FonctionServiceImp.retrieveAllFonctions();
	}
	
	@GetMapping("/retrieve-Fonction/{fonction_id}")  

	@ResponseBody
	private Optional<Fonction> getFonction(@PathVariable("fonction_id") int fonction_id)   
	{  
		return Optional.ofNullable(this.FonctionServiceImp.retrieveFonction(fonction_id)); 
	}
	
	@DeleteMapping("/remove-Fonction/{fonction_id}")  
	@ResponseBody
	private void deleteFonction(@PathVariable("fonction_id") int fonction_id)   
	{  
		this.FonctionServiceImp.deleteFonction(fonction_id);
	}
	
	@PutMapping("/modify-Fonction/{id}")
	@ResponseBody
	public ResponseEntity<Fonction> updateFonction(@PathVariable int id, @RequestBody Fonction c){
		Fonction updatedFonction = FonctionServiceImp.updateFonction(c,id);
		return ResponseEntity.ok(updatedFonction);
		
	}
	  @PutMapping("/update-Fonction")
	    public ResponseEntity<Fonction> updateFonction(@RequestBody Fonction employee) {
		  Fonction updateFonction = FonctionServiceImp.update(employee);
	        return new ResponseEntity<>(updateFonction, HttpStatus.OK);
	    }
	
	
	@PostMapping("/add-Fonction")
	@ResponseBody
	public Fonction addFonction(@RequestBody Fonction c) {
		return this.FonctionServiceImp.addFonction(c);
	}
	
	//permission crud
	@GetMapping("retrieve-all-Permissions")
	@ResponseBody
	public List<Permission> getAllPermissions(){
		return this.PermissionServiceImp.retrieveAllPermissions();
	}
	
	@GetMapping("/retrieve-Permission/{permission_id}")  
	@ResponseBody
	private Optional<Permission> getPermission(@PathVariable("permission_id") int permission_id)   
	{  
		return Optional.ofNullable(this.PermissionServiceImp.retrievePermission(permission_id)); 
	}
	
	@DeleteMapping("/remove-Permission/{permission_id}")  
	@ResponseBody
	private void deletePermission(@PathVariable("permission_id") int permission_id)   
	{  
		this.PermissionServiceImp.deletePermission(permission_id);
	}
	
	 @PostMapping("/add-Permission")
	 @ResponseBody
	    public Permission addPermission(@RequestBody Permission permission) {
	        return PermissionServiceImp.savePermission(permission);
	    }
	

	    @PutMapping("/modify-Permission/{id}")
	    public Permission updatePermission(@RequestBody Permission permission, @PathVariable int id) {
	        return PermissionServiceImp.modifierPermissionById(id, permission);
	    }

	 
}
@Data
class AffectForm{
    private String nom;
    private int permission_id;
}
