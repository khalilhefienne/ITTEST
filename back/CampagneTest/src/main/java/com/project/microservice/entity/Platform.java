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
@Table(name = "platform")
public class Platform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int platform_id;

    @Column(name="platform")
    private String platform;
    
    @Column(name="EnDesign")
    private boolean EnDesign;

    @Column(name="EnExecution")
    private boolean EnExecution;
    
  


	public int getPlatform_id() {
		return platform_id;
	}

	public String getPlatform() {
		return platform;
	}

	public boolean isEnDesign() {
		return EnDesign;
	}

	public boolean isEnExecution() {
		return EnExecution;
	}

	public void setPlatform_id(int platform_id) {
		this.platform_id = platform_id;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public void setEnDesign(boolean enDesign) {
		EnDesign = enDesign;
	}

	public void setEnExecution(boolean enExecution) {
		EnExecution = enExecution;
	}



	

	public Platform(String platform, boolean enDesign, boolean enExecution) {
		super();
		this.platform = platform;
		EnDesign = enDesign;
		EnExecution = enExecution;
	}

	public Platform(int platform_id, String platform, boolean enDesign, boolean enExecution) {
		super();
		this.platform_id = platform_id;
		this.platform = platform;
		EnDesign = enDesign;
		EnExecution = enExecution;
	}

	public Platform() {
		super();
	}



	



}