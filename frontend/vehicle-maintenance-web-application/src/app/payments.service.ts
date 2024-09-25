import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from './models/Payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }


  uri = 'http://localhost:4000/Payments';

  getPayments() {
    return this.http.get<Payment[]>(`${this.uri}/getPayments`);
  }

  addPayment(data: Payment):Observable<Payment> {
    return this.http.post<Payment>(`${this.uri}/addPayment`, data);
  }

}
