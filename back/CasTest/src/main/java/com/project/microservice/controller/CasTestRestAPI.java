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

import com.project.microservice.entity.CasTest;
import com.project.microservice.entity.CasTest;

import com.project.microservice.service.CasTestService;

import lombok.Data;
import java.io.ByteArrayInputStream;

import org.springframework.http.MediaType;

@RestController


public class CasTestRestAPI {
	
	
	  @Autowired
	  private CasTestService  CasTestService;
	
	  
	  
	  
	  @GetMapping("retrieve-all-CasTests")
		@ResponseBody
		public List<CasTest> getAllCasTests(){
			return this.CasTestService.retrieveAllCasTests();
		
	  }
		@GetMapping("/retrieve-CasTest/{test_id}")  
		@ResponseBody
		private Optional<CasTest> getCasTest(@PathVariable("test_id") int test_id)   
		{  
			return Optional.ofNullable(this.CasTestService.retrieveCasTest(test_id)); 
		}
		
		@DeleteMapping("/remove-CasTest/{test_id}")  
		@ResponseBody
		private void deleteCasTest(@PathVariable("test_id") int test_id)   
		{  
			this.CasTestService.deleteCasTest(test_id);
		}
		
		@PutMapping("/modify-CasTest/{id}")
		@ResponseBody
		public ResponseEntity<CasTest> updateCasTest(@PathVariable int id, @RequestBody CasTest c){
			CasTest updatedCasTest = CasTestService.updateCasTest(c,id);
			return ResponseEntity.ok(updatedCasTest);
			
		}
		  @PutMapping("/update-CasTest")
		    public ResponseEntity<CasTest> updateCasTest(@RequestBody CasTest employee) {
			  CasTest updateCasTest = CasTestService.update(employee);
		        return new ResponseEntity<>(updateCasTest, HttpStatus.OK);
		    }
		
		
		@PostMapping("/add-CasTest")
		@ResponseBody
		public CasTest addCasTest(@RequestBody CasTest c) {
			return this.CasTestService.addCasTest(c);
		}
	   
		   @GetMapping("/countCasesByCampagne")
		    public int getCaseCountByCampagne(@RequestParam("campagneId") int campagneId) {
		      
		       
		            return CasTestService.getCasTestCountByCampagne(campagneId);
		      
		    }
		   @GetMapping("/countCasesBySenario")
		    public int getCaseCountBySenario(@RequestParam("senarioId") int senarioId) {
		      
		       
		            return CasTestService.getCasTestCountBySenario(senarioId);
		      
		    }
		   
		   @GetMapping("/CasTests/{senarioId}")
		   public ResponseEntity<List<CasTest>> getCasTestsBySenarioId(@PathVariable int senarioId) {
		       List<CasTest> casTests = CasTestService.getCasTestsBySenarioId(senarioId);
		       return ResponseEntity.ok(casTests);
		   }

		   @PostMapping("/createCasTest/{senarioId}")
		   public ResponseEntity<CasTest> addCasTest(@RequestBody CasTest casTest, @PathVariable int senarioId) {
		       casTest.setSenarioId(senarioId);
		       CasTest createdCasTest = CasTestService.addCasTest(casTest, senarioId);
		       return ResponseEntity.ok(createdCasTest);
		   }



}
