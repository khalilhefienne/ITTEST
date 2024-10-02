package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.Platform;

public interface PlatformServiceI {
	
		public Platform addPlatform(Platform c);


		public void deletePlatform(int id);
		public List<Platform> retrieveAllPlatforms() ;
		public Platform retrievePlatform(int id);
		public Platform updatePlatform(Platform u,int id) ;
	
		 public Platform update(Platform employee);
}
