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

import com.project.microservice.entity.SequenceTest;
import com.project.microservice.service.ExportpdfService;
import com.project.microservice.service.SequenceTestService;

import lombok.Data;
import java.io.ByteArrayInputStream;

import org.springframework.http.MediaType;

@RestController


public class SequenceTestRestAPI {
	
	
	  @Autowired
	  private SequenceTestService  SequenceTestServiceImp;
	
	  @Autowired
	    ExportpdfService export;  
		//SequenceTest crud 
		@GetMapping("retrieve-all-SequenceTests")
		@ResponseBody
		public List<SequenceTest> getAllSequenceTests(){
			return this.SequenceTestServiceImp.retrieveAllSequenceTests();
		}
		
		@GetMapping("/retrieve-SequenceTest/{SequenceTest_id}")  
		@ResponseBody
		private Optional<SequenceTest> getSequenceTest(@PathVariable("SequenceTest_id") int SequenceTest_id)   
		{  
			return Optional.ofNullable(this.SequenceTestServiceImp.retrieveSequenceTest(SequenceTest_id)); 
		}
		
		@DeleteMapping("/remove-SequenceTest/{SequenceTest_id}")  
		@ResponseBody
		private void deleteSequenceTest(@PathVariable("SequenceTest_id") int SequenceTest_id)   
		{  
			this.SequenceTestServiceImp.deleteSequenceTest(SequenceTest_id);
		}
		
		@PutMapping("/modify-SequenceTest/{id}")
		@ResponseBody
		public ResponseEntity<SequenceTest> updateSequenceTest(@PathVariable int id, @RequestBody SequenceTest c){
			SequenceTest updatedSequenceTest = SequenceTestServiceImp.updateSequenceTest(c,id);
			return ResponseEntity.ok(updatedSequenceTest);
			
		}
		  @PutMapping("/update-SequenceTest")
		    public ResponseEntity<SequenceTest> updateSequenceTest(@RequestBody SequenceTest employee) {
			  SequenceTest updateSequenceTest = SequenceTestServiceImp.update(employee);
		        return new ResponseEntity<>(updateSequenceTest, HttpStatus.OK);
		    }
		
		
		@PostMapping("/add-SequenceTest")
		@ResponseBody
		public SequenceTest addSequenceTest(@RequestBody SequenceTest c) {
			return this.SequenceTestServiceImp.addSequenceTest(c);
		}
	    @GetMapping("/exportpdf")
	    public ResponseEntity<InputStreamResource> exportPdf() {
	        List<SequenceTest> seqs = (List<SequenceTest>) SequenceTestServiceImp.retrieveAllSequenceTests();
	        ByteArrayInputStream bais = export.eventExport(seqs);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Disposition", "inline;filename=sequence.pdf");
	        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(bais));
	    }
	    
	    @GetMapping("/sequences/{projetId}")
	    public ResponseEntity<List<SequenceTest>> getSequenceTestsByProjetId(@PathVariable int projetId) {
	        List<SequenceTest> sequenceTests = SequenceTestServiceImp.getSequenceTestsByProjetId(projetId);
	        return ResponseEntity.ok(sequenceTests);
	    }
	    @PostMapping("/createSequence/{projetId}")
	    public ResponseEntity<SequenceTest> addSequenceTest(@RequestBody SequenceTest sequenceTest, @PathVariable int projetId) {
	        sequenceTest.setProjetId(projetId);
	        SequenceTest createdSequenceTest = SequenceTestServiceImp.addSequenceTest(sequenceTest, projetId);
	        return ResponseEntity.ok(createdSequenceTest);
	    }
	
	    @GetMapping("/countSequenceByProjet")
	    public int getSequenceCountByProjet(@RequestParam("projetId") int projetId) {
	      
	       
	            return SequenceTestServiceImp.getSequenceCountByProjet(projetId);
	      
	    }

}
