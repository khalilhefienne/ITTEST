import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profil } from 'src/app/models/profil';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private baseURL = "http://localhost:8088/ADMINISTRATION";
constructor(private httpClient: HttpClient) { }

getProfilsList(): Observable<Profil[]>{
  return this.httpClient.get<Profil[]>(`${this.baseURL}/retrieve-all-Profils`);
}
createProfil(prof: Profil): Observable<Object>{
  return this.httpClient.post(`${this.baseURL}/add-Profil`, prof);
}


getProfilById(id: number): Observable<Profil>{
  return this.httpClient.get<Profil>(`${this.baseURL}/retrieve-Profil/${id}`);
}

updateProfil(id: number, fct: Profil): Observable<Object>{
  return this.httpClient.put(`${this.baseURL}/modify-Profil/${id}`, fct);
}

deleteProfil(id: number): Observable<Object>{
  return this.httpClient.delete(`${this.baseURL}/remove-Profil/${id}`);
}
}