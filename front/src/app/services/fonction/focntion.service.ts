import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fonction } from 'src/app/models/fonction';
@Injectable({
  providedIn: 'root'
})
export class FocntionService {

  private baseURL = "http://localhost:8088/ADMINISTRATION";

  constructor(private httpClient: HttpClient) { }
  
  getFonctionsList(): Observable<Fonction[]>{
    return this.httpClient.get<Fonction[]>(`${this.baseURL}/retrieve-all-Fonctions`);
  }

  createFonction(fct: Fonction): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add-Fonction`, fct);
  }


  getFonctionById(id: number): Observable<Fonction>{
    return this.httpClient.get<Fonction>(`${this.baseURL}/retrieve-Fonction/${id}`);
  }

  updateFonction(id: number, fct: Fonction): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modify-Fonction/${id}`, fct);
  }
 
  deleteFonction(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-Fonction/${id}`);
  }

}
