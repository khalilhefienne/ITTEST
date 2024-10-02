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
@Table(name = "build")
public class Build {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int build_id;

    @Column(name="titre")
    private String titre;
    
    @Column(name="isActif")
    private boolean isActif;

    @Column(name="description")
    private String description;

    @Temporal(TemporalType.DATE)
	private Date date_livraison;
    
    @ManyToOne
    @JoinColumn(name = "campagneId")
    private CampagneTest campagneTest;

	public int getBuild_id() {
		return build_id;
	}

	public String getTitre() {
		return titre;
	}

	public boolean isActif() {
		return isActif;
	}

	public String getDescription() {
		return description;
	}

	public Date getDate_livraison() {
		return date_livraison;
	}

	public CampagneTest getCampagneTest() {
		return campagneTest;
	}

	public void setBuild_id(int build_id) {
		this.build_id = build_id;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public void setActif(boolean isActif) {
		this.isActif = isActif;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setDate_livraison(Date date_livraison) {
		this.date_livraison = date_livraison;
	}

	public void setCampagneTest(CampagneTest campagneTest) {
		this.campagneTest = campagneTest;
	}

	public Build(int build_id, String titre, boolean isActif, String description, Date date_livraison,
			CampagneTest campagneTest) {
		super();
		this.build_id = build_id;
		this.titre = titre;
		this.isActif = isActif;
		this.description = description;
		this.date_livraison = date_livraison;
		this.campagneTest = campagneTest;
	}

	public Build(String titre, boolean isActif, String description, Date date_livraison, CampagneTest campagneTest) {
		super();
		this.titre = titre;
		this.isActif = isActif;
		this.description = description;
		this.date_livraison = date_livraison;
		this.campagneTest = campagneTest;
	}

	public Build() {
		super();
	}
    
    
    
    
  
    
    
    
    
    
 

}