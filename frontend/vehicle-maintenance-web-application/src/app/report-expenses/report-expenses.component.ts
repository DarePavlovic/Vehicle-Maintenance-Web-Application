import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/Payment';
import { Vehicle } from '../models/Vehicle';
import { PaymentsService } from '../payments.service';
import { VehicleService } from '../vehicle.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-report-expenses',
  templateUrl: './report-expenses.component.html',
  styleUrls: ['./report-expenses.component.css']
})
export class ReportExpensesComponent implements OnInit {

  constructor(private paymentService: PaymentsService, private vehicleService: VehicleService, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    let id = localStorage.getItem('ulogovan');
    if(id != null){
      this.userId = JSON.parse(id);
      this.userService.getVehicle(this.userId).subscribe((idVehicle:string)=>{
        this.vehicleId = idVehicle;
      });
    }
  }
   userId:string = "";
   vehicleId:string = "";
   description:string = "";
   price:number = 0;
   
}
