import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, Observable, of } from 'rxjs';
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

  register(first: string, last: string, userN: string, pass: string, mail: string,phone:string, address:string, pict: string, type: string, coefficient: number, salary: number, idVehicle: string
  ) {
    const data = {
      _id: "",
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

  getUser(idUser:string): Observable<User> {


    return this.http.post<User>(`${this.uri}/getUser`,{idUser});
  }
  getEmail(username:string, email:string){
    const data = {
      username:username,
      email:email
    }

    return this.http.post<User>(`${this.uri}/getEmail`,data);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.uri}/getAllUsers`).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      } )
    );
  }


  updateUser(id:string,first: string, last: string, userN: string, phone:string, address:string, pict: string, type: string, coefficient: number, salary: number) {
    const data = {
      _id: id,
      firstname: first,
      lastname: last,
      username: userN,
      phone:phone,
      address: address,
      picture: pict,
      type: type,
      coefficient: coefficient,
      salary: salary
    }

    return this.http.post<User>(`${this.uri}/updateUser`, data);
  }

  setVehicle(idVehicle: string, idUser:string): Observable<User> {
    return this.http.post<User>(`${this.uri}/setVehicle`, {idVehicle, idUser});
  }

  getVehicle(idUser: string): Observable<string> {
    return this.http.post<string>(`${this.uri}/getVehicle`, {idUser});
  }

  getPassword(idUser: string): Observable<string> {
    return this.http.post<string>(`${this.uri}/getPassword`, {idUser});
  }

  changePassword(idUser: string, pass: string): Observable<any> {
    return this.http.post<any>(`${this.uri}/changePassword`, {idUser, pass});
  }

  updateProfile(idUser:string,email:string,phone:string, address:string, pict: string): Observable<any> {
    const data = {
      idUser: idUser,
      email: email,
      phone:phone,
      address: address,
      picture: pict
    }

    return this.http.post<any>(`${this.uri}/updateProfile`, data);
  }

  getAllMechanics() {
    return this.http.get<User[]>(`${this.uri}/getAllMechanics`).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      } )
    );
  }
}
