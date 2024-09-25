import { Component, OnInit } from '@angular/core';
import { Repairs } from '../models/Repairs';
import { RepairsService } from '../repairs.service';
import { DefectService } from '../defect.service';
import { Defect } from '../models/Defect';
import { DomSanitizer } from '@angular/platform-browser';
import { PaymentsService } from '../payments.service';
import { Payment } from '../models/Payment';

@Component({
  selector: 'app-repairment',
  templateUrl: './repairment.component.html',
  styleUrls: ['./repairment.component.css']
})
export class RepairmentComponent implements OnInit {

  constructor(private repairService: RepairsService, private defectService: DefectService, private paymentService: PaymentsService, private domSanitizer: DomSanitizer) { }

  changeVisibility(index: number) {
    const defects = document.querySelectorAll('.fullDescription');

    if (defects[index]) {
      const fullDescriptionElement = defects[index] as HTMLElement;

      if ((fullDescriptionElement.style.display === 'none' || fullDescriptionElement.style.display === '') && this.alreadyOpened == -1) {
        fullDescriptionElement.style.display = 'block';
        this.alreadyOpened = index;
      } else if (this.alreadyOpened == index) {
        fullDescriptionElement.style.display = 'none';
        this.alreadyOpened = -1;
        this.slika = "";
      }
    }
  }

  ngOnInit(): void {
    //localStorage.removeItem('currentRepairment');
    this.defects = [];
    let id = localStorage.getItem('currentRepairment');
    if (id) {
      let k = JSON.parse(id);
      this.repairService.getRepair(k).subscribe((repair) => {
        this.repair = repair;
        this.idVehicle = repair.idVehicle;
        this.idUser = repair.idUser;
        this.description = repair.description;
        console.log(this.repair);
        this.repair.idDefect.forEach((defectId) => {
          this.defectService.getDefect(defectId).subscribe((defect) => {
            if(defect.totalPrice == 0){

            console.log(defect);
            this.counter++;
            this.defects.push(defect);
            }
            //this.description = defect.description;
          });
        });
        
      });
    }
  }
  counter:number = 0;
  repair = new Repairs();
  defects: Defect[] = [];
  idVehicle: string = '';
  idUser: string = '';
  description: string = '';
  inputMechanicFee: number = 0;
  inputPriceParts: number = 0;
  checkboxFault: boolean = false;
  checkboxSmallService: boolean = false;
  checkboxBigService: boolean = false;
  checkboxRegistration: boolean = false;
  checkboxTire: boolean = false;
  alreadyOpened: number = -1;

  slika: string = '';
  slikaPoruka: boolean = false;
  slikaSacuvana: boolean = false;
  slikaPromenjena: boolean = false;
  slikaDodata(fileInput: any) {
    this.slikaPoruka = false;
    this.slika = "";
    this.slikaSacuvana = false
    if (fileInput.target.files && fileInput.target.files[0]) {


      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {


          const imgBase64Path = e.target.result;
          this.slika = imgBase64Path;
          this.slikaSacuvana = true;
          this.slikaPromenjena = true;
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
  type: string = '';
  submitDefect(defect: string) {
    if (this.checkboxFault) {
      this.type = 'Fault';
    } else if (this.checkboxSmallService) {
      this.type = 'Small service';
    }
    else if (this.checkboxBigService) {
      this.type = 'Big service';
    }
    else if (this.checkboxRegistration) {
      this.type = 'Registration';
    }
    else if (this.checkboxTire) {
      this.type = 'Tire';
    }
    let price = this.inputMechanicFee + this.inputPriceParts;
    const date = new Date();
    const paymentData: Payment = {
      _id: '',
      idUser: this.idUser,
      idVehicle: this.idVehicle,
      date: date,
      price: price,
      description: this.description,
      type: this.type
    }
    this.paymentService.addPayment(paymentData).subscribe((payment: Payment) => {
      if (payment) {
        this.repairService.setPrice(this.repair._id, price).subscribe((repair) => {
          if (repair) {
            this.defectService.fixDefect(defect, this.slika, this.inputPriceParts, this.inputMechanicFee, price).subscribe((defect) => {
              if(defect){
                this.defects.filter((defect) => defect._id !== defect._id);
                alert('Defect fixed');
                if(this.counter == 1){
                  localStorage.removeItem('currentRepairment');
                  alert('All defects are fixed');
                }
                this.ngOnInit();
              }
            });
          }
        });
      }
    });
  }
}
