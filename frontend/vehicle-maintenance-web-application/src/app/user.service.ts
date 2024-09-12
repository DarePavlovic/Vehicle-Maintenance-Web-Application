import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from './models/User';
import { OID } from './models/Oid';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  uri = 'http://localhost:4000/User';

  login(user: string, pass: string) {
    const data = {
      username: user,
      password: pass
    }

    return this.http.post<User>(`${this.uri}/login`, data);
  }

  register(first: string, last: string, userN: string, pass: string, mail: string,phone:string, address:string, pict: string, type: string, coefficient: number, salary: number, idVehicle: Array<OID>
  ) {
    const data = {
      firstname: first,
      lastname: last,
      username: userN,
      password: pass,
      email: mail,
      phone:phone,
      address: address,
      picture: pict,
      type: type,
      coefficient: coefficient,
      salary: salary,
      idVehicle: idVehicle
    }

    return this.http.post<User>(`${this.uri}/register`, data);
  }

  getUser(username:string){
    const data = {
      username:username
    }

    return this.http.post<User>(`${this.uri}/getUser`,data);
  }
  getEmail(username:string, email:string){
    const data = {
      username:username,
      email:email
    }

    return this.http.post<User>(`${this.uri}/getEmail`,data);
  }
}
