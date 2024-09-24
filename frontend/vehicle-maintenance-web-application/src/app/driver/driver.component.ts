import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  @ViewChild('sidebarMenu') sidebarMenu!: ElementRef;
  constructor(private router:Router) { }

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

  odjava(){
    localStorage.removeItem('ulogovan')
    this.router.navigate(['login']);
  }

}
