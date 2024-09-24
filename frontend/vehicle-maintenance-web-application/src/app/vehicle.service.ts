import { Injectable } from '@angular/core';
import { Vehicle } from './models/Vehicle';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OID } from './models/Oid';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/vehicles';

  addVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post<any>(`${this.uri}/addVehicle`, vehicle);
  }

  setOwner(idVehicle: string, idUser:string): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.uri}/setOwner`, {idVehicle, idUser});
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.uri}/getVehicles`);
  }

  getVehicle(idVehicle: string): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.uri}/getVehicleLicense`, {idVehicle});
  }

  updateVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post<any>(`${this.uri}/updateVehicle`, vehicle);
  }

  deleteVehicle(idVehicle: string): Observable<any> {
    return this.http.post<any>(`${this.uri}/deleteVehicle`, idVehicle);
  }

  getVehicleByUser(idUser:string) {

    return this.http.post<Vehicle>(`${this.uri}/getVehicleByUser`, {idUser});
  }

  fillFuel(data:any){
    return this.http.post<any>(`${this.uri}/fillFuel`, data);
  }

  
  

  



}
