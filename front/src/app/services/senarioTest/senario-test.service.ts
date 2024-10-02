import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SenarioTest } from 'src/app/models/senarioTest';

@Injectable({
  providedIn: 'root'
})
export class SenarioTestService {


  private baseURL = "http://localhost:8088/SENARIOTEST";
  constructor(private httpClient: HttpClient) { }
  
  getSenarioTestList(): Observable<SenarioTest[]>{
    return this.httpClient.get<SenarioTest[]>(`${this.baseURL}/retrieve-all-SenarioTests`);
  }

  createSenarioTest(fct: SenarioTest): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add-SenarioTest`, fct);
  }
  
  getSenarioTestById(id: number): Observable<SenarioTest>{
    return this.httpClient.get<SenarioTest>(`${this.baseURL}/retrieve-SenarioTest/${id}`);
  }

  updateSenarioTest(id: number, fct: SenarioTest): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modify-SenarioTest/${id}`, fct);
  }
 
  deleteSenarioTest(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-SenarioTest/${id}`);
  }
  getSenarioTestsBySequenceId(sequenceId: number): Observable<SenarioTest[]> {
    const url = `${this.baseURL}/senarios/${sequenceId}`;
    return this.httpClient.get<SenarioTest[]>(url);
  }

  addSenarioTest(senarioTest: SenarioTest, sequenceId: number): Observable<SenarioTest> {
    const url = `${this.baseURL}/createSenario/${sequenceId}`;
    return this.httpClient.post<SenarioTest>(url, senarioTest);
  }

  getSenarioCountBySeuence(sequenceId: number): Observable<number> {
    const url = `${this.baseURL}/countSenarioCountBySequence?sequenceId=${sequenceId}`;
    return this.httpClient.get<number>(url);
  }
}
