package com.project.microservice.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "profil")
public class Profil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int profil_id;

    @Column(name="nom")
    private String nom;

    @Column(name="description")
    private String description;
    
   
	
    public Profil() {
		super();
		// TODO Auto-generated constructor stub
	}

	





	public Profil(String nom, String description) {
		super();
		this.nom = nom;
		this.description = description;
	}







	public Profil(int profil_id, String nom, String description) {
		super();
		this.profil_id = profil_id;
		this.nom = nom;
		this.description = description;
	}







	public int getProfil_id() {
		return profil_id;
	}

	public void setProfil_id(int profil_id) {
		this.profil_id = profil_id;
	}

	



	

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

 

}