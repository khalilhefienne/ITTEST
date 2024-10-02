package com.project.microservice.service;

import java.util.List;

import com.project.microservice.entity.Permission;

public interface PermissionServiceI {
	
	 public Permission savePermission(Permission permission);	
	  public void deletePermission(int id);

	public List<Permission> retrieveAllPermissions() ;


	public Permission retrievePermission(int id) ;


	public Permission modifierPermissionById(int permissionId, Permission nouvellePermission);	 
	
}