import { Component, OnInit } from '@angular/core';
import { Repairs } from '../models/Repairs';
import { RepairsService } from '../repairs.service';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.css']
})
export class WaitingListComponent implements OnInit {
  vehicle: Map<string, string> = new Map<string, string>();
  constructor(private repairService: RepairsService, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    let userData = localStorage.getItem('ulogovan');
    if (userData) {
      this.repairService.getRepairsByMechanic(JSON.parse(userData)).subscribe((data: Repairs[]) => {
        this.repairs = data.filter((repair: Repairs) => repair.price == 0);

        this.repairs.forEach((repair: Repairs) => {
          let idVehicle = repair.idVehicle;

          if (idVehicle) {
            this.vehicleService.getVehicle(idVehicle).subscribe((vehicle) => {
              let name = vehicle.model;
              this.vehicle.set(idVehicle, name);
            });
          }
        });
      });
    }
  }

  repairs: Repairs[] = [];
  setCUrrentRepairment: boolean = false;
  setCurrent(repairment: Repairs) {
    let p = localStorage.getItem('currentRepairment');
    console.log(p);
    if (p== null) {
      console.log(repairment._id);
      localStorage.setItem('currentRepairment', JSON.stringify(repairment._id));
      this.repairs = this.repairs.filter((repair: Repairs) => repair._id != repairment._id);
    }
    else {
      alert("Zauzeta je trenutna popravka");
    }

  }

}
