import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from 'src/app/models/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private baseURL = "http://localhost:8088/PROJET";

  constructor(private httpClient: HttpClient) { }
  
  getProjetList(): Observable<Projet[]>{
    return this.httpClient.get<Projet[]>(`${this.baseURL}/retrieve-all-Projets`);
  }

  createProjet(fct: Projet): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add-Projet`, fct);
  }
  
  getProjetById(id: number): Observable<Projet>{
    return this.httpClient.get<Projet>(`${this.baseURL}/retrieve-Projet/${id}`);
  }

  updateProjet(id: number, fct: Projet): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modify-Projet/${id}`, fct);
  }
 
  deleteProjet(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-Projet/${id}`);
  }
  
 
  getProjetsByCreator(creatorId: number): Observable<Projet[]> {
    const url = `${this.baseURL}/projets`;
    const params = new HttpParams().set('creatorId', String(creatorId)); // Utilisez String() au lieu de toString()

    return this.httpClient.get<Projet[]>(url, { params: params });
  }

}
