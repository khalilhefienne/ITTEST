package com.project.microservice.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "fonction")
public class Fonction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fonction_id;

    @Column(name="titre")
    private String titre;

    @Column(name="description")
    private String description;

	public int getFonction_id() {
		return fonction_id;
	}

	public void setFonction_id(int fonction_id) {
		this.fonction_id = fonction_id;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Fonction(int fonction_id, String titre, String description) {
		super();
		this.fonction_id = fonction_id;
		this.titre = titre;
		this.description = description;
	}

	public Fonction(String titre, String description) {
		super();
		this.titre = titre;
		this.description = description;
	}

	public Fonction() {
		super();
	}

   

 

}