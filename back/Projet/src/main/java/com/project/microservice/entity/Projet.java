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
@Table(name = "projet")
public class Projet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projet_id;

    @Column(name="nom")
    private String nom;
    
    @Column(name="prefixe")
    private String prefixe;

    @Column(name="description")
    private String description;
    
    @Column(name="statut")
    private String statut;
    
    @Column(name="isGestionnaireAnomalie")
    private boolean isGestionnaireAnomalie;
    
    @Column(name="nomGestionnaire")
    private String nomGestionnaire;
	
  
    @JoinColumn(name = "creator_id")
    private int creatorId;
    
  

	public int getProjet_id() {
		return projet_id;
	}

	public String getNom() {
		return nom;
	}

	public String getPrefixe() {
		return prefixe;
	}

	public String getDescription() {
		return description;
	}

	public String getStatut() {
		return statut;
	}


	public String getNomGestionnaire() {
		return nomGestionnaire;
	}

	


	public void setProjet_id(int projet_id) {
		this.projet_id = projet_id;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public void setPrefixe(String prefixe) {
		this.prefixe = prefixe;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	

	public boolean isGestionnaireAnomalie() {
		return isGestionnaireAnomalie;
	}

	public void setGestionnaireAnomalie(boolean isGestionnaireAnomalie) {
		this.isGestionnaireAnomalie = isGestionnaireAnomalie;
	}

	public void setNomGestionnaire(String nomGestionnaire) {
		this.nomGestionnaire = nomGestionnaire;
	}

	

	


	public int getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(int creator_id) {
		this.creatorId = creator_id;
	}

	public Projet() {
		super();
	}

	public Projet(int projet_id, String nom, String prefixe, String description, String statut,
			boolean isGestionnaireAnomalie, String nomGestionnaire, int creator_id) {
		super();
		this.projet_id = projet_id;
		this.nom = nom;
		this.prefixe = prefixe;
		this.description = description;
		this.statut = statut;
		this.isGestionnaireAnomalie = isGestionnaireAnomalie;
		this.nomGestionnaire = nomGestionnaire;
		this.creatorId = creator_id;
	}

	public Projet(String nom, String prefixe, String description, String statut, boolean isGestionnaireAnomalie,
			String nomGestionnaire, int creator_id) {
		super();
		this.nom = nom;
		this.prefixe = prefixe;
		this.description = description;
		this.statut = statut;
		this.isGestionnaireAnomalie = isGestionnaireAnomalie;
		this.nomGestionnaire = nomGestionnaire;
		this.creatorId = creator_id;
	}
    
    
 

}