import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../models/Vehicle';
import { FuelService } from '../fuel.service';
interface FuelEntry {
  liters: number;
  mileage: number;
}


interface FuelEntry {
  liters: number;
  mileage: number;
}
interface FuelType {
  id: number;
  name: string;
}
interface FuelPrice {
  category: string;
  minPrice: number;
  maxPrice: number;
}
@Component({
  selector: 'app-add-fuel',
  templateUrl: './add-fuel.component.html',
  styleUrls: ['./add-fuel.component.css']
})
export class AddFuelComponent implements OnInit {

  fuelPrices: FuelPrice[] = [
    { "category": "Benzin", "minPrice": 176.00, "maxPrice": 187.00 },
    { "category": "Dizel", "minPrice": 190.00, "maxPrice": 198.00 },
    { "category": "TNG", "minPrice": 97.90, "maxPrice": 100.40 }
  ];

  fuelTypes: FuelType[] = [
    { "id": 3, "name": "TNG" },
    { "id": 1, "name": "Dizel" },
    { "id": 2, "name": "Benzin" }
  ];

  selectedFuelType: FuelType | undefined;

  constructor(private vehicleService: VehicleService, private fuelService: FuelService) { }

  ngOnInit(): void {
    let userData = localStorage.getItem('ulogovan');
    if (userData) {
      this.user_id = JSON.parse(userData);
      console.log("user id is:" + this.user_id);
      if (this.user_id) {
        this.vehicleService.getVehicleByUser(this.user_id).subscribe((vehicle: Vehicle) => {
            this.vehicle = vehicle;
            this.initialMileage = this.vehicle.mileage;
            this.totalFuel = this.vehicle.fuelConsumptionMonth;
            this.totalDistance = this.vehicle.mileage;
            this.monthlyDistance = this.vehicle.mileageMonth
            this.fuelConsumptionMonth = this.vehicle.consumptionMonth;
            this.selectedFuelType = this.fuelTypes.find(fuelType => fuelType.name === this.vehicle?.fuel);
            this.fuelPrice = this.fuelPrices.find(fuelPrice => fuelPrice.category === this.selectedFuelType?.name);
            this.myPrice = this.fuelPrice?.minPrice || 0;
            this.priceFuelMonth = this.vehicle.priceFuelMonth;
          });
       
      }
    }
    // this.fetchFuelPrices();
    // this.fetchFuelTypes();
  }

  fuelPrice: FuelPrice | undefined;
  myPrice:number = 0;
  vehicle: Vehicle | undefined;
  user_id: string = '';
  idVehicle: string = '';
  entries: FuelEntry[] = [];
  liters: number = 0;
  mileage: number = 0;
  monthlyDistance: number = 0;
  mileageTillServis: number = 0;
  fuelConsumptionMonth: number = 0;
  fuelConsumption: number = 0;
  totalFuel: number = 0;
  totalDistance: number = 0;//predjeno km za mesec dana
  initialMileage: number = 0;
  priceFuelMonth: number = 0;
  
  addEntry() {
    
    console.log(this.initialMileage, this.mileage);
    this.calculateStats();

    
    if(!this.isCurrentMonth()){
      this.monthlyDistance=0;
      this.priceFuelMonth=0;
      this.fuelConsumptionMonth=0;
    }

    // Reset input values
    this.liters = 0;
    this.mileage = 0;
  }

  calculateStats() {
    this.totalFuel = this.entries.reduce((sum, entry) => sum + entry.liters, 0);
    if (this.entries.length > 1) {
      this.totalDistance = this.entries[this.entries.length - 1].mileage - this.initialMileage;
    }

    const currentMonthEntries = this.entries.filter(entry => this.isCurrentMonth());
    if (currentMonthEntries.length > 1) {
      this.monthlyDistance = currentMonthEntries[currentMonthEntries.length - 1].mileage - currentMonthEntries[0].mileage;
    }
  }

  get averageConsumption() {
    return this.monthlyDistance > 0 ? (this.totalFuel / this.monthlyDistance) * 100 : 0;
  }

  private isCurrentMonth(): boolean {
    if(this.vehicle){
      const entryDate = this.vehicle.dateFuelFill; //  datum proslog unosa
      //postavimo datum unosa na danasnji datum
      const now = new Date();
      return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
    }
    return false;
  }










  // fetchFuelPrices() {
  //   this.fuelService.getCurrentFuelPriceRange().subscribe(
  //     data => {
  //       this.fuelPrices = data;
  //       console.log('Fetched Fuel Prices:', this.fuelPrices);
  //     },
  //     error => {
  //       console.error('Error fetching fuel prices:', error);
  //     }
  //   );
  // }
  // fetchFuelTypes() {
  //   this.fuelService.getCurrentFuelCategory().subscribe(
  //     data => {
  //       this.fuelTypes = data;
  //       console.log('Fuel Types:', this.fuelTypes);
  //     },
  //     error => {
  //       console.error('Error fetching fuel types:', error);
  //     }
  //   );
  // }
}
