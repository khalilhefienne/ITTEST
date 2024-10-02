package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.Build;

public interface BuildServiceI {
	
		public Build addBuild(Build c);


		public void deleteBuild(int id);
		public List<Build> retrieveAllBuilds() ;
		public Build retrieveBuild(int id);
		public Build updateBuild(Build u,int id) ;
	
		 public Build update(Build employee);
}
