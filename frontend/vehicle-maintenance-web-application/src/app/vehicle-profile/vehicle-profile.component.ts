import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../models/Vehicle';

@Component({
  selector: 'app-vehicle-profile',
  templateUrl: './vehicle-profile.component.html',
  styleUrls: ['./vehicle-profile.component.css']
})
export class VehicleProfileComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    const id = localStorage.getItem('vehicle');
    
    if (id) {
      const trimmedId = id.replace(/^"|"$/g, '')
      console.log("idVehicle is:" + id);
      this.vehicleService.getVehicle(trimmedId).subscribe((vehicle: Vehicle) => {
        if (vehicle) {
          console.log(vehicle);
          this.vehicle = vehicle;
          localStorage.removeItem('vehicle');
        }
      });
    } else {
      let userData = localStorage.getItem('ulogovan');
      if (userData) {
        this.user_id = JSON.parse(userData);
        console.log("user id is:" + this.user_id);
        if (this.user_id) {
          this.vehicleService.getVehicleByUser(this.user_id).subscribe((vehicle: Vehicle) => {
            if (vehicle) {
              console.log(vehicle);
              this.vehicle = vehicle;
            }
          });
        }
      }
    }
  }
  vehicle = {
    model: 'Toyota Corolla',
    engine: '1.8L Hybrid',
    fuel: 'Hybrid',
    yearMade: 2021,
    licensePlate: 'BG 1234 AB',
    picture: 'assets/car_picture.png', // You can provide a URL for the picture
    mileage: 15000,
    mileageMonth: 1200,
    mileageTillServis: 3000,
    fuelConsumptionMonth: 120,
    consumptionMonth: 100,
    consumptionGeneral: 750,
    status: 'Active',
    dateTire: new Date('2023-03-15'),
    dateRegistration: new Date('2023-06-01'),
    dateSmallServis: new Date('2023-07-20'),
    dateBigServis: new Date('2023-05-10'),
    dateFirstAid: new Date('2023-01-01'),
    dateFireExtinguisher: new Date('2023-02-15'),
    dateFuelFill: new Date(),
    priceFuelMonth: 200,
    priceMainainanceMonth: 100,
    priceMainainanceGeneral: 1500,
    priceRegistration: 120,
    vehicleValue: 20000
  };

  user_id: string = "";
  //vehicle: Vehicle|undefined;


}
