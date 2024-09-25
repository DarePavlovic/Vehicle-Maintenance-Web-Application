import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { UserService } from '../user.service';
import { VehicleService } from '../vehicle.service';
import { Router } from '@angular/router';
import { Payment } from '../models/Payment';
import { Vehicle } from '../models/Vehicle';

@Component({
  selector: 'app-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.css']
})
export class PaymentsHistoryComponent implements OnInit {

  constructor(private paymentService: PaymentsService, private vehicleService: VehicleService, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.paymentService.getPayments().subscribe(
      (_payments) => {
        this.paymentsList = _payments;
        this.paymentsList.forEach((payment: Payment) => {
          let id = payment._id;
          let idUser = payment.idUser;
          let idVehicle = payment.idVehicle;
          const datePayment = payment.date;
          let price = payment.price;
          let description = payment.description;
          let type = payment.type;
          
          this.userService.getUser(idUser).subscribe((user) => {
            let fetched_user = user.firstname + ' ' + user.lastname;
            this.vehicleService.getVehicle(idVehicle).subscribe((vehicle: Vehicle) => {
              let vehicleName = vehicle.model;
              this.payments.push({_id: id, idUser: fetched_user, idVehicle: vehicleName, date: datePayment, price: price, description: description, type: type});
            });
          });
          
        });
      }
    );

  }

  paymentsList: Payment[] = [];
  payments: Payment[] = [];
}
