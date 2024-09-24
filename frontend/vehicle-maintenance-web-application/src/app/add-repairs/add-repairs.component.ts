import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { DomSanitizer } from '@angular/platform-browser';
import { Defect } from '../models/Defect';
import { DefectService } from '../defect.service';
import { UserService } from '../user.service';
import { RepairsService } from '../repairs.service';
import { Repairs } from '../models/Repairs';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-add-repairs',
  templateUrl: './add-repairs.component.html',
  styleUrls: ['./add-repairs.component.css']
})
export class AddRepairsComponent implements OnInit {

  constructor(private router: Router, private domSanitizer: DomSanitizer, private defectService: DefectService, private repairService: RepairsService, private userService: UserService) { }

  ngOnInit(): void {
    let userData = localStorage.getItem('ulogovan');
    if (userData) {
      this.user_id = JSON.parse(userData);
      console.log("user id is:"+this.user_id);
      if (this.user_id)
        this.userService.getVehicle(this.user_id).subscribe((idVeh: string) => {
          console.log("vehicle id is: "+idVeh);
          this.idVehicle = idVeh || '';
        });
    }
    // this.user_id = "66e78bd1c4e212dc51044999";
    // this.idVehicle = "66e75aa1370bb82080d75f81";
    
  }
  user_id: string = '';
  user: User | undefined;
  isDriver: boolean = false;
  isMechanic: boolean = false;
  idVehicle: string = '';
  ngAfterInit(): void {
    //lead to driver page
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([this.router.url]);
    // });
  }

  defectDescription: string = "";
  repairDescription: string = "";
  pictureBefore: string = "";
  pictureAfter: string = "";
  priceParts: number = 0;
  mechanicFee: number = 0;
  totalPrice: number = 0;


  defect: DefectType = {
    id: 0,
    defectDescription: "",
    pictureBefore: ""
  }

  message: string = "";

  defectList: DefectType[] = [];
  id: number = 1;

  submitDefect() {
    this.defect.defectDescription = this.defectDescription;
    this.defect.pictureBefore = this.slika;
    this.defect.id = this.id;
    this.id = this.id + 1;
    this.defectList.push(this.defect);
    this.slikaSacuvana = false;
    this.defect = {
      id: 0,
      defectDescription: "",
      pictureBefore: ""
    }
  }
  listIds: string[] = [];
  // salji() {
  //   this.defectList.forEach(def1 => {
  //     let def: Defect = {
  //       _id: "",
  //       //idRepair: "",
  //       description: def1.defectDescription,
  //       pictureBefore: def1.pictureBefore,
  //       pictureAfter: "",
  //       priceParts: 0,
  //       mechanicFee: 0,
  //       totalPrice: 0
  //     }
  //     this.defectService.addDefect(def).subscribe((res) => {
  //       console.log("Defect added successfully: ", res);
  //       this.listIds.push(res._id);
  //     }, (error) => {
  //       console.error("Error adding defect: ", error);
  //     }
  //     );

  //     //this.listIds.push(def);
  //   });
  //   console.log("List of defect ids: ", this.listIds);
    

  //   let repair: Repairs = {
  //     _id: "",
  //     idUser: this.user_id || '',
  //     idVehicle: this.idVehicle,
  //     idDefect: this.listIds,
  //     date: new Date(),
  //     price: 0,
  //     description: this.repairDescription
  //   };

  //   console.log("Repair data: ", repair);

  //   this.repairService.addRepair(repair, this.listIds).subscribe((res) => {
  //     this.repairId = res._id;
  //     console.log("Repair added successfully: ", res._id);
  //   }, (error:any) => {
  //     console.error("Error adding repair: ", error);
  //   }
  // );
  
  //   // this.repairService.setDefects(this.repairId,this.listIds).subscribe((res) => {
  //   //     console.log("Defects added to repair: ", res);
  //   //   }, (error) => {
  //   //     console.error("Error adding defect to repair: ", error);
  //   //   }
  //   // );

    

  //   // this.repairService.createRepairWithDefects(repairData).subscribe((res) => {
  //   //   console.log("Repair created successfully: ", res);
  //   // }, (error) => {
  //   //   console.error("Error creating repair: ", error);
  //   // }
  //   // );


  //     //   this.defectService.addDefect(def).subscribe((res) => {
  //     //     if(res['message'] == "ok"){
  //     //       this.message = "Defect added";
  //     //       //this.router.navigate(['/driver/addRepair']);
  //     //     }
  //     //     else{
  //     //       this.message = "Something went wrong";
  //     //       return;
  //     //     }
  //     //     console.log(this.message);
  //     //   });
  //     // });

  //     // if(this.user){
  //     //   let repair:Repairs={
  //     //     _id:"",
  //     //     idUser:"a",
  //     //     idVehicle:this.user.idVehicle,
  //     //     idDefect:this.listIds,
  //     //     date:new Date(),
  //     //     price:0,
  //     //     description:this.repairDescription
  //     //   }
  //     //   this.repairService.addRepair(repair).subscribe((res) => {
  //     //     if(res['message'] == "ok"){
  //     //       this.message = "Repair added";
  //     //       this.router.navigate(['/driver/addRepair']);
  //     //     }
  //     //     else{
  //     //       this.message = "Something went wrong";
  //     //       return;
  //     //     }
  //     //     console.log(this.message);
  //     //   });


  //   }


  salji() {
    // Create an array of Observables for all addDefect calls
    const addDefectObservables = this.defectList.map(def1 => {
      const def: Defect = {
        _id: "",
        description: def1.defectDescription,
        pictureBefore: def1.pictureBefore,
        pictureAfter: "",
        priceParts: 0,
        mechanicFee: 0,
        totalPrice: 0
      };
      
      // Return the Observable from addDefect
      return this.defectService.addDefect(def);
    });
  
    // Use forkJoin to wait for all addDefect calls to complete
    forkJoin(addDefectObservables).subscribe(
      (results) => {
        // Process the results and extract defect IDs
        this.listIds = results.map(res => res._id);
        console.log("List of defect IDs: ", this.listIds);
  
        // Now create the repair object after all defects are added
        const repair: Repairs = {
          _id: "",
          idUser: this.user_id || '',
          idVehicle: this.idVehicle,
          idDefect: this.listIds,
          date: new Date(),
          price: 0,
          description: this.repairDescription
        };
  
        console.log("Repair data: ", repair);
  
        // Call addRepair after all addDefect operations are done
        this.repairService.addRepair(repair, this.listIds).subscribe(
          (res) => {
            this.repairId = res._id;
            console.log("Repair added successfully: ", res._id);
          },
          (error: any) => {
            console.error("Error adding repair: ", error);
          }
        );
      },
      (error) => {
        console.error("Error adding defects: ", error);
      }
    );
  }
    repairId: string = "";

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

interface DefectType {
  id: number;
  defectDescription: string;
  pictureBefore: string;
}
