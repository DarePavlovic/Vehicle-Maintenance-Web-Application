import { Component, OnInit } from '@angular/core';
import { Repairs } from '../models/Repairs';
import { RepairsService } from '../repairs.service';
import { DefectService } from '../defect.service';
import { Defect } from '../models/Defect';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-repairment',
  templateUrl: './repairment.component.html',
  styleUrls: ['./repairment.component.css']
})
export class RepairmentComponent implements OnInit {

  constructor(private repairService:RepairsService, private defectService:DefectService, private domSanitizer:DomSanitizer) { }

  changeVisibility(index: number) {
    const defects = document.querySelectorAll('.fullDescription');

    if (defects[index]) {
        const fullDescriptionElement = defects[index] as HTMLElement;

        if ((fullDescriptionElement.style.display === 'none' || fullDescriptionElement.style.display === '') && this.alreadyOpened == -1) {
            fullDescriptionElement.style.display = 'block';
            this.alreadyOpened = index;
        } else if(this.alreadyOpened == index){
            fullDescriptionElement.style.display = 'none';
            this.alreadyOpened = -1;
            this.slika = "";
        }
    }
  }

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
  repair = new Repairs();
  defects:Defect[] = [];

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
  slikaPromenjena:boolean = false;
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
            this.slikaPromenjena=true;
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
