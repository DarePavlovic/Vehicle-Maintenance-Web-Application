import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/Payment';
import { Vehicle } from '../models/Vehicle';
import { PaymentsService } from '../payments.service';
import { VehicleService } from '../vehicle.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { PendingPayment } from '../models/PendingPayment';
import { PendingService } from '../pending.service';

@Component({
  selector: 'app-report-expenses',
  templateUrl: './report-expenses.component.html',
  styleUrls: ['./report-expenses.component.css']
})
export class ReportExpensesComponent implements OnInit {

  constructor(private paymentService: PaymentsService, private vehicleService: VehicleService, private userService: UserService, private router:Router, private pendingService: PendingService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('ulogovan');
    if(id != null){
      this.userId = JSON.parse(id);
      this.userService.getVehicle(this.userId).subscribe((idVehicle:string)=>{
        this.vehicleId = idVehicle;
      });
    }
  }

  reportExpenses(){

    let pendingPayment:PendingPayment = {
      _id: "",
      idUser: this.userId,
      idVehicle: this.vehicleId,
      date: new Date(),
      price: this.inputPrice,
      description: this.inputDescription,
      type: this.selectedExpenseType
    }

    this.pendingService.addPendingPayment(pendingPayment).subscribe((res) => {
      if(res['message'] == "ok"){
        this.message = "Zahtev za izvrsenje placanja je podnet";
        this.router.navigate(['driver/home']);
      }
      else{
        this.message = "Doslo je do greske";
        return;
      }
      alert(this.message);
    })
  }
  selectedExpenseType: string = "kazna";
  inputPrice: number = 0;
  inputDescription: string = "";
  message: string = "";

  userId:string = "";
  vehicleId:string = "";
  description:string = "";
  price:number = 0;



}
