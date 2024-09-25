import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/Payment';
import { PaymentsService } from '../payments.service';
import { VehicleService } from '../vehicle.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Vehicle } from '../models/Vehicle';

@Component({
  selector: 'app-earnings-mechanic',
  templateUrl: './earnings-mechanic.component.html',
  styleUrls: ['./earnings-mechanic.component.css']
})
export class EarningsMechanicComponent implements OnInit {

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
          console.log("Payment idUser:"+payment.idUser);
          console.log("User id: "+this.userId);
          if (payment.idUser === this.userId) {
            
            let id = payment._id;
            let idVehicle = payment.idVehicle;
            const datePayment = payment.date;
            let price = payment.price;
            let description = payment.description;
            let type = payment.type;

            this.vehicleService.getVehicle(idVehicle).subscribe((vehicle: Vehicle) => {
              let vehicleName = vehicle.model;
              console.log("Payment vehicle:"+vehicleName);
              this.payments.push({ _id: id, idUser: "", idVehicle: vehicleName, date: datePayment, price: price, description: description, type: type });
            });
          }
        });
        console.log(this.payments);
        this.filteredPayments = this.payments;
        console.log(this.filteredPayments);
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
