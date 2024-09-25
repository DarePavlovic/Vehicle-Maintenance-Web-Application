import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/Payment';
import { PaymentsService } from '../payments.service';
import { VehicleService } from '../vehicle.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {

  constructor(private paymentService: PaymentsService, private vehicleService: VehicleService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let id = localStorage.getItem('ulogovan');
    if (id) {
      this.userId = JSON.parse(id);
    }
    
    this.paymentService.getPayments().subscribe(
      (_payments) => {
        this.paymentsList = _payments;
        this.paymentsList.forEach((payment: Payment) => {
          if (payment.idUser === this.userId) {
            let id = payment._id;
            const datePayment = payment.date;
            let price = payment.price;
            let description = payment.description;
            let type = payment.type;

            this.payments.push({ _id: id, idUser: "", idVehicle: "", date: datePayment, price: price, description: description, type: type });
            
          }
        });
        this.filteredPayments = [...this.payments]
        this.filterPayments('plata');
      }
    );
  }
  filterPayments(type: string) {
    if (type === 'sve') {
      this.filteredPayments = this.payments;
    } else {
      this.filteredPayments = this.payments.filter(payment => payment.type === type);
    }
  }
  userId: string = "";
  paymentsList: Payment[] = [];
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
}
