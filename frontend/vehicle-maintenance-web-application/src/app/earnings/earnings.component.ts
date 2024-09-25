import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/Payment';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  filterPayments(type: string) {
    if (type === 'sve') {
      this.filteredPayments = this.payments;
    } else {
      this.filteredPayments = this.payments.filter(payment => payment.type === type);
    }
  }

  paymentsList: Payment[] = [];
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
}
