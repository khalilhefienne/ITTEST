package com.project.microservice.service;

import java.util.Date;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.microservice.entity.CasTest;
import com.project.microservice.entity.Etape;
import com.project.microservice.entity.Execution;
import com.project.microservice.repository.*;

@Service
public class EtapeService  implements EtapeServiceI  {
	
	@Autowired
	EtapeRepository EtapeRepository;
	@Autowired
	CasTestRepository CasTestRepository;
		
//------------------------------------------------------------
	@Override
	public Etape addEtape(Etape c,int test_id) {
        CasTest casTest = CasTestRepository.findById(test_id).orElse(null);
        
        c.setCasTest(casTest);

		EtapeRepository.save(c);
		return c;
	}
	
//------------------------------------------------------------	

	@Override
	public void deleteEtape(int id) {
		EtapeRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<Etape> retrieveAllEtapes() {
			
		return (List<Etape>)this.EtapeRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public List<Etape> retrieveEtapesByCasTest(CasTest casTest) {
	    return this.EtapeRepository.findByCasTest(casTest);
	}

	//------------------------------------------------------------	
	@Override
	public Etape retrieveEtape(int id) {
		return this.EtapeRepository.findById(id).get();
	}
	
	//------------------------------------------------------------	
	@Override
	  public int getEtapeCountByTestCase(CasTest casTest) {
	        return EtapeRepository.countByCasTest(casTest);
	    }
//------------------------------------------------------------	

	@Override
	public Etape updateEtape(Etape u,int id) {
		
		Etape fct = EtapeRepository.findById(id).orElse(null);
		
		fct.setCasTest(u.getCasTest());
		fct.setDescription(u.getDescription());
		fct.setType_execution(u.getType_execution());
		fct.setResultat_attendu(u.getResultat_attendu());
		fct.setEtat_execution(u.getEtat_execution());
		fct.setOrdre(u.getOrdre());
		



	
		
		return this.EtapeRepository.save(fct);
	}
	//---------------------------------------------
	 public Etape update(Etape employee) {
	        return EtapeRepository.save(employee);
	    }
	 
}