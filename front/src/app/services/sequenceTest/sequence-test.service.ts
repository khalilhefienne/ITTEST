import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SequenceTest } from 'src/app/models/sequenceTest';

@Injectable({
  providedIn: 'root'
})
export class SequenceTestService {


  private baseURL = "http://localhost:8088/SEQUENCETEST";
  constructor(private httpClient: HttpClient) { }
  
  getSequenceTestList(): Observable<SequenceTest[]>{
    return this.httpClient.get<SequenceTest[]>(`${this.baseURL}/retrieve-all-SequenceTests`);
  }

  createSequenceTest(fct: SequenceTest): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add-SequenceTest`, fct);
  }
  
  getSequenceTestById(id: number): Observable<SequenceTest>{
    return this.httpClient.get<SequenceTest>(`${this.baseURL}/retrieve-SequenceTest/${id}`);
  }
  getSequenceTestsByProjetId(projetId: number): Observable<SequenceTest[]> {
    const url = `${this.baseURL}/sequences/${projetId}`;
    return this.httpClient.get<SequenceTest[]>(url);
  }

  addSequenceTest(sequenceTest: SequenceTest, projetId: number): Observable<SequenceTest> {
    const url = `${this.baseURL}/createSequence/${projetId}`;
    return this.httpClient.post<SequenceTest>(url, sequenceTest);
  }

  updateSequenceTest(id: number, fct: SequenceTest): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modify-SequenceTest/${id}`, fct);
  }
 
  deleteSequenceTest(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-SequenceTest/${id}`);
  }
  exportPdf(): Observable<any> {
    const url = `${this.baseURL}/exportpdf`;
    return this.httpClient.get(url, {
      responseType: 'arraybuffer',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getSequenceCountByProjet(projetId: number): Observable<number> {
    const url = `${this.baseURL}/countSequenceByProjet?projetId=${projetId}`;
    return this.httpClient.get<number>(url);
  }
}
