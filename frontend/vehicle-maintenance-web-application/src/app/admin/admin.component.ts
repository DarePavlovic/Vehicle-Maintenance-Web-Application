import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('sidebarMenu') sidebarMenu!: ElementRef;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  
  toggleSidebar() {
    this.sidebarMenu.nativeElement.classList.toggle('show');
  }

  closeSidebar() {
    this.sidebarMenu.nativeElement.classList.remove('show');
  }

  odjava() {
    localStorage.removeItem('ulogovan');
    this.router.navigate(['login']);
  }
  


}
