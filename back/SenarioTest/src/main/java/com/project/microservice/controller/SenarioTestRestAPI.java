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

import com.project.microservice.entity.SenarioTest;

import com.project.microservice.service.SenarioTestService;

import lombok.Data;


@RestController


public class SenarioTestRestAPI {
	
	
	  @Autowired
	  private SenarioTestService  SenarioTestServiceImp;
	
	    
		//SenarioTest crud 
		@GetMapping("retrieve-all-SenarioTests")
		@ResponseBody
		public List<SenarioTest> getAllSenarioTests(){
			return this.SenarioTestServiceImp.retrieveAllSenarioTests();
		}
		
		@GetMapping("/retrieve-SenarioTest/{SenarioTest_id}")  
		@ResponseBody
		private Optional<SenarioTest> getSenarioTest(@PathVariable("SenarioTest_id") int SenarioTest_id)   
		{  
			return Optional.ofNullable(this.SenarioTestServiceImp.retrieveSenarioTest(SenarioTest_id)); 
		}
		
		@DeleteMapping("/remove-SenarioTest/{SenarioTest_id}")  
		@ResponseBody
		private void deleteSenarioTest(@PathVariable("SenarioTest_id") int SenarioTest_id)   
		{  
			this.SenarioTestServiceImp.deleteSenarioTest(SenarioTest_id);
		}
		
		@PutMapping("/modify-SenarioTest/{id}")
		@ResponseBody
		public ResponseEntity<SenarioTest> updateSenarioTest(@PathVariable int id, @RequestBody SenarioTest c){
			SenarioTest updatedSenarioTest = SenarioTestServiceImp.updateSenarioTest(c,id);
			return ResponseEntity.ok(updatedSenarioTest);
			
		}
		  @PutMapping("/update-SenarioTest")
		    public ResponseEntity<SenarioTest> updateSenarioTest(@RequestBody SenarioTest employee) {
			  SenarioTest updateSenarioTest = SenarioTestServiceImp.update(employee);
		        return new ResponseEntity<>(updateSenarioTest, HttpStatus.OK);
		    }
		
		
		@PostMapping("/add-SenarioTest")
		@ResponseBody
		public SenarioTest addSenarioTest(@RequestBody SenarioTest c) {
			return this.SenarioTestServiceImp.addSenarioTest(c);
		}
	 
	    
	    
	    @GetMapping("/senarios/{sequenceId}")
	    public ResponseEntity<List<SenarioTest>> getSenarioTestsByProjetId(@PathVariable int sequenceId) {
	        List<SenarioTest> senarioTests = SenarioTestServiceImp.getSenarioTestsByProjetId(sequenceId);
	        return ResponseEntity.ok(senarioTests);
	    }
	    
	    @PostMapping("/createSenario/{sequenceId}")
	    public ResponseEntity<SenarioTest> addSenarioTest(@RequestBody SenarioTest senarioTest, @PathVariable int sequenceId) {
	        senarioTest.setSequenceId(sequenceId);
	        SenarioTest createdSenarioTest = SenarioTestServiceImp.addSenarioTest(senarioTest, sequenceId);
	        return ResponseEntity.ok(createdSenarioTest);
	    }
	   
	    @GetMapping("/countSenarioCountBySequence")
	    public int getSenarioCountBySequence(@RequestParam("sequenceId") int sequenceId) {
	      
	       
	            return SenarioTestServiceImp.getSenarioCountBySequence(sequenceId);
	      
	    }
}
