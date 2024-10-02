package com.project.microservice.entity;

import java.util.ArrayList;

import java.util.Collection;

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

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "etape")


public class Etape {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int etape_id;

  
  
  
    private String resultat_attendu;
    
    private String etat_execution;
    private String type_execution;
    private String description;
    private int ordre;
    @ManyToOne
    @JoinColumn(name = "test_id")
    private CasTest casTest;
	public int getEtape_id() {
		return etape_id;
	}
	
	public String getType_execution() {
		return type_execution;
	}

	public String getDescription() {
		return description;
	}

	public void setType_execution(String type_execution) {
		this.type_execution = type_execution;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getResultat_attendu() {
		return resultat_attendu;
	}
	public String getEtat_execution() {
		return etat_execution;
	}
	public int getOrdre() {
		return ordre;
	}
	public CasTest getCasTest() {
		return casTest;
	}
	public void setEtape_id(int etape_id) {
		this.etape_id = etape_id;
	}

	public void setResultat_attendu(String resultat_attendu) {
		this.resultat_attendu = resultat_attendu;
	}
	public void setEtat_execution(String etat_execution) {
		this.etat_execution = etat_execution;
	}
	public void setOrdre(int ordre) {
		this.ordre = ordre;
	}
	public void setCasTest(CasTest casTest) {
		this.casTest = casTest;
	}
	
	public Etape() {
		super();
	}

	public Etape(int etape_id, String resultat_attendu, String etat_execution, String type_execution,
			String description, int ordre, CasTest casTest) {
		super();
		this.etape_id = etape_id;
		this.resultat_attendu = resultat_attendu;
		this.etat_execution = etat_execution;
		this.type_execution = type_execution;
		this.description = description;
		this.ordre = ordre;
		this.casTest = casTest;
	}

	public Etape(String resultat_attendu, String etat_execution, String type_execution, String description, int ordre,
			CasTest casTest) {
		super();
		this.resultat_attendu = resultat_attendu;
		this.etat_execution = etat_execution;
		this.type_execution = type_execution;
		this.description = description;
		this.ordre = ordre;
		this.casTest = casTest;
	}
    
    
  


    
	
    
}