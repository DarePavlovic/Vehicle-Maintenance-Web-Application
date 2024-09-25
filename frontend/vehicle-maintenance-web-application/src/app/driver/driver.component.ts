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
  constructor(private router:Router) { }

  ngOnInit(): void {
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
