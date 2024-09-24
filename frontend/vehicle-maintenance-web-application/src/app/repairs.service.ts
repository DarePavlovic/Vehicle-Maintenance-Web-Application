import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repairs } from './models/Repairs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepairsService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/Repairs';

  addRepair(data: Repairs, defects:string[]):Observable<any> {
    console.log(defects);
    return this.http.post<any>(`${this.uri}/addRepair`, {data, defects});
  }

  setMechanic(idRepair: string, idMechanic: string) {
    const data = {
      idRepair: idRepair,
      idUser: idMechanic
    }
    return this.http.post(`${this.uri}/setMechanic`, data);
  }

  getRepairs() {
    return this.http.get<Repairs[]>(`${this.uri}/getRepairs`);
  }

  getRepair(idRepair: string) {
    const data = {
      idRepair: idRepair
    }
    return this.http.post<Repairs>(`${this.uri}/getRepair`, data);
  }

  updateRepair(data: Repairs) {
    return this.http.post(`${this.uri}/updateRepair`, data);
  }

  deleteRepair(idRepair: string) {
    const data = {
      idRepair: idRepair
    }
    return this.http.post(`${this.uri}/deleteRepair`, data);
  }

  getRepairsByVehicle(idVehicle: string) {
    const data = {
      idVehicle: idVehicle
    }
    return this.http.post<Repairs[]>(`${this.uri}/getRepairsByVehicle`, data);
  }

  setPrice(idRepair: string, price: number) {
    const data = {
      idRepair: idRepair,
      price: price
    }
    return this.http.post(`${this.uri}/setPrice`, data);
  }

  setDefects(idRepair: string, idDefect: string[]): Observable<any> {
    const data = {
      idRepair: idRepair,
      idDefect: idDefect
    }
    return this.http.post<any>(`${this.uri}/setDefects`, data);
  }

  createRepairWithDefects(repairData: any): Observable<any> {
    return this.http.post<any>(`${this.uri}/createRepairWithDefects`, repairData);
  }

}
