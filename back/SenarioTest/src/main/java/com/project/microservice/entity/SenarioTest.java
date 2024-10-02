package com.project.microservice.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import javax.persistence.JoinColumn;

@Entity
@Table(name = "senarioTest")
public class SenarioTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int senario_id;

    @Column(name="nom")
    private String nom;
    
    @Column(name="details")
    private String details;

    @Column(name="sequence_id")
    private int sequenceId;

	public int getSenario_id() {
		return senario_id;
	}

	public String getNom() {
		return nom;
	}

	public String getDetails() {
		return details;
	}

	





	public void setSenario_id(int senario_id) {
		this.senario_id = senario_id;
	}



	public void setNom(String nom) {
		this.nom = nom;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public void setSequence_id(int sequence_id) {
		this.sequenceId = sequence_id;
	}



	public SenarioTest(String nom, String details, int sequenceId) {
		super();
		this.nom = nom;
		this.details = details;
		this.sequenceId = sequenceId;
	}

	public SenarioTest(int senario_id, String nom, String details, int sequenceId) {
		super();
		this.senario_id = senario_id;
		this.nom = nom;
		this.details = details;
		this.sequenceId = sequenceId;
	}

	public int getSequenceId() {
		return sequenceId;
	}

	public void setSequenceId(int sequenceId) {
		this.sequenceId = sequenceId;
	}

	public SenarioTest() {
		super();
	}
    
  
    
    
 

}