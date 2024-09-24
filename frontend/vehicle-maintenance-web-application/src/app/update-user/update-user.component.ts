import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../user.service';
import { User } from '../models/User';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((u: User[]) => {
      this.users = u;
    })
  }
  users: User[] = [];
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  type: string = '';
  phone: string = '';
  address: string = '';
  username: string = '';
  picture: string = '';
  coefficient: number = 1;
  salary: number = 0;
  bo: boolean = false;
  id: string = '';
  //make me update user function where i would get the user information from User user argument and update the user information
  //in the database
  promena(user: User) {//ovde treba da se prosledi user koji se menja
    this.id = user._id;
    this.firstName = user.firstname;
    this.lastName = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.confirmPassword = user.password;
    this.type = user.type;
    this.phone = user.phone;
    this.address = user.address;
    this.username = user.username;
    this.picture = user.picture;
    this.coefficient = user.coefficient;
    this.salary = user.salary;
    this.bo = true;
   // this.ngOnInit();
  }
  tip: string = '';
  updateUser() {

    if(this.bo!=true){
      alert("Niste izabrali korisnika");
      return;
    }
    if (this.slikaPromenjena != true) {
      this.slika = this.picture;
    }
    this.type = this.tip;
    this.userService.updateUser(this.id, this.firstName, this.lastName, this.username,  this.phone, this.address, this.slika,this.type, this.coefficient, this.salary)
      .subscribe((resp: any) => {
        if (resp['message'] == 'ok') {
          alert('User updated successfully');
          this.slikaPromenjena = false;
          
          this.bo = false;
        }
        else {
          alert(resp['message']);
        }
      });
      window.location.reload();
  }


  slika: string = '';
  slikaPoruka: string = ''
  slikaSacuvana: boolean = false
  slikaPromenjena: boolean = false

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

}