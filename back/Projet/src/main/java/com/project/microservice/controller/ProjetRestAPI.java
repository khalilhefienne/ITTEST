package com.project.microservice.controller;

import java.util.HashSet;





import java.util.List;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


import com.project.microservice.entity.Projet;
import com.project.microservice.service.ProjetService;

import lombok.Data;


@RestController

public class ProjetRestAPI {
	
	
	  @Autowired
	  private ProjetService  ProjetServiceImp;
	
	    
		//Projet crud 
		@GetMapping("retrieve-all-Projets")
		@ResponseBody
		public List<Projet> getAllProjets(){
			return this.ProjetServiceImp.retrieveAllProjets();
		}
		@GetMapping("/projets")
		public List<Projet> getProjetsByCreator(@RequestParam("creatorId") int creatorId) {
		    return ProjetServiceImp.retrieveProjetsByCreator(creatorId);
		}

		
		@GetMapping("/retrieve-Projet/{projet_id}")  
		@ResponseBody
		private Optional<Projet> getProjet(@PathVariable("projet_id") int projet_id)   
		{  
			return Optional.ofNullable(this.ProjetServiceImp.retrieveProjet(projet_id)); 
		}
		
		@DeleteMapping("/remove-Projet/{projet_id}")  
		@ResponseBody
		private void deleteProjet(@PathVariable("projet_id") int projet_id)   
		{  
			this.ProjetServiceImp.deleteProjet(projet_id);
		}
		
		@PutMapping("/modify-Projet/{id}")
		@ResponseBody
		public ResponseEntity<Projet> updateProjet(@PathVariable int id, @RequestBody Projet c){
			Projet updatedProjet = ProjetServiceImp.updateProjet(c,id);
			return ResponseEntity.ok(updatedProjet);
			
		}
		  @PutMapping("/update-Projet")
		    public ResponseEntity<Projet> updateProjet(@RequestBody Projet employee) {
			  Projet updateProjet = ProjetServiceImp.update(employee);
		        return new ResponseEntity<>(updateProjet, HttpStatus.OK);
		    }
		
		
		@PostMapping("/add-Projet")
		@ResponseBody
		public Projet addProjet(@RequestBody Projet c) {
			return this.ProjetServiceImp.addProjet(c);
		}
	   

}
