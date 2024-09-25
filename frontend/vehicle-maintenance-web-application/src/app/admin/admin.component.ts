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
    let datum = new Date(Date.now()+5*24*60*60*1000);
    console.log(datum.getUTCDate());
    if(datum.getUTCDay()-1==30 || datum.getUTCDay()-1==31 || datum.getUTCDay()-1==0 || datum.getUTCDate()==0){
      this.vehicleNotif="Podsetnik da je prvi u mesecu i da treba pustiti plate";
    }
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
  
  vehicleNotif: string = '';


}
