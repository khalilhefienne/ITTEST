package com.project.microservice.entity;

import java.util.ArrayList;

import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.JoinColumn;

@Entity
@Table(name = "casTest")
public class CasTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int test_id;

    @Column(name="titre")
    private String titre;
    
    @Column(name="preconditions")
    private String preconditions;


    
    @Column(name="statut")
    private boolean statut;
   
    
    @Column(name="duree_estime")
    private String duree_estime;
    
    @Column(name="senarioId")
    private int senarioId;
    @ManyToMany(mappedBy = "casTests")
    private Set<MotsCle> mots = new HashSet<>();
    @Column(name="campagne_id")
    private int campagneId;

	public int getTest_id() {
		return test_id;
	}

	public String getTitre() {
		return titre;
	}

	public String getPreconditions() {
		return preconditions;
	}



	public boolean isStatut() {
		return statut;
	}



	public String getDuree_estime() {
		return duree_estime;
	}

	
	public int getSenarioId() {
		return senarioId;
	}

	public void setSenarioId(int senarioId) {
		this.senarioId = senarioId;
	}

	public void setTest_id(int test_id) {
		this.test_id = test_id;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public Set<MotsCle> getMots() {
		return mots;
	}

	public void setMots(Set<MotsCle> mots) {
		this.mots = mots;
	}

	public void setPreconditions(String preconditions) {
		this.preconditions = preconditions;
	}



	public void setStatut(boolean statut) {
		this.statut = statut;
	}



	public void setDuree_estime(String duree_estime) {
		this.duree_estime = duree_estime;
	}

	
	
	
	public int getCampagneId() {
		return campagneId;
	}

	public void setCampagneId(int campagneId) {
		this.campagneId = campagneId;
	}

	public CasTest() {
		super();
	}

	public CasTest(int test_id, String titre, String preconditions, boolean statut, String duree_estime, int senarioId,
			Set<MotsCle> mots, int campagneId) {
		super();
		this.test_id = test_id;
		this.titre = titre;
		this.preconditions = preconditions;
		this.statut = statut;
		this.duree_estime = duree_estime;
		this.senarioId = senarioId;
		this.mots = mots;
		this.campagneId = campagneId;
	}

	public CasTest(String titre, String preconditions, boolean statut, String duree_estime, int senarioId,
			Set<MotsCle> mots, int campagneId) {
		super();
		this.titre = titre;
		this.preconditions = preconditions;
		this.statut = statut;
		this.duree_estime = duree_estime;
		this.senarioId = senarioId;
		this.mots = mots;
		this.campagneId = campagneId;
	}

	


}