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
@Table(name = "permission")


public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int permission_id;

    @Enumerated(EnumType.STRING)
    private Type type;
  
 
    @ManyToOne
    @JoinColumn(name = "fonction_id")
    private Fonction fonction;
    @ManyToOne
    @JoinColumn(name = "profil_id")
    private Profil profil;
    


	public Profil getProfil() {
		return profil;
	}


	public void setProfil(Profil profil) {
		this.profil = profil;
	}


	public int getPermission_id() {
		return permission_id;
	}


	public void setPermission_id(int permission_id) {
		this.permission_id = permission_id;
	}


	public Type getType() {
		return type;
	}


	public void setType(Type type) {
		this.type = type;
	}


	public Fonction getFonction() {
		return fonction;
	}


	public void setFonction(Fonction fonction) {
		this.fonction = fonction;
	}


	


	public Permission(Type type, Fonction fonction, Profil profil) {
		super();
		this.type = type;
		this.fonction = fonction;
		this.profil = profil;
	}


	public Permission(int permission_id, Type type, Fonction fonction, Profil profil) {
		super();
		this.permission_id = permission_id;
		this.type = type;
		this.fonction = fonction;
		this.profil = profil;
	}


	public Permission() {
		super();
	}

    
	
    
}