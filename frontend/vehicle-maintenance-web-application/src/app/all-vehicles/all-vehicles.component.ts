import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../models/Vehicle';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrls: ['./all-vehicles.component.css']
})
export class AllVehiclesComponent implements OnInit {

  constructor(private vehicleService: VehicleService, private userService: UserService, private router:Router) { }

  driver: Map<string, string> = new Map<string, string>();

  ngOnInit(): void {
    this.driver.set(null as any as string, 'No driver');
    this.vehicleService.getVehicles().subscribe(
      (_vehicles) => {
        this.vehicleList = _vehicles;
        this.vehicleList.forEach((vehicle: Vehicle) => {
          let idDriver = vehicle.idUser;
          
          if (idDriver) {
            this.userService.getUser(idDriver).subscribe((user) => {
              let name = user.firstname + ' ' + user.lastname;
              this.driver.set(idDriver, name);
            });
          }
          
        });
      }
    );

  }
  vehicleList: Vehicle[] = [];
  

  linkToVehicle(vehicle: any) {
    localStorage.setItem('vehicle', JSON.stringify(vehicle.id));
    this.router.navigate(['/admin/carDetail']);
  }

  sellVehicle(vehicle: Vehicle) {
    this.vehicleService.deleteVehicle(vehicle._id).subscribe(
      (response) => {
        this.vehicleList = this.vehicleList.filter((v) => v._id !== vehicle._id);
      }
    );
  }
  removeDriver(vehicle:Vehicle){
    this.vehicleService.removeDriver(vehicle.idUser).subscribe(
      (response) => {
        if(response.message=='ok'){
          alert("Driver removed");
        }
      }
    );

  }

}
