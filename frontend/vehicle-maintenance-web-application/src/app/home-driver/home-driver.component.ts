import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-home-driver',
  templateUrl: './home-driver.component.html',
  styleUrls: ['./home-driver.component.css']
})
export class HomeDriverComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('ulogovan');
    if (userData) {
      const userid = JSON.parse(userData);
      this.vehicleService.getVehicleByUser(userid).subscribe((data) => {
        const vehicle = data;
        if (new Date(vehicle.dateRegistration) < new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000)) {
          this.vehicleNotif += 'Registracija Vašeg vozila je istekla!';
        }
        else if (new Date(vehicle.dateRegistration) < new Date(Date.now() - 1 * 355 * 24 * 60 * 60 * 1000)) {
          this.vehicleNotif += 'Registracija Vašeg vozila uskoro ističe!!';
        }

        if ((new Date(vehicle.dateBigServis) < new Date(Date.now() - 1 * 355 * 24 * 60 * 60 * 1000))||vehicle.mileageTillServis<0 ){
          this.vehicleNotif += 'Odvezite auto na veliki servis!';
        }
        if (vehicle.mileageTillServis<10000 ){
          this.vehicleNotif += 'Odvezite auto na veliki servis!';
        }
        const currentYear = new Date().getFullYear();
        const novemberFirst = new Date(currentYear, 10, 1); // Months are 0-indexed, so 10 is November
        const aprilFirstNextYear = new Date(currentYear + 1, 3, 1); // Months are 0-indexed, so 3 is April

        const dateTire = new Date(vehicle.dateTire);
        if (dateTire >= novemberFirst && dateTire < aprilFirstNextYear) {
          this.vehicleNotif += 'Zamenite letnje na zimske gume!';
        } else if (dateTire >= aprilFirstNextYear) {
          this.vehicleNotif += 'Zamenite zimske na letnje gume!';
        }

        if (new Date(vehicle.dateFirstAid) < new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000)) {
          this.vehicleNotif += 'Vaša prva pomoć je istekla! Molimo kupite novu prvu pomoć, a trošak unesite u opciju [dodaj trošak]!';
        }
        if (new Date(vehicle.dateFireExtinguisher) < new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000)) {
          this.vehicleNotif += 'Vaša rok upotrebe protivpožarnog aparata je istekao! Molimo servisirajte, a trošak unesite u opciju [dodaj trošak]!';
        }

        // if (true) {
        //   this.vehicleNotif += '\nJOS NEKA GRESKA';
        // }
      });
    }
  }

  vehicleNotif: string = "";

}
