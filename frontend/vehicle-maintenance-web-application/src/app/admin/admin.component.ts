import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('sidebarMenu') sidebarMenu!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  
  toggleSidebar() {
    this.sidebarMenu.nativeElement.classList.toggle('show');
  }

  closeSidebar() {
    this.sidebarMenu.nativeElement.classList.remove('show');
  }

  


}
