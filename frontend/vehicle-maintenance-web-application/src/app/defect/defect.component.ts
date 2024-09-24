import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-defect',
  templateUrl: './defect.component.html',
  styleUrls: ['./defect.component.css']
})
export class DefectComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  user:User| undefined;
  isMechanic:boolean = false;
  ngAfterInit(): void {
    //lead to driver page
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  defectDescription: string = "";
  pictureBefore: string = "";
  pictureAfter: string = "";
  priceParts: number = 0;
  mechanicFee: number = 0;
  totalPrice: number = 0;

  submitDefect(){
    console.log("Defect description: " + this.defectDescription);
    console.log(this.defectDescription);
    // console.log(this.pictureBefore);
    // console.log(this.pictureAfter);
    console.log(this.priceParts);
    console.log(this.mechanicFee);
    console.log(this.totalPrice);
    this.ngAfterInit();
  }

}
