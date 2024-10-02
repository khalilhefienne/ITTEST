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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.microservice.entity.CasTest;
import com.project.microservice.entity.Etape;
import com.project.microservice.entity.Execution;
import com.project.microservice.service.CasTestService;
import com.project.microservice.service.ExecutionService;



@RestController


public class ExecutionRestAPI {
	
	
	  @Autowired
	  private ExecutionService  ExecutionService;
	
	  
	  @Autowired
	  private CasTestService  CasTestService;
	  
	  @GetMapping("/executions/{casTestId}")
	  public List<Execution> getEtapesByCasTest(@PathVariable int casTestId) {
	      CasTest casTest = CasTestService.retrieveCasTest(casTestId);
	      return ExecutionService.retrieveExecutionsByCasTest(casTest);
	  }
	  
	  
	  @GetMapping("retrieve-all-Executions")
		@ResponseBody
		public List<Execution> getAllExecutions(){
			return this.ExecutionService.retrieveAllExecutions();
		
	  }
		@GetMapping("/retrieve-Execution/{execution_id}")  
		@ResponseBody
		private Optional<Execution> getExecution(@PathVariable("execution_id") int execution_id)   
		{  
			return Optional.ofNullable(this.ExecutionService.retrieveExecution(execution_id)); 
		}
		
		@DeleteMapping("/remove-Execution/{execution_id}")  
		@ResponseBody
		private void deleteExecution(@PathVariable("execution_id") int execution_id)   
		{  
			this.ExecutionService.deleteExecution(execution_id);
		}
		
		@PutMapping("/modify-Execution/{id}")
		@ResponseBody
		public ResponseEntity<Execution> updateExecution(@PathVariable int id, @RequestBody Execution c){
			Execution updatedExecution = ExecutionService.updateExecution(c,id);
			return ResponseEntity.ok(updatedExecution);
			
		}
		  @PutMapping("/update-Execution")
		    public ResponseEntity<Execution> updateExecution(@RequestBody Execution employee) {
			  Execution updateExecution = ExecutionService.update(employee);
		        return new ResponseEntity<>(updateExecution, HttpStatus.OK);
		    }
		
		
		@PostMapping("/add-Execution")
		@ResponseBody
		public Execution addExecution(@RequestBody Execution c) {
			return this.ExecutionService.addExecution(c);
		}
		
		@PostMapping("/addExecution/{test_id}")
		public ResponseEntity<String> ajouterExecution(@PathVariable int test_id) {
		    try {
		        String resultat = ExecutionService.ajouterExecution(test_id);
		        // Utilisez le résultat comme vous le souhaitez...

		        // Retourne le résultat dans la réponse avec un statut 200 OK
		  
		        return ResponseEntity.ok("\"" + resultat + "\"");

		    } catch (Exception e) {
		    	String errorMessage = "Une erreur s'est produite lors de l'ajout de l'exécution : " + e.getMessage();
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		    }
		}

	    @GetMapping("/countByTestCase")
	    public int getExecutionCountByTestCase(@RequestParam("test_id") int test_id) {
	        CasTest testCase = CasTestService.retrieveCasTest(test_id);
	        if (testCase != null) {
	            return ExecutionService.getExecutionCountByTestCase(testCase);
	        } else {
	            throw new IllegalArgumentException("Invalid testCaseId: " + test_id);
	        }
	    }


}
