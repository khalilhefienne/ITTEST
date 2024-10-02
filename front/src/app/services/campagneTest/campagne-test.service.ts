import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Build } from 'src/app/models/build';
import { CampagneTest } from 'src/app/models/campagneTest';
import { Platform } from 'src/app/models/platform';

@Injectable({
  providedIn: 'root'
})
export class CampagneTestService {

  private baseURL = "http://localhost:8088/CAMPAGNETEST";

  constructor(private httpClient: HttpClient) { }
  
  //campgane test
  getCampagneTestsList(): Observable<CampagneTest[]>{
    return this.httpClient.get<CampagneTest[]>(`${this.baseURL}/retrieve-all-CampagneTests`);
  }

  createCampagneTest(fct: CampagneTest): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add-CampagneTest`, fct);
  }


  getCampagneTestById(id: number): Observable<CampagneTest>{
    return this.httpClient.get<CampagneTest>(`${this.baseURL}/retrieve-CampagneTest/${id}`);
  }

  updateCampagneTest(id: number, fct: CampagneTest): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modify-CampagneTest/${id}`, fct);
  }
 
  deleteCampagneTest(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-CampagneTest/${id}`);
  }
  getPlatformsList(): Observable<Platform[]>{
    return this.httpClient.get<Platform[]>(`${this.baseURL}/retrieve-all-Platforms`);
  }
//platform
  createPlatform(fct: Platform): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add-Platform`, fct);
  }


  getPlatformById(id: number): Observable<Platform>{
    return this.httpClient.get<Platform>(`${this.baseURL}/retrieve-Platform/${id}`);
  }

  updatePlatform(id: number, fct: Platform): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modify-Platform/${id}`, fct);
  }
 
  deletePlatform(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-Platform/${id}`);
  }

  //build
  //Build
  createBuild(fct: Build): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add-Build`, fct);
  }


  getBuildById(id: number): Observable<Build>{
    return this.httpClient.get<Build>(`${this.baseURL}/retrieve-Build/${id}`);
  }

  updateBuild(id: number, fct: Build): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modify-Build/${id}`, fct);
  }
 
  deleteBuild(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-Build/${id}`);
  }
  getBuildsList(): Observable<Build[]>{
    return this.httpClient.get<Build[]>(`${this.baseURL}/retrieve-all-Builds`);
  }

}