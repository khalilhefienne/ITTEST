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
@Table(name = "campagneTest")
public class CampagneTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int campagneId;

    @Column(name="nom")
    private String nom;
    
    @Column(name="isActif")
    private boolean isActif;

    @Column(name="isPublic")
    private boolean isPublic;
    
    @ManyToOne
    @JoinColumn(name = "platformId")
    private Platform platforme;
    
    @JoinColumn(name = "creator_id")
    private int creatorId;

	

	public CampagneTest(int campagneId, String nom, boolean isActif, boolean isPublic, Platform platforme,
			int creatorId) {
		super();
		this.campagneId = campagneId;
		this.nom = nom;
		this.isActif = isActif;
		this.isPublic = isPublic;
		this.platforme = platforme;
		this.creatorId = creatorId;
	}

	public CampagneTest(String nom, boolean isActif, boolean isPublic, Platform platforme, int creatorId) {
		super();
		this.nom = nom;
		this.isActif = isActif;
		this.isPublic = isPublic;
		this.platforme = platforme;
		this.creatorId = creatorId;
	}

	public int getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(int creatorId) {
		this.creatorId = creatorId;
	}

	public String getNom() {
		return nom;
	}

	public boolean isActif() {
		return isActif;
	}

	public boolean isPublic() {
		return isPublic;
	}

	

	public void setNom(String nom) {
		this.nom = nom;
	}

	public void setActif(boolean isActif) {
		this.isActif = isActif;
	}

	public void setPublic(boolean isPublic) {
		this.isPublic = isPublic;
	}




	public CampagneTest(String nom, boolean isActif, boolean isPublic, Platform platforme) {
		super();
		this.nom = nom;
		this.isActif = isActif;
		this.isPublic = isPublic;
		this.platforme = platforme;
	}

	public CampagneTest(int campagneId, String nom, boolean isActif, boolean isPublic, Platform platforme) {
		super();
		this.campagneId = campagneId;
		this.nom = nom;
		this.isActif = isActif;
		this.isPublic = isPublic;
		this.platforme = platforme;
	}

	public CampagneTest(String nom, boolean isActif, boolean isPublic) {
		super();
		this.nom = nom;
		this.isActif = isActif;
		this.isPublic = isPublic;
	}

	public CampagneTest(int campagneId, String nom, boolean isActif, boolean isPublic) {
		super();
		this.campagneId = campagneId;
		this.nom = nom;
		this.isActif = isActif;
		this.isPublic = isPublic;
	}

	public int getCampagneId() {
		return campagneId;
	}

	public void setCampagneId(int campagneId) {
		this.campagneId = campagneId;
	}

	public CampagneTest() {
		super();
	}

	public Platform getPlatforme() {
		return platforme;
	}

	public void setPlatforme(Platform platforme) {
		this.platforme = platforme;
	}

	
 

}