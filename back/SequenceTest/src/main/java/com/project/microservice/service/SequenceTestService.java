package com.project.microservice.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.project.microservice.entity.SequenceTest;
import com.project.microservice.repository.SequenceTestRepository;

@Service
public class SequenceTestService  implements SequenceTestServiceI  {
	
	@Autowired
	SequenceTestRepository SequenceTestRepository;
		
//------------------------------------------------------------
	@Override
	public SequenceTest addSequenceTest(SequenceTest c) {
		SequenceTestRepository.save(c);
		return c;
	}
//------------------------------------------------------------	

	@Override
	public void deleteSequenceTest(int id) {
		SequenceTestRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<SequenceTest> retrieveAllSequenceTests() {
			
		return (List<SequenceTest>)this.SequenceTestRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public SequenceTest retrieveSequenceTest(int id) {
		return this.SequenceTestRepository.findById(id).get();
	}
//------------------------------------------------------------	

	@Override
	public SequenceTest updateSequenceTest(SequenceTest u,int id) {
		
		SequenceTest fct = SequenceTestRepository.findById(id).orElse(null);
		
		fct.setTitre(u.getTitre());
		fct.setType(u.getType());
		fct.setVersion(u.getVersion());
	fct.setDate_creation(u.getDate_creation());
		fct.setProjetId(u.getProjetId());
		fct.setPerimetre(u.getPerimetre());
	
		
		return this.SequenceTestRepository.save(fct);
	}
	//---------------------------------------------
	 public SequenceTest update(SequenceTest employee) {
	        return SequenceTestRepository.save(employee);
	    }
	 
	 //------------------------------------
		@Override
	    public List<SequenceTest> getSequenceTestsByProjetId(int projetId) {
	        return SequenceTestRepository.findByProjetId(projetId);
	    }
		//---------------------
		
		@Override
		public SequenceTest addSequenceTest(SequenceTest c,int projetId) {
	        
	        c.setProjetId(projetId);

	        SequenceTestRepository.save(c);
			return c;
		}
		
		@Override
		  public int getSequenceCountByProjet(int projetId) {
		        return SequenceTestRepository.countByProjetId(projetId);
		    }
}