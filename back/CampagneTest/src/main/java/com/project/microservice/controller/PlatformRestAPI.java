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

import com.project.microservice.entity.Platform;

import com.project.microservice.service.PlatformService;



@RestController

public class PlatformRestAPI {
	
	
	  @Autowired
	  private PlatformService  PlatformServiceImp;
	
	
		//Platform crud 
		@GetMapping("retrieve-all-Platforms")
		@ResponseBody
		public List<Platform> getAllPlatforms(){
			return this.PlatformServiceImp.retrieveAllPlatforms();
		}
		
		@GetMapping("/retrieve-Platform/{platform_id}")  
		@ResponseBody
		private Optional<Platform> getPlatform(@PathVariable("platform_id") int platform_id)   
		{  
			return Optional.ofNullable(this.PlatformServiceImp.retrievePlatform(platform_id)); 
		}
		
		@DeleteMapping("/remove-Platform/{platform_id}")  
		@ResponseBody
		private void deletePlatform(@PathVariable("platform_id") int platform_id)   
		{  
			this.PlatformServiceImp.deletePlatform(platform_id);
		}
		
		@PutMapping("/modify-Platform/{id}")
		@ResponseBody
		public ResponseEntity<Platform> updatePlatform(@PathVariable int id, @RequestBody Platform c){
			Platform updatedPlatform = PlatformServiceImp.updatePlatform(c,id);
			return ResponseEntity.ok(updatedPlatform);
			
		}
		  @PutMapping("/update-Platform")
		    public ResponseEntity<Platform> updatePlatform(@RequestBody Platform employee) {
			  Platform updatePlatform = PlatformServiceImp.update(employee);
		        return new ResponseEntity<>(updatePlatform, HttpStatus.OK);
		    }
		
		
		@PostMapping("/add-Platform")
		@ResponseBody
		public Platform addPlatform(@RequestBody Platform c) {
			return this.PlatformServiceImp.addPlatform(c);
		}
	 


}
