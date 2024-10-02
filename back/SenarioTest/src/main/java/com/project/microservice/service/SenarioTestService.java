package com.project.microservice.service;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.microservice.entity.SenarioTest;
import com.project.microservice.repository.SenarioTestRepository;

@Service
public class SenarioTestService  implements SenarioTestServiceI  {
	
	@Autowired
	SenarioTestRepository SenarioTestRepository;
		
//------------------------------------------------------------
	@Override
	public SenarioTest addSenarioTest(SenarioTest c) {
		SenarioTestRepository.save(c);
		return c;
	}
//------------------------------------------------------------	

	@Override
	public void deleteSenarioTest(int id) {
		SenarioTestRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<SenarioTest> retrieveAllSenarioTests() {
			
		return (List<SenarioTest>)this.SenarioTestRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public SenarioTest retrieveSenarioTest(int id) {
		return this.SenarioTestRepository.findById(id).get();
	}
//------------------------------------------------------------	

	@Override
	public SenarioTest updateSenarioTest(SenarioTest u,int id) {
		
		SenarioTest fct = SenarioTestRepository.findById(id).orElse(null);
		
		fct.setNom(u.getNom());
		fct.setDetails(u.getDetails());
		fct.setSequenceId(u.getSequenceId());
		
	
		
		return this.SenarioTestRepository.save(fct);
	}
	//---------------------------------------------
	 public SenarioTest update(SenarioTest employee) {
	        return SenarioTestRepository.save(employee);
	    }
	 
	 //------------------------------
		@Override
	    public List<SenarioTest> getSenarioTestsByProjetId(int sequenceId) {
	        return SenarioTestRepository.findBySequenceId(sequenceId);
	    }
		//---------------------
		
		@Override
		public SenarioTest addSenarioTest(SenarioTest c,int sequenceId) {
	        
	        c.setSequenceId(sequenceId);

	        SenarioTestRepository.save(c);
			return c;
		}
		//-----------------------------------------
		@Override
		  public int getSenarioCountBySequence(int SequenceId) {
		        return SenarioTestRepository.countBySequenceId(SequenceId);
		    }
	 
}