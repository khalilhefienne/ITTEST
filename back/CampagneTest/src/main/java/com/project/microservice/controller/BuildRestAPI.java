package com.project.microservice.controller;

import java.util.List;

import java.util.Optional;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.microservice.entity.Build;

import com.project.microservice.service.BuildService;



@RestController

public class BuildRestAPI {
	
	
	  @Autowired
	  private BuildService  BuildServiceImp;
	
	
		//Build crud 
		@GetMapping("retrieve-all-Builds")
		@ResponseBody
		public List<Build> getAllBuilds(){
			return this.BuildServiceImp.retrieveAllBuilds();
		}
		
		@GetMapping("/retrieve-Build/{build_id}")  
		@ResponseBody
		private Optional<Build> getBuild(@PathVariable("build_id") int build_id)   
		{  
			return Optional.ofNullable(this.BuildServiceImp.retrieveBuild(build_id)); 
		}
		
		@DeleteMapping("/remove-Build/{build_id}")  
		@ResponseBody
		private void deleteBuild(@PathVariable("build_id") int build_id)   
		{  
			this.BuildServiceImp.deleteBuild(build_id);
		}
		
		@PutMapping("/modify-Build/{id}")
		@ResponseBody
		public ResponseEntity<Build> updateBuild(@PathVariable int id, @RequestBody Build c){
			Build updatedBuild = BuildServiceImp.updateBuild(c,id);
			return ResponseEntity.ok(updatedBuild);
			
		}
		  @PutMapping("/update-Build")
		    public ResponseEntity<Build> updateBuild(@RequestBody Build employee) {
			  Build updateBuild = BuildServiceImp.update(employee);
		        return new ResponseEntity<>(updateBuild, HttpStatus.OK);
		    }
		
		
		@PostMapping("/add-Build")
		@ResponseBody
		public Build addBuild(@RequestBody Build c) {
			return this.BuildServiceImp.addBuild(c);
		}
	 


}
