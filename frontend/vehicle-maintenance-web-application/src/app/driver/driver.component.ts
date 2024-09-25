import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../models/Vehicle';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  @ViewChild('sidebarMenu') sidebarMenu!: ElementRef;
  constructor(private router:Router, private vehicleService:VehicleService) { }

  vehicleNotif: string = '';
  ngOnInit(): void {
    const userData = localStorage.getItem('ulogovan');
    if (userData) {
      const userid = JSON.parse(userData);
      this.vehicleService.getVehicleByUser(userid).subscribe((data) => {
        const vehicle = data;
        if (new Date(vehicle.dateRegistration) < new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000)) {
          this.vehicleNotif = 'Your vehicle registration has expired!';
        }
        else if (new Date(vehicle.dateRegistration) < new Date(Date.now() - 1 * 355 * 24 * 60 * 60 * 1000)) {
          this.vehicleNotif = 'Your vehicle registration will expire soon!';
        }
        
  
        // if (true) {
        //   this.vehicleNotif += '\nJOS NEKA GRESKA';
        // }
      });
    }
  }

  //user:User| undefined;
  
  toggleSidebar() {
    this.sidebarMenu.nativeElement.classList.toggle('show');
  }

  closeSidebar() {
    this.sidebarMenu.nativeElement.classList.remove('show');
  }

  odjava(){
    localStorage.removeItem('ulogovan')
    this.router.navigate(['login']);
  }

}
