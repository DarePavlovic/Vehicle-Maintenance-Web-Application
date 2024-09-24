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
            this.milage = this.vehicle.mileage;
            this.milageMonth = this.vehicle.mileageMonth;
            this.mileageTillServis = this.vehicle.mileageTillServis;
            this.fuelConsumptionMonth = this.vehicle.fuelConsumptionMonth;
            this.consumptionMonth = this.vehicle.consumptionMonth;
            this.consumptionGeneral = this.vehicle.consumptionGeneral;
            this.priceFuelMonth = this.vehicle.priceFuelMonth;
            this.selectedFuelType = this.fuelTypes.find(fuelType => fuelType.name === this.vehicle?.fuel);
            this.fuelPrice = this.fuelPrices.find(fuelPrice => fuelPrice.category === this.selectedFuelType?.name);
            this.myPrice = this.fuelPrice?.minPrice || 0;
            
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
  entries: FuelEntry[] = [];
  liters: number = 0;
  mileageEntry: number = 0;

  milage: number = 0;
  milageMonth: number = 0;
  mileageTillServis: number = 0;

  fuelConsumptionMonth: number = 0;
  consumptionMonth: number = 0;
  consumptionGeneral: number = 0;
  priceFuelMonth: number = 0;
  
  addEntry() {
    if(!this.isCurrentMonth()){
      this.milageMonth=0;
      this.priceFuelMonth=0;
      this.fuelConsumptionMonth=0;
    }
    console.log(this.milage, this.mileageEntry);
    if(this.mileageEntry < this.milage){
      this.mileageEntry+=this.milage;
    }

    this.calculateStats();

    const data = {
      id: this.vehicle?._id || '',
      mileage: this.milage,
      mileageMonth: this.milageMonth,
      mileageTillServis: this.mileageTillServis,
      fuelConsumptionMonth: this.fuelConsumptionMonth,
      consumptionMonth: this.consumptionMonth,
      consumptionGeneral: this.consumptionGeneral,
      dateFuelFill: new Date(), // Assuming the current date is the fill date
      priceFuelMonth: this.priceFuelMonth
    };

    this.vehicleService.fillFuel(data).subscribe((resp:any) => {
      if(resp.message === 'ok'){
        console.log('Fuel data saved successfully');
      }else{
        console.error('Error saving fuel data:', resp);
      }
    });
    
    // Reset input values
    this.liters = 0;
    this.mileageEntry = 0;
  }

  calculateStats() {
    this.milageMonth +=this.mileageEntry-this.milage;
    this.fuelConsumptionMonth += this.liters;
    this.priceFuelMonth += this.liters * this.myPrice;
    this.consumptionMonth = this.fuelConsumptionMonth / this.milageMonth * 100;
    if(this.consumptionGeneral>0){
      this.consumptionGeneral=this.consumptionMonth;
    }
    if(this.fuelConsumptionMonth>0){
      this.consumptionGeneral = (this.consumptionGeneral +this.consumptionMonth)/2;
    }
    
    this.mileageTillServis -= this.mileageEntry-this.milage;
    this.milage = this.mileageEntry;
    
  }

  get averageConsumption() {
    return this.milageMonth > 0 ? (this.fuelConsumptionMonth / this.milageMonth) * 100 : 0;
  }

  private isCurrentMonth(): boolean {
    if(this.vehicle){
      const entryDate = new Date(this.vehicle.dateFuelFill); //  datum proslog unosa
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
