import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import {User} from '../models/User'
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  errorMessage:string="";
  username: string="";
  password:string="";

  login(){
    this.userService.login(this.username, this.password).subscribe((user:User)=>{
      if(user !=null){
        //localStorage.setItem('ulogovan', JSON.stringify(user));
        if(user.type=="admin"){
          this.router.navigate(['admin']);
        }else if(user.type=="mechanic"){
          this.router.navigate(['mechanic']);

      }
      else if(user.type=="driver"){
        this.router.navigate(['driver']);
      }else{
        alert('Pogresan tip korisnika');
        return;
      }
    }
      else{
        this.errorMessage="Wrong username or password";
      }
    }
    
    )
  }
  saljiKuci(){
    localStorage.setItem('pretraga',JSON.stringify(false));
    this.router.navigate(['home']);
  }
  saljiLogin(){
    this.router.navigate(['login']);
  }
  saljiRegister(){
    this.router.navigate(['register']);
  }
  saljiSearch(){
    localStorage.setItem('pretraga',JSON.stringify(true));
    this.router.navigate(['home']);
  }

  
}
