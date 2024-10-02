package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.MotsCle;

public interface MotsCleServiceI {
	
		public MotsCle addMotsCle(MotsCle c);


		public void deleteMotsCle(int id);
		public List<MotsCle> retrieveAllMotsCles() ;
		public MotsCle retrieveMotsCle(int id);
		public MotsCle updateMotsCle(MotsCle u,int id) ;
	
		 public MotsCle update(MotsCle employee);
}
