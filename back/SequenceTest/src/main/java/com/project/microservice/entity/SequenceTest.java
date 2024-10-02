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
@Table(name = "sequenceTest")
public class SequenceTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sequence_id;

    @Column(name="titre")
    private String titre;
    
    @Column(name="type")
    private String type;

    @Column(name="perimetre")
    private String perimetre;
    
    @Column(name="version")
    private int version;
    
    @Temporal(TemporalType.DATE)
  		private Date date_creation;
    
    @Column(name="projet_id")
    private int projetId;

	public int getSequence_id() {
		return sequence_id;
	}

	public String getTitre() {
		return titre;
	}

	public String getType() {
		return type;
	}

	public String getPerimetre() {
		return perimetre;
	}

	public int getVersion() {
		return version;
	}

	public Date getDate_creation() {
		return date_creation;
	}

	

	public void setSequence_id(int sequence_id) {
		this.sequence_id = sequence_id;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setPerimetre(String perimetre) {
		this.perimetre = perimetre;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public void setDate_creation(Date date_creation) {
		this.date_creation = date_creation;
	}



	public int getProjetId() {
		return projetId;
	}

	public void setProjetId(int projetId) {
		this.projetId = projetId;
	}

	public SequenceTest(int sequence_id, String titre, String type, String perimetre, int version, Date date_creation,
			int projet_id) {
		super();
		this.sequence_id = sequence_id;
		this.titre = titre;
		this.type = type;
		this.perimetre = perimetre;
		this.version = version;
		this.date_creation = date_creation;
		this.projetId = projet_id;
	}

	public SequenceTest(String titre, String type, String perimetre, int version, Date date_creation, int projet_id) {
		super();
		this.titre = titre;
		this.type = type;
		this.perimetre = perimetre;
		this.version = version;
		this.date_creation = date_creation;
		this.projetId = projet_id;
	}

	public SequenceTest() {
		super();
	}
  
    
    
    
    
    
    
    
 

}