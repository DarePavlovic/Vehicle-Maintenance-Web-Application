import { Component, OnInit } from '@angular/core';
import { Repairs } from '../models/Repairs';
import { RepairsService } from '../repairs.service';
import { VehicleService } from '../vehicle.service';
import { Defect } from '../models/Defect';
import { DefectService } from '../defect.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private repairsService: RepairsService, private vehicleService: VehicleService, private defectService: DefectService) { }
  defects: Map<string, Array<string>> = new Map<string, Array<string>>();
  ngOnInit(): void {
    this.repairsService.getRepairs().subscribe((_repairs) => {
      _repairs.forEach((repair: Repairs) => {
        if (repair.price != 0) {
          this.vehicleService.getVehicle(repair.idVehicle).subscribe((vehicle) => {
            repair.idVehicle = vehicle.model;
            this.defects.set(repair._id, repair.idDefect);
            this.repairs.push(repair);
          });
        }
      });
    });
  }
  repairsList: Repairs[] = [];
  repairs: Repairs[] = [];
  filteredRepairs: Repairs[] = [];
  defectList: Defect[] = [];
  dString: string[] = [];
  currentRepairIndex: number = -1;
  lastShown: HTMLElement | null = null;

  filterRepairs(index: number) {
    const allDefectDetails = document.querySelectorAll('.defectsContainers');
    const defectsDetailsForOneRepair = allDefectDetails[index] as HTMLElement;
    if (this.currentRepairIndex == -1) {
      this.currentRepairIndex = index;
      this.defectList = [];
      const i = this.repairs[index]._id;
      if (this.defects.get(i)) {
        this.dString = this.defects.get(i) || [];
      };
      this.dString.forEach((defectId) => {
        this.defectService.getDefect(defectId).subscribe((_defect: Defect) => {
          this.defectList.push(_defect);
        });
      });
      defectsDetailsForOneRepair.style.display = 'block';
      this.lastShown = defectsDetailsForOneRepair;
    } else if (this.currentRepairIndex == index) {
      this.currentRepairIndex = -1;
      defectsDetailsForOneRepair.style.display = 'none';
      this.lastShown = null;
      //sakrij sebe
    }
    else {
      if (this.lastShown) {
        this.lastShown.style.display = 'none';
      }
      this.currentRepairIndex = index;
      this.defectList = [];
      const i = this.repairs[index]._id;
      if (this.defects.get(i)) {
        this.dString = this.defects.get(i) || [];
      };
      this.dString.forEach((defectId) => {
        this.defectService.getDefect(defectId).subscribe((_defect: Defect) => {
          this.defectList.push(_defect);
        });
      });
      defectsDetailsForOneRepair.style.display = 'block';
      this.lastShown = defectsDetailsForOneRepair;

      //sakrij proslog

      //prikazi sebe
    }
  }

}
