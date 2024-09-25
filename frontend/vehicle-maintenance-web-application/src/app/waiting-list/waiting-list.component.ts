import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.css']
})
export class WaitingListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  repairs = [
    {id:"", description: 'Oil change needed', date: new Date(), vehicleName: 'Toyota Corolla', selectedMechanic: '' },
    {id:"", description: 'Brake pad replacement', date: new Date(), vehicleName: 'Honda Civic', selectedMechanic: '' },
  ];
  setCUrrentRepairment:boolean = false;
  setCurrent(repairment:any){
    if(localStorage.getItem('currentRepairment')?.length!=0){
      
      localStorage.setItem('currentRepairment', JSON.stringify(repairment.id));
      this.setCUrrentRepairment=true;
    }
    else{
      alert("Zauzeta je trenutna popravka");
    }
    
  }

}
