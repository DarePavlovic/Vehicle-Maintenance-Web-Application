import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Defect } from './models/Defect';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefectService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/Defect';

  addDefect(data: Defect):Observable<any> {
    return this.http.post<any>(`${this.uri}/addDefect`, data);
  }

  getDefects() {
    return this.http.get<Defect[]>(`${this.uri}/getDefects`);
  }

  getDefect(idDefect: string) {
    const data = {
      idDefect: idDefect
    }
    return this.http.post<Defect>(`${this.uri}/getDefect`, data);
  }

  updateDefect(data: Defect) {
    return this.http.post(`${this.uri}/updateDefect`, data);
  }
  
  deleteDefect(idDefect: string) {
    const data = {
      idDefect: idDefect
    }
    return this.http.post(`${this.uri}/deleteDefect`, data);
  }


}
