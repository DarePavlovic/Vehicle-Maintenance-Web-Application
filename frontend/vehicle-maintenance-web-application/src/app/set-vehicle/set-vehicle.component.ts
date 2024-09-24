import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { UserService } from '../user.service';
import { Vehicle } from '../models/Vehicle';
import { User } from '../models/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-set-vehicle',
  templateUrl: './set-vehicle.component.html',
  styleUrls: ['./set-vehicle.component.css']
})
export class SetVehicleComponent implements OnInit {

  constructor(private vehicleService:VehicleService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
     this.vehicleService.getVehicles().subscribe((data)=>{
      this.vehicles = data.filter(vehicle => {
        if (vehicle.idUser=="") {
          //console.log(`Vehicle ${vehicle.model} is already assigned to `);
          return false; // Exclude vehicles that already have an owner
        }
        return true; // Include vehicles that do not have an owner
      });
       //this.vehicles = data;
     });

     this.userService.getAllUsers().subscribe((data)=>{
      this.users = data.filter(user => {
        if(user.idVehicle ==""){
          return false;
        }
        return true;
      }
      );
     });

  }

  users:User[] = [];
  vehicles:Vehicle[] = [];

  selectedUser:string = '';
  selectedVehicle: string = '';
  assignVehicle() {
    if (this.selectedUser && this.selectedVehicle) {
      alert(`Vozilo "${this.selectedVehicle}" dodeljeno korisniku ${this.selectedUser}.`);
      this.vehicleService.setOwner(this.selectedVehicle, this.selectedUser).subscribe((data)=>{
        console.log(data);
        this.userService.setVehicle(this.selectedVehicle, this.selectedUser).subscribe((data2)=>{
          console.log(data2);
          this.router.navigate(['/admin/setOwner']);
        });
       });
   
    } else {
      alert('Molimo izaberite i korisnika i vozilo.');
    }

  }
}
