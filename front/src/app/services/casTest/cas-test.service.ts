import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasTest } from 'src/app/models/casTest';
import { Etape } from 'src/app/models/etape';
import { Execution } from 'src/app/models/execution';
import { MotsCle } from 'src/app/models/motsCle';

@Injectable({
  providedIn: 'root'
})
export class CasTestService {
  private baseURL = "http://localhost:8088/CASTEST";

  constructor(private httpClient: HttpClient) { }
  
  getMotsClesList(): Observable<MotsCle[]>{
    return this.httpClient.get<MotsCle[]>(`${this.baseURL}/retrieve-all-MotsCles`);
  }

  createMotsCle(fct: MotsCle): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add-MotsCle`, fct);
  }


  getMotsCleById(id: number): Observable<MotsCle>{
    return this.httpClient.get<MotsCle>(`${this.baseURL}/retrieve-MotsCle/${id}`);
  }

  updateMotsCle(id: number, fct: MotsCle): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modify-MotsCle/${id}`, fct);
  }
 
  deleteMotsCle(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-MotsCle/${id}`);
  }
  //---------------------------------------------cas test

  getCasTestsList(): Observable<CasTest[]>{
    return this.httpClient.get<CasTest[]>(`${this.baseURL}/retrieve-all-CasTests`);
  }

  createCasTest(fct: CasTest): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add-CasTest`, fct);
  }


  getCasTestById(id: number): Observable<CasTest>{
    return this.httpClient.get<CasTest>(`${this.baseURL}/retrieve-CasTest/${id}`);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}retrieve-CasTest/${id}`);
  }
  updateCasTest(id: number, fct: CasTest): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modify-CasTest/${id}`, fct);
  }
  deleteCasTest(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-CasTest/${id}`);
  }
    //---------------------------------------------etape
  getEtapesByCasTest(casTestId: number) {
    return this.httpClient.get<Etape[]>(`${this.baseURL}/etapes/${casTestId}`);
  }
 
  
  getEtapesList(): Observable<Etape[]>{
    return this.httpClient.get<Etape[]>(`${this.baseURL}/retrieve-all-Etapes`);
  }

 
  createEtape(etape: Etape, testId: number): Promise<Etape> {
    return this.httpClient.post<Etape>(`${this.baseURL}/addEtape/${testId}`, etape)
      .toPromise()
      .then(response => response as Etape); // Effectuer une vérification de type ici
  }
 
  getEtapeById(id: number): Observable<Etape>{
    return this.httpClient.get<Etape>(`${this.baseURL}/retrieve-Etape/${id}`);
  }

  updateEtape(id: number, fct: Etape): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modify-Etape/${id}`, fct);
  }
 
  deleteEtape(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-Etape/${id}`);
  }
//----------------------------------execution



ajouterExecution(test_id: number) {
  return this.httpClient.post<string>(`${this.baseURL}/addExecution/${test_id}`, {}, { responseType: 'text' as 'json' }).toPromise();
}
getExecutionsByCasTest(casTestId: number) {
  return this.httpClient.get<Execution[]>(`${this.baseURL}/executions/${casTestId}`);
}
deleteExecution(id: number): Observable<Object>{
  return this.httpClient.delete(`${this.baseURL}/remove-Execution/${id}`);
}
getExecutionById(id: number): Observable<Execution>{
  return this.httpClient.get<Execution>(`${this.baseURL}/retrieve-Execution/${id}`);
}
getExecutionCountByTestCase(test_id: number): Observable<number> {
  const url = `${this.baseURL}/countByTestCase?test_id=${test_id}`;
  return this.httpClient.get<number>(url);
}

getEtapeCountByTestCase(test_id: number): Observable<number> {
  const url = `${this.baseURL}/countEtapeByTestCase?test_id=${test_id}`;
  return this.httpClient.get<number>(url);
}
getCaseCountByCampagne(campagneId: number): Observable<number> {
  const url = `${this.baseURL}/countCasesByCampagne?campagneId=${campagneId}`;
  return this.httpClient.get<number>(url);
}
getCaseCountBySenario(senarioId: number): Observable<number> {
  const url = `${this.baseURL}/countCasesBySenario?senarioId=${senarioId}`;
  return this.httpClient.get<number>(url);
}
getCasTestsBySenarioId(senarioId: number): Observable<CasTest[]> {
  const url = `${this.baseURL}/CasTests/${senarioId}`;
  return this.httpClient.get<CasTest[]>(url);
}

addCasTest(casTest: CasTest, senarioId: number): Observable<CasTest>{
  const url = `${this.baseURL}/createCasTest/${senarioId}`;
  return this.httpClient.post<CasTest>(url, casTest);
}


}
