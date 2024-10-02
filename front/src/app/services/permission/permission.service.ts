import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/models/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private baseURL = "http://localhost:8088/ADMINISTRATION";

  constructor(private httpClient: HttpClient) { }
  
  getPermissionsList(): Observable<Permission[]>{
    return this.httpClient.get<Permission[]>(`${this.baseURL}/retrieve-all-Permissions`);
  }

  createPermission(fct: Permission): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add-Permission`, fct);
  }
  

  getPermissionById(id: number): Observable<Permission>{
    return this.httpClient.get<Permission>(`${this.baseURL}/retrieve-Permission/${id}`);
  }

  updatePermission(id: number, fct: Permission): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modify-Permission/${id}`, fct);
  }
 
  deletePermission(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-Permission/${id}`);
  }
}
