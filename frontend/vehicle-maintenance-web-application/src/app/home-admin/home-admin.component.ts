import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let datum = new Date(Date.now()+5*24*60*60*1000);
    console.log(datum.getUTCDate());
    if(datum.getUTCDay()-1==30 || datum.getUTCDay()-1==31 || datum.getUTCDay()-1==0 || datum.getUTCDate()==0){
      this.vehicleNotif="Podsetnik da je prvi u mesecu i da treba pustiti plate";
    }
  }
  

  vehicleNotif: string = "";


}
