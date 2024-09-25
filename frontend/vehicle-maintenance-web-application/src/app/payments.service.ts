import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from './models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }


  uri = 'http://localhost:4000/Payments';

  getPayments() {
    return this.http.get<Payment[]>(`${this.uri}/getPayments`);
  }

}
