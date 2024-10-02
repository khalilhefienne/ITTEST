package com.project.microservice.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.microservice.entity.CasTest;
import com.project.microservice.repository.CasTestRepository;

@Service
public class CasTestService  implements CasTestServiceI  {
	
	@Autowired
	CasTestRepository CasTestRepository;
		
//------------------------------------------------------------
	@Override
	public CasTest addCasTest(CasTest c) {
		CasTestRepository.save(c);
		return c;
	}
//------------------------------------------------------------	

	@Override
	public void deleteCasTest(int id) {
		CasTestRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<CasTest> retrieveAllCasTests() {
			
		return (List<CasTest>)this.CasTestRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public CasTest retrieveCasTest(int id) {
		return this.CasTestRepository.findById(id).get();
	}
//------------------------------------------------------------	

	@Override
	public CasTest updateCasTest(CasTest u,int id) {
		
		CasTest fct = CasTestRepository.findById(id).orElse(null);
		
		fct.setSenarioId(u.getSenarioId());
		fct.setTitre(u.getTitre());
		fct.setPreconditions(u.getPreconditions());
		fct.setStatut(u.isStatut());
		fct.setDuree_estime(u.getDuree_estime());
		fct.setCampagneId(u.getCampagneId());


	
		
		return this.CasTestRepository.save(fct);
	}
	//---------------------------------------------
	 public CasTest update(CasTest employee) {
	        return CasTestRepository.save(employee);
	    }
	 
	//------------------------------------------------------------	
		@Override
		  public int getCasTestCountByCampagne(int campagneId) {
		        return CasTestRepository.countByCampagneId(campagneId);
		    }
		//-----------------
		@Override
		  public int getCasTestCountBySenario(int senarioId) {
		        return CasTestRepository.countBySenarioId(senarioId);
		    }
		@Override
		public List<CasTest> getCasTestsBySenarioId(int senarioId) {
		    return CasTestRepository.findBySenarioId(senarioId);
		}
		//---------------------

		@Override
		public CasTest addCasTest(CasTest casTest, int senarioId) {
		    casTest.setSenarioId(senarioId);
		    CasTestRepository.save(casTest);
		    return casTest;
		}

}