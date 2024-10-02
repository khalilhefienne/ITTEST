package com.project.microservice.controller;

import java.util.HashSet;





import java.util.List;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
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

import com.project.microservice.entity.MotsCle;
import com.project.microservice.entity.MotsCle;

import com.project.microservice.service.MotsCleService;

import lombok.Data;
import java.io.ByteArrayInputStream;

import org.springframework.http.MediaType;

@RestController


public class MotsCleRestAPI {
	
	
	  @Autowired
	  private MotsCleService  MotsCleService;
	
	  
	  
	  
	  @GetMapping("retrieve-all-MotsCles")
		@ResponseBody
		public List<MotsCle> getAllMotsCles(){
			return this.MotsCleService.retrieveAllMotsCles();
		
	  }
		@GetMapping("/retrieve-MotsCle/{mot_id}")  
		@ResponseBody
		private Optional<MotsCle> getMotsCle(@PathVariable("mot_id") int mot_id)   
		{  
			return Optional.ofNullable(this.MotsCleService.retrieveMotsCle(mot_id)); 
		}
		
		@DeleteMapping("/remove-MotsCle/{mot_id}")  
		@ResponseBody
		private void deleteMotsCle(@PathVariable("mot_id") int mot_id)   
		{  
			this.MotsCleService.deleteMotsCle(mot_id);
		}
		
		@PutMapping("/modify-MotsCle/{id}")
		@ResponseBody
		public ResponseEntity<MotsCle> updateMotsCle(@PathVariable int id, @RequestBody MotsCle c){
			MotsCle updatedMotsCle = MotsCleService.updateMotsCle(c,id);
			return ResponseEntity.ok(updatedMotsCle);
			
		}
		  @PutMapping("/update-MotsCle")
		    public ResponseEntity<MotsCle> updateMotsCle(@RequestBody MotsCle employee) {
			  MotsCle updateMotsCle = MotsCleService.update(employee);
		        return new ResponseEntity<>(updateMotsCle, HttpStatus.OK);
		    }
		
		
		@PostMapping("/add-MotsCle")
		@ResponseBody
		public MotsCle addMotsCle(@RequestBody MotsCle c) {
			return this.MotsCleService.addMotsCle(c);
		}
	   


}
