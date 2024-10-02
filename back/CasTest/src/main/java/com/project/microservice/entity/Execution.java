package com.project.microservice.entity;

import java.util.ArrayList;

import java.util.Collection;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "execution")


public class Execution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int execution_id;

  
    private String resultat;
  

  
    @ManyToOne
    @JoinColumn(name = "test_id")
    private CasTest casTest;
	
    @Temporal(TemporalType.DATE)
		private Date date;

	public int getExecution_id() {
		return execution_id;
	}

	public String getResultat() {
		return resultat;
	}

	

	public CasTest getCasTest() {
		return casTest;
	}

	public Date getDate() {
		return date;
	}

	public void setExecution_id(int execution_id) {
		this.execution_id = execution_id;
	}

	public void setResultat(String resultat) {
		this.resultat = resultat;
	}

	



	public void setCasTest(CasTest casTest) {
		this.casTest = casTest;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Execution(int execution_id, String resultat,  CasTest casTest, Date date) {
		super();
		this.execution_id = execution_id;
		this.resultat = resultat;
	
		this.casTest = casTest;
		this.date = date;
	}

	public Execution(String resultat, CasTest casTest, Date date) {
		super();
		this.resultat = resultat;
	
		this.casTest = casTest;
		this.date = date;
	}

	public Execution() {
		super();
	}

    
  


    
	
    
}