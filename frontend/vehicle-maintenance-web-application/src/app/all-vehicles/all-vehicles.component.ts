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

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe(
      (_vehicles) => {
        this.vehicleList = _vehicles;
        this.vehicleList.forEach((vehicle: Vehicle) => {
          let id = vehicle._id;
          let status = vehicle.status;
          let model = vehicle.model;
          let picture = vehicle.picture;
          let expenses = vehicle.priceMainainanceGeneral;
          let fuelConsumption = vehicle.consumptionGeneral;
          let price = vehicle.vehicleValue;
          let driver = vehicle.idUser;
          
          this.userService.getUser(driver).subscribe((user) => {
            driver = user.firstname + ' ' + user.lastname;
            this.vehicles.push({id, model, status, picture, expenses, fuelConsumption, price, driver });
          });
          
        });
      }
    );

  }
  vehicleList: Vehicle[] = [];
  vehicles = [
    {
      id: '1',
      model: 'Toyota Corolla',
      status: 'Available',
      picture: 'https://via.placeholder.com/150', // Replace with actual image URL
      expenses: 1200,
      fuelConsumption: 6.5,
      price: 25000,
      driver: 'John Doe'
    },
    {
      model: 'Ford Transit',
      status: 'In Use',
      picture: 'https://via.placeholder.com/150', // Replace with actual image URL
      expenses: 2000,
      fuelConsumption: 9.8,
      price: 30000,
      driver: 'Jane Smith'
    }
  ];

  linkToVehicle(vehicle: any) {
    localStorage.setItem('vehicle', JSON.stringify(vehicle.id));
    this.router.navigate(['/admin/carDetail']);
  }

}
