import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user = {
    _id: '',
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    picture: '',
    type: '',
    coefficient: 1,
    salary: 0,
    idVehicle: ''
  };

  constructor(private userService: UserService, private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    let userData = localStorage.getItem('ulogovan');
    if (userData) {
      this.user_id = JSON.parse(userData);
      console.log("user id is:" + this.user_id);
      if (this.user_id) {
        this.userService.getUser(this.user_id).subscribe((user:User) => {
          if (user) {
            this.user = user;
          }
        });
      }

    }
  }
  user_id: string = "";

  bo: boolean = false;
  promena(){
    this.bo=true;
  }


  updateUser() {
    // Implement this
    console.log(this.user_id);
    if(this.slikaPromenjena!=true){
      this.slika=this.user.picture;
    }
    this.userService.updateProfile(this.user_id, this.user.email, this.user.address,this.user.phone,this.slika).subscribe(resp=>{
      if (resp.message == "ok") {
        alert('User updated');
        this.slikaPromenjena=false;
       // this.user.picture=this.slika;
        this.user.picture = this.slika;
        //localStorage.setItem('ulogovan',JSON.stringify(this.user));
        this.bo=false;
        this.ngOnInit();
        
        
      }
      else{
        alert(resp.message);
        return;
      }
    })
    this.slikaPromenjena=false;
    this.user.picture = this.slika;
    this.bo=false;
    alert('User updated');
    
  }

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
