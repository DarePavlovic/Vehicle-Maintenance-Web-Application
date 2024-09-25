import { Component, OnInit } from '@angular/core';
import { Repairs } from '../models/Repairs';
import { RepairsService } from '../repairs.service';

@Component({
  selector: 'app-repairment',
  templateUrl: './repairment.component.html',
  styleUrls: ['./repairment.component.css']
})
export class RepairmentComponent implements OnInit {

  constructor(private repairService:RepairsService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('currentRepairment');
    if(id){
      this.repairService.getRepair(JSON.stringify(id)).subscribe((repair)=>{
        this.repair = repair;
      });
    }
  }
  repair:Repairs|undefined;

}
