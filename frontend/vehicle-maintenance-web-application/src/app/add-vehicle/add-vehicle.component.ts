import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OID } from '../models/Oid';
import { Vehicle } from '../models/Vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  constructor(private router:Router,  private domSanitizer:DomSanitizer, private vehicleService:VehicleService) { }

  ngOnInit(): void {
  }

  make: string = '';
  model: string = '';
  engine: string = '';
  fuel: string = '';
  yearMade: number = 0;
  licensePlate: string = '';
  picture: string = '';
  mileage: number = 0;
  mileageMonth: number = 0;
  mileageTillServis: number = 0;
  fuelConsumptionMonth: number = 0;
  consumptionMonth: number = 0;
  consumptionGeneral: number = 0;
  status: string = '';
  dateTire: Date = new Date();
  dateRegistration: Date = new Date();
  dateSmallServis: Date = new Date();
  dateBigServis: Date = new Date();
  dateFirstAid: Date = new Date();
  dateFireExtinguisher: Date = new Date();
  dateFuelFill: Date = new Date();
  priceFuelMonth: number = 0;
  priceMainainanceMonth: number = 0;
  priceMainainanceGeneral: number = 0;
  priceRegistration: number = 0;
  vehicleValue: number = 0;
  idUser: Array<OID>  = [];

  dodajVozilo(){
    this.mileageMonth = 0;
    this.mileageTillServis = 20000;
    this.fuelConsumptionMonth = 0;
    this.consumptionMonth = 0;
    this.consumptionGeneral = 0;
    this.status = "not in use";
    this.priceFuelMonth = 0;
    this.priceMainainanceMonth = 0;
    this.priceMainainanceGeneral = 0;
    this.priceRegistration = 0;
    this.idUser=[];
    this.model = this.make + " " + this.model;
    let vozilo:Vehicle = {
      _id: "",
      model: this.model,
      engine: this.engine,
      fuel: this.fuel,
      yearMade: this.yearMade,
      licensePlate: this.licensePlate,
      picture: this.slika,
      mileage: this.mileage,
      mileageMonth: this.mileageMonth,
      mileageTillServis: this.mileageTillServis,
      fuelConsumptionMonth: this.fuelConsumptionMonth,
      consumptionMonth: this.consumptionMonth,
      consumptionGeneral: this.consumptionGeneral,
      status: this.status,
      dateTire: this.dateTire,
      dateRegistration: this.dateRegistration,
      dateSmallServis: this.dateSmallServis,
      dateBigServis: this.dateBigServis,
      dateFirstAid: this.dateFirstAid,
      dateFireExtinguisher: this.dateFireExtinguisher,
      dateFuelFill: this.dateFuelFill,
      priceFuelMonth: this.priceFuelMonth,
      priceMainainanceMonth: this.priceMainainanceMonth,
      priceMainainanceGeneral: this.priceMainainanceGeneral,
      priceRegistration: this.priceRegistration,
      vehicleValue: this.vehicleValue,
      idUser: ""
    }

    

    this.vehicleService.getVehicle(this.licensePlate).subscribe((vh:Vehicle) => {
      if(vh){
        alert("Vehicle with this license plate already exists!")
        return;
      }
      else{
        this.vehicleService.addVehicle(vozilo).subscribe((res) => {
          if(res['message'] == "ok"){
            this.message = "Vehicle added";
            this.router.navigate(['/admin']);
          }
          else{
            this.message = "Something went wrong";
            return;
          }
          alert(this.message);
        })
      }
    }
    )
  } 

  message:string = "";
  slika: string = "";
  slikaPoruka: string = "";
  slikaSacuvana: boolean = false;


  slikaDodata(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {


      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {


          const imgBase64Path = e.target.result;
          this.slika = imgBase64Path;
          this.slikaSacuvana = true;
          return true
          // this.previewImagePath = imgBase64Path;

        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  putdoslike() {
    return this.domSanitizer.bypassSecurityTrustUrl(this.slika)
  }

}

