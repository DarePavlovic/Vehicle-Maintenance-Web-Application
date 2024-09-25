import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { PendingService } from '../pending.service';
import { PendingPayment } from '../models/PendingPayment';
import { Vehicle } from '../models/Vehicle';
import { User } from '../models/User';
import { PaymentsService } from '../payments.service';
import { Payment } from '../models/Payment';

@Component({
  selector: 'app-handle-expense',
  templateUrl: './handle-expense.component.html',
  styleUrls: ['./handle-expense.component.css']
})
export class HandleExpenseComponent implements OnInit {

  constructor(private pendingPaymentService: PendingService, private vehicleService: VehicleService, private userService: UserService,private paymentService:PaymentsService, private router:Router) { }

  users:Map<string,string> = new Map<string,string>();
  vehicles:Map<string,string> = new Map<string,string>();
  ngOnInit(): void {
    this.pendingPaymentService.getPendingPayments().subscribe(
      (_payments) => {
        this.pendingPaymentsList = _payments;
        this.pendingPaymentsList.forEach((payment: PendingPayment) => {
          //nisu dobri idUser i idPayments
          let id = payment._id;
          let idUser = payment.idUser;
          let idVehicle = payment.idVehicle;
          const datePayment = payment.date;
          let price = payment.price;
          let description = payment.description;
          let type = payment.type;
          
          this.userService.getUser(idUser).subscribe((user:User) => {
            let fetched_user = user.firstname + ' ' + user.lastname;
            this.users.set(fetched_user,idUser);
            this.vehicleService.getVehicle(idVehicle).subscribe((vehicle: Vehicle) => {
              let vehicleName = vehicle.model;
              this.vehicles.set(vehicleName,idVehicle);
              this.payments.push({_id: id, idUser: fetched_user, idVehicle: vehicleName, date: datePayment, price: price, description: description, type: type});
            });
          });
          
        });
      }
    );
  }
  
  acceptExpense(pending:PendingPayment){
    const us = this.users.get(pending.idUser)||'';
    const vh = this.vehicles.get(pending.idVehicle)||'';
    //obrisi iz PendingPayments
    //dodaj u Payments 
    alert(us);
    alert(vh);
    alert('usao brt');
    let p:Payment={
      _id:pending._id,
      idUser:us,
      idVehicle:vh,
      date:pending.date,
      price:pending.price,
      description:pending.description,
      type:pending.type
    };
    this.paymentService.addPayment(p).subscribe((paymnet:any)=>{
      console.log(paymnet);
      if(paymnet.message=='ok'){
        this.pendingPaymentService.deletePendingPayment(pending._id).subscribe((resp:any)=>{
          if(resp.message=='ok'){
            alert('dodato u payments!');
            this.ngOnInit();
          }
          else{
            alert(resp.message);
          }
        })
      }
    });
  }

  refuseExpense(pending:PendingPayment){
    //obrisi iz baze PandingPayments
    this.pendingPaymentService.deletePendingPayment(pending._id).subscribe((resp)=>{
      if(resp.message=='ok'){
        alert('Trosak odbijen');
        this.ngOnInit();
      }
    })
  }


  pendingPaymentsList: PendingPayment[] = [];
  payments: PendingPayment[] = [];
}
