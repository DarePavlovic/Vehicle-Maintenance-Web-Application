import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mechanic',
  templateUrl: './mechanic.component.html',
  styleUrls: ['./mechanic.component.css']
})
export class MechanicComponent implements OnInit {
  mechanicName: string = 'John Doe';
  private sidebarHidden: boolean = true;

  toggleSidebar(): void {
    this.sidebarHidden = !this.sidebarHidden;
  }

  isSidebarHidden(): boolean {
    return this.sidebarHidden;
  }
  mechanicSpecialty: string = 'Engine Repair';
  mechanicExperience: number = 10;
  constructor() { }

  ngOnInit(): void {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    this.sidebarHidden = true;
  }

  isCollapsed = true;

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
