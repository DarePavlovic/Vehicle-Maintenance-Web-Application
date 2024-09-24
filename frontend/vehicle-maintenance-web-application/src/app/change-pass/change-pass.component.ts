import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    let userData = localStorage.getItem('ulogovan');
    if (userData) {
      this.user_id = JSON.parse(userData);
      console.log("user id is:" + this.user_id);
      if (this.user_id) {
        this.userService.getUser(this.user_id).subscribe((user) => {
          if (user) {
            this.user = user;
          }
        });
      }

    }
  }
  user_id: string = "";
  user: User | undefined;
  pass1: string = "";
   pass2:string = "";
   pass3:string = "";
   passPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,12}$");
   message: string = "";
  promeniLozinku() {
    if(this.pass2!=this.pass3){
      this.message="Lozinke nisu iste!";
      return;
    }
    if(!this.passPattern.test(this.pass2)){
      this.message = "Lozinka mora biti izmedju 8 i 12 karaktera i treba satojati u sebi malo, veliko slovo, broj i neki od znakova: @$!%*#?&";
      return;
    }
    
    this.userService.getPassword(this.user_id).subscribe((password:string) => {
      if(password==this.pass1){
        this.userService.changePassword(this.user_id,this.pass2).subscribe((res:any) => {
          if (res.message == "ok") {
            alert("Lozinka je uspesno promenjena!");
            localStorage.removeItem('ulogovan');
            this.router.navigate(['login']);
          }
        });
      }
      else{
        this.message = "Pogresna stara lozinka!";
      }
    });
  }


}
