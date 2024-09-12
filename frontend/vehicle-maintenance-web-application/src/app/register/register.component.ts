import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {FormControl, Validators} from '@angular/forms';
import { User } from '../models/User';
import { DomSanitizer } from '@angular/platform-browser';
import defaultProfilna from '../models/defProfilPicture';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService, private router:Router, private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }
  // email = new FormControl('', [Validators.required, Validators.email]);
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  username: string="";
  password:string="";
  passwordR:string="";
  firstname:string="";
  lastname:string="";
  email:string="";
  passPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,12}$");
  
  passMessage:string = "";
  emailMessage:string="";
  passRepeat:string="";

  picture:string="";
  message:string="";
  profilePic:File | undefined
  type:string="";
  coefficient:number=1;
  salary:number=0;
  address:string="";
  phone:string="";
  idVehicle:any=null;

  emailPattern: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  isValidEmail(email: string): boolean {
    return this.emailPattern.test(email);
  }

  errorMail: string = "";

  checkEmail() : boolean {
    if (this.isValidEmail(this.email)) {
      return true
    } else {
      this.errorMail = "Email is not valid!";
      return false
    }
  }

  profilePictureImage(event:any){
    this.profilePic = event.target.files[0];
    console.log(this.profilePic);
  }

  register(){
    if(!this.checkEmail()){
      return;
    }
    console.log(this.email);
    console.log(this.firstname);
    if(this.firstname=="" || this. lastname=="" || this.username=="" 
    || this.password=="" || this.passwordR=="" || this.email==""||this.type==""){
      alert("You must fill all field for sign up");
      
      this.message=="Sva polja su obavezna"
      return;
    }
    if(this.password!=this.passwordR){
      this.passRepeat="Lozinke nisu iste!";
      return;
    }
    if(!this.passPattern.test(this.password)){
      this.passMessage = "Lozinka mora biti izmedju 8 i 12 karaktera i treba satojati u sebi malo, veliko slovo, broj i neki od znakova: @$!%*#?&";
      return;
    }

    if(this.slika==null){
      this.slika = defaultProfilna
    }
 
    this.idVehicle=[];
      this.userService.getUser(this.username).subscribe((us:User)=>{
        if(us==null){
          this.userService.getEmail(this.username, this.email).subscribe((use:User)=>{
            if(use==null){
               this.userService.register(this.firstname, this.lastname, this.username, this.password, this.email,this.phone, this.address, this.slika, this.type, this.coefficient, this.salary, this.idVehicle
                ).subscribe((resp:any)=>{
                 if(resp['message']=='ok'){
                  
                    this.message = 'User added';
                    alert("You have successfully registered!");
                    this.router.navigate(['login']);
                  }
                 else{
                    this.message = 'Something went wrong';
                    return;
                 }
                })
            }
            else{
              this.message="This email is used by another user";
            }
          })
        }
        else{
          this.message="This username is used by another user";
        }
      })
      
  }



  saljiKuci() {
    localStorage.setItem('pretraga', JSON.stringify(false));
    this.router.navigate(['home']);
  }
  saljiLogin() {
    this.router.navigate(['login']);
  }
  saljiRegister() {
    this.router.navigate(['register']);
  }
  saljiSearch() {
    localStorage.setItem('pretraga', JSON.stringify(true));
    this.router.navigate(['home']);
  }

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
