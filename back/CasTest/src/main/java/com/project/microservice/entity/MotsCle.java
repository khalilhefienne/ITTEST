package com.project.microservice.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "motsCle")


public class MotsCle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mot_id;

  
    private String mot;
  
    private String description;
    
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "annotation",
        joinColumns = @JoinColumn(name = "mot_id"),
        inverseJoinColumns = @JoinColumn(name = "test_id"))
    private Set<CasTest> casTests = new HashSet<>();

	public int getMot_id() {
		return mot_id;
	}

	public String getMot() {
		return mot;
	}

	public String getDescription() {
		return description;
	}

	public Set<CasTest> getCasTests() {
		return casTests;
	}

	public void setMot_id(int mot_id) {
		this.mot_id = mot_id;
	}

	public void setMot(String mot) {
		this.mot = mot;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setCasTests(Set<CasTest> casTests) {
		this.casTests = casTests;
	}

	public MotsCle(int mot_id, String mot, String description, Set<CasTest> casTests) {
		super();
		this.mot_id = mot_id;
		this.mot = mot;
		this.description = description;
		this.casTests = casTests;
	}

	public MotsCle(String mot, String description, Set<CasTest> casTests) {
		super();
		this.mot = mot;
		this.description = description;
		this.casTests = casTests;
	}

	public MotsCle() {
		super();
	}
    
    
    
    
}