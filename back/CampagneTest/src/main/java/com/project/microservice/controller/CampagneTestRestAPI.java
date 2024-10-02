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

import com.project.microservice.entity.CampagneTest;

import com.project.microservice.service.CampagneTestService;



@RestController



public class CampagneTestRestAPI {
	
	
	  @Autowired
	  private CampagneTestService  CampagneTestServiceImp;
	
	
		//CampagneTest crud 
		@GetMapping("retrieve-all-CampagneTests")
		@ResponseBody
		public List<CampagneTest> getAllCampagneTests(){
			return this.CampagneTestServiceImp.retrieveAllCampagneTests();
		}
		
		@GetMapping("/retrieve-CampagneTest/{campagneId}")  
		@ResponseBody
		private Optional<CampagneTest> getCampagneTest(@PathVariable("campagneId") int campagneId)   
		{  
			return Optional.ofNullable(this.CampagneTestServiceImp.retrieveCampagneTest(campagneId)); 
		}
		
		@DeleteMapping("/remove-CampagneTest/{campagneId}")  
		@ResponseBody
		private void deleteCampagneTest(@PathVariable("campagneId") int campagneId)   
		{  
			this.CampagneTestServiceImp.deleteCampagneTest(campagneId);
		}
		
		@PutMapping("/modify-CampagneTest/{id}")
		@ResponseBody
		public ResponseEntity<CampagneTest> updateCampagneTest(@PathVariable int id, @RequestBody CampagneTest c){
			CampagneTest updatedCampagneTest = CampagneTestServiceImp.updateCampagneTest(c,id);
			return ResponseEntity.ok(updatedCampagneTest);
			
		}
		  @PutMapping("/update-CampagneTest")
		    public ResponseEntity<CampagneTest> updateCampagneTest(@RequestBody CampagneTest employee) {
			  CampagneTest updateCampagneTest = CampagneTestServiceImp.update(employee);
		        return new ResponseEntity<>(updateCampagneTest, HttpStatus.OK);
		    }
		
		
		@PostMapping("/add-CampagneTest")
		@ResponseBody
		public CampagneTest addCampagneTest(@RequestBody CampagneTest c) {
			return this.CampagneTestServiceImp.addCampagneTest(c);
		}
	 


}
