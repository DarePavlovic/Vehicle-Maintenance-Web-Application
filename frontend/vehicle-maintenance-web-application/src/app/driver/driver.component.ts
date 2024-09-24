import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  @ViewChild('sidebarMenu') sidebarMenu!: ElementRef;
  constructor() { }

  ngOnInit(): void {
    // const userData = localStorage.getItem('ulogovan');
    // if (userData) {
    //   this.user = JSON.parse(userData);
    // }
  }

  //user:User| undefined;
  
  toggleSidebar() {
    this.sidebarMenu.nativeElement.classList.toggle('show');
  }

  closeSidebar() {
    this.sidebarMenu.nativeElement.classList.remove('show');
  }


}
