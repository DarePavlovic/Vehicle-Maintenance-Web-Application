import { Component, OnInit } from '@angular/core';
import { RepairsService } from '../repairs.service';
import { Repairs } from '../models/Repairs';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../models/Vehicle';
import { UserService } from '../user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-send-repairs',
  templateUrl: './send-repairs.component.html',
  styleUrls: ['./send-repairs.component.css']
})
export class SendRepairsComponent implements OnInit {

  constructor(private repairService: RepairsService, private vehicleService: VehicleService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllMechanics().subscribe(
      (_mechanics) => {
        _mechanics.forEach((mechanic: User) => {
          let name = mechanic.firstname + ' ' + mechanic.lastname;
          let id = mechanic._id;
          this.mechanics.push({ name, id });
        });
      });
    this.repairService.getRepairs().subscribe((repairs) => {
      repairs.forEach((repair: Repairs) => {
        if(!repair.idUser){
        const description = repair.description;
        const date = repair.date;
        const id = repair.idVehicle;
        const idRepair = repair._id;
        this.vehicleService.getVehicle(id).subscribe((vehicle: Vehicle) => {
          console.log(vehicle);
          let vehicleName = vehicle.model;
          this.repairs.push({id:idRepair, description, date, vehicleName, selectedMechanic: '' });
        }
        );
      }
      });
    });
  }

  repairs = [
    {id:"", description: 'Oil change needed', date: new Date(), vehicleName: 'Toyota Corolla', selectedMechanic: '' },
    {id:"", description: 'Brake pad replacement', date: new Date(), vehicleName: 'Honda Civic', selectedMechanic: '' },
  ];

  mechanics = [{ name: 'John Doe', id: "9264763279329" }, { name: 'Jane Smith', id: "ndasjndjsandka" }, { name: 'Mike Johnson', id: "76247867263" }];

  assignRepair(repair: any) {
    if (repair.selectedMechanic) {
      alert(`${repair.vehicleName} repair assigned`);
      this.repairService.setMechanic(repair.id, repair.selectedMechanic).subscribe(
        (data) => {
          console.log(data);
        }
      );
      //delete repair from list
      this.repairs = this.repairs.filter((r) => r.id !== repair.id);
    } else {
      alert('Please select a mechanic.');
    }
  }

}
