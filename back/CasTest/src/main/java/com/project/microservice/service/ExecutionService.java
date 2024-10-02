package com.project.microservice.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.microservice.entity.CasTest;
import com.project.microservice.entity.Etape;
import com.project.microservice.entity.Execution;
import com.project.microservice.repository.CasTestRepository;
import com.project.microservice.repository.EtapeRepository;
import com.project.microservice.repository.ExecutionRepository;

@Service
public class ExecutionService  implements ExecutionServiceI  {
	
	@Autowired
	ExecutionRepository ExecutionRepository;
	 @Autowired
	    private EtapeRepository etapeRepository;
		
	 @Autowired
		CasTestRepository CasTestRepository;
//------------------------------------------------------------
	@Override
	public Execution addExecution(Execution c) {
		ExecutionRepository.save(c);
		return c;
	}
	@Override
	public String ajouterExecution(int test_id) {
        CasTest casTest = CasTestRepository.findById(test_id).orElse(null);
        List<Etape> etapes = etapeRepository.findByCasTest(casTest);
        String resultatExecution = getResultatExecution(etapes);
        Execution nouvelleExecution = new Execution();
        nouvelleExecution.setCasTest(casTest);
        nouvelleExecution.setResultat(resultatExecution);
        nouvelleExecution.setDate(new Date());
        ExecutionRepository.save(nouvelleExecution);
        return resultatExecution;
    }



	private String getResultatExecution(List<Etape> etapes) {
	    boolean allEchoue = etapes.stream().allMatch(etape -> etape.getEtat_execution().equals("Échec"));
	    boolean allBloque = etapes.stream().allMatch(etape -> etape.getEtat_execution().equals("Bloqué"));
	    boolean anyEchoue = etapes.stream().anyMatch(etape -> etape.getEtat_execution().equals("Échec"));
	    boolean anyBloque = etapes.stream().anyMatch(etape -> etape.getEtat_execution().equals("Bloqué"));

	    if (allEchoue) {
	        return "Échec";
	    } else if (allBloque) {
	        return "Bloqué";
	    } else if (anyEchoue) {
	        return "Échec";
	    } else if (anyBloque) {
	        return "Bloqué";
	    } else {
	        return "Succès";
	    }
	}

//------------------------------------------------------------	

	@Override
	public void deleteExecution(int id) {
		ExecutionRepository.deleteById(id);
	}
	//------------------------------------------------------------	
	@Override
	  public int getExecutionCountByTestCase(CasTest casTest) {
	        return ExecutionRepository.countByCasTest(casTest);
	    }
//------------------------------------------------------------	
	@Override
	public List<Execution> retrieveExecutionsByCasTest(CasTest casTest) {
	    return this.ExecutionRepository.findByCasTest(casTest);
	}
	//------------------------------------------------------------		
	@Override
	public List<Execution> retrieveAllExecutions() {
			
		return (List<Execution>)this.ExecutionRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public Execution retrieveExecution(int id) {
		return this.ExecutionRepository.findById(id).get();
	}
//------------------------------------------------------------	

	@Override
	public Execution updateExecution(Execution u,int id) {
		
		Execution fct = ExecutionRepository.findById(id).orElse(null);
		
		fct.setCasTest(u.getCasTest());
		fct.setResultat(u.getResultat());
	
		fct.setDate(u.getDate());



	
		
		return this.ExecutionRepository.save(fct);
	}
	//---------------------------------------------
	 public Execution update(Execution employee) {
	        return ExecutionRepository.save(employee);
	    }
	 
}