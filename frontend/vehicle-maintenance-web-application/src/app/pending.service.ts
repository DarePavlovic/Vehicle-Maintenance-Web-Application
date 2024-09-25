import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PendingPayment } from './models/PendingPayment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  constructor(private http: HttpClient) { }


  uri = 'http://localhost:4000/PendingPayments';

  getPendingPayments(): Observable<PendingPayment[]> {
    return this.http.get<PendingPayment[]>(`${this.uri}/getPendingPayments`);
  }
  
  addPendingPayment(pendingPayment: PendingPayment): Observable<any> {
    return this.http.post<any>(`${this.uri}/addPendingPayment`, pendingPayment);
  }

  deletePendingPayment(idPayment:string):Observable<any>{
    return this.http.post<any>(`${this.uri}/deletePendingPayment`,{ idPayment});
  }


  
}
