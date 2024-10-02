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
import com.project.microservice.entity.Etape;
import com.project.microservice.entity.Etape;

import com.project.microservice.service.*;

import lombok.Data;
import java.io.ByteArrayInputStream;

import org.springframework.http.MediaType;

@RestController


public class EtapeRestAPI {
	
	
	  @Autowired
	  private EtapeService  EtapeService;
	  @Autowired
	  private CasTestService  CasTestService;
	  
	  @GetMapping("/etapes/{casTestId}")
	  public List<Etape> getEtapesByCasTest(@PathVariable int casTestId) {
	      CasTest casTest = CasTestService.retrieveCasTest(casTestId);
	      return EtapeService.retrieveEtapesByCasTest(casTest);
	  }
	  
	  @GetMapping("retrieve-all-Etapes")
		@ResponseBody
		public List<Etape> getAllEtapes(){
			return this.EtapeService.retrieveAllEtapes();
		
	  }
		@GetMapping("/retrieve-Etape/{etape_id}")  
		@ResponseBody
		private Optional<Etape> getEtape(@PathVariable("etape_id") int etape_id)   
		{  
			return Optional.ofNullable(this.EtapeService.retrieveEtape(etape_id)); 
		}
		
		@DeleteMapping("/remove-Etape/{etape_id}")  
		@ResponseBody
		private void deleteEtape(@PathVariable("etape_id") int etape_id)   
		{  
			this.EtapeService.deleteEtape(etape_id);
		}
		
		@PutMapping("/modify-Etape/{id}")
		@ResponseBody
		public ResponseEntity<Etape> updateEtape(@PathVariable int id, @RequestBody Etape c){
			Etape updatedEtape = EtapeService.updateEtape(c,id);
			return ResponseEntity.ok(updatedEtape);
			
		}
		  @PutMapping("/update-Etape")
		    public ResponseEntity<Etape> updateEtape(@RequestBody Etape employee) {
			  Etape updateEtape = EtapeService.update(employee);
		        return new ResponseEntity<>(updateEtape, HttpStatus.OK);
		    }
		
		
	
		@PostMapping("/addEtape/{test_id}")
		@ResponseBody
		public ResponseEntity<Etape> addEtape(@RequestBody Etape etape, @PathVariable int test_id) {
		    try {
		        Etape nouvelleEtape = EtapeService.addEtape(etape, test_id);
		        // Utilisez la nouvelle étape comme vous le souhaitez...

		        // Retourne la nouvelle étape dans la réponse avec un statut 200 OK
		        return ResponseEntity.ok(nouvelleEtape);
		    } catch (Exception e) {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		    }
		}

		   @GetMapping("/countEtapeByTestCase")
		    public int getEtapeCountByTestCase(@RequestParam("test_id") int test_id) {
		        CasTest testCase = CasTestService.retrieveCasTest(test_id);
		        if (testCase != null) {
		            return EtapeService.getEtapeCountByTestCase(testCase);
		        } else {
		            throw new IllegalArgumentException("Invalid testCaseId: " + test_id);
		        }
		    }


}
