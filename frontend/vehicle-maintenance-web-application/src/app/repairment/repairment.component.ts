import { Component, OnInit } from '@angular/core';
import { Repairs } from '../models/Repairs';
import { RepairsService } from '../repairs.service';
import { DefectService } from '../defect.service';
import { Defect } from '../models/Defect';

@Component({
  selector: 'app-repairment',
  templateUrl: './repairment.component.html',
  styleUrls: ['./repairment.component.css']
})
export class RepairmentComponent implements OnInit {

  constructor(private repairService:RepairsService, private defectService:DefectService) { }

  ngOnInit(): void {
    //localStorage.removeItem('currentRepairment');
    let id = localStorage.getItem('currentRepairment');
    if(id){
      let k = JSON.parse(id);
      this.repairService.getRepair(k).subscribe((repair)=>{
        this.repair = repair;
        console.log(this.repair);
        this.repair.idDefect.forEach((defectId)=>{
          this.defectService.getDefect(defectId).subscribe((defect)=>{
            console.log(defect);
            this.defects.push(defect);
          });
      });
    });
  }
}
  repair:Repairs|undefined;
  defects:Defect[] = [];
}
