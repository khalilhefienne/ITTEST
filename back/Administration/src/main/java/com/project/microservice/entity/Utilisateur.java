package com.project.microservice.entity;

import java.time.LocalDate;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity

@Table(name = "utilisateur")
public class Utilisateur {
	    
	   @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	    private String username;
	 //   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)//Cacher la ligne password
	    private String password;
	    private String email;
	    @ManyToOne
	    @JoinColumn(name = "profil_id")
	    private Profil profil;
	    private String nom;
	   
	    private String resetPasswordToken;
	    private String prenom;
	    private boolean statut;
	    @Temporal(TemporalType.DATE)
		private Date date_creation;
	    private String image;
	    private boolean is_admin;
	
	    
	 
	
		public String getImage() {
			return image;
		}
		public void setImage(String image) {
			this.image = image;
		}
		public String getNom() {
			return nom;
		}
		public String getPrenom() {
			return prenom;
		}
		public boolean isStatut() {
			return statut;
		}
		public Date getDate_creation() {
			return date_creation;
		}
		public boolean isIs_admin() {
			return is_admin;
		}
		public void setNom(String nom) {
			this.nom = nom;
		}
		public void setPrenom(String prenom) {
			this.prenom = prenom;
		}
		public void setStatut(boolean statut) {
			this.statut = statut;
		}
		public void setDate_creation(Date date_creation) {
			this.date_creation = date_creation;
		}
		public void setIs_admin(boolean is_admin) {
			this.is_admin = is_admin;
		}
		public int getId() {
			return id;
		}
		
		public String getResetPasswordToken() {
			return resetPasswordToken;
		}
		public void setResetPasswordToken(String resetPasswordToken) {
			this.resetPasswordToken = resetPasswordToken;
		}
		public String getUsername() {
			return username;
		}
		public String getPassword() {
			return password;
		}
		public Profil getProfil() {
			return profil;
		}
		public void setId(int id) {
			this.id = id;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public void setProfil(Profil profil) {
			this.profil = profil;
		}
		
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public Utilisateur() {
			super();
		}
		public Utilisateur(int id, String username, String password, String email, Profil profil, String nom,
				String prenom, boolean statut, Date date_creation, boolean is_admin) {
			super();
			this.id = id;
			this.username = username;
			this.password = password;
			this.email = email;
			this.profil = profil;
			this.nom = nom;
			this.prenom = prenom;
			this.statut = statut;
			this.date_creation = date_creation;
			this.is_admin = is_admin;
		}
		public Utilisateur(String username, String password, String email, Profil profil, String nom, String prenom,
				boolean statut, Date date_creation, boolean is_admin) {
			super();
			this.username = username;
			this.password = password;
			this.email = email;
			this.profil = profil;
			this.nom = nom;
			this.prenom = prenom;
			this.statut = statut;
			this.date_creation = date_creation;
			this.is_admin = is_admin;
		}
		public Utilisateur(String username, String password) {
			super();
			this.username = username;
			this.password = password;
		}
	
		
		public Utilisateur(int id, String username, String password, String email, Profil profil, String nom,
				String prenom, boolean statut, Date date_creation, String image, boolean is_admin) {
			super();
			this.id = id;
			this.username = username;
			this.password = password;
			this.email = email;
			this.profil = profil;
			this.nom = nom;
			this.prenom = prenom;
			this.statut = statut;
			this.date_creation = date_creation;
			this.image = image;
			this.is_admin = is_admin;
		}
		public Utilisateur(int id, String username, String password, String email, Profil profil, String nom,
				String resetPasswordToken, String prenom, boolean statut, Date date_creation, String image,
				boolean is_admin) {
			super();
			this.id = id;
			this.username = username;
			this.password = password;
			this.email = email;
			this.profil = profil;
			this.nom = nom;
			this.resetPasswordToken = resetPasswordToken;
			this.prenom = prenom;
			this.statut = statut;
			this.date_creation = date_creation;
			this.image = image;
			this.is_admin = is_admin;
		}
		public Utilisateur(String username, String password, String email, Profil profil, String nom,
				String resetPasswordToken, String prenom, boolean statut, Date date_creation, String image,
				boolean is_admin) {
			super();
			this.username = username;
			this.password = password;
			this.email = email;
			this.profil = profil;
			this.nom = nom;
			this.resetPasswordToken = resetPasswordToken;
			this.prenom = prenom;
			this.statut = statut;
			this.date_creation = date_creation;
			this.image = image;
			this.is_admin = is_admin;
		}
	
	    
}
