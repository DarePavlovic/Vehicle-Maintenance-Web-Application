import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface FuelPrice {
  category: number;
  minPrice: number;
  maxPrice: number;
}
interface FuelType {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class FuelService {

  private apiPriceRangeUrl = 'https://benzinko.com/server/api/prices/ALL/range'; // Replace with the actual API URL
  private apiCategoryUrl = 'https://benzinko.com/server/api/categories'; // Replace with the actual API URL
  //private apiKey = 'YOUR_API_KEY'; // Replace with your API key

  constructor(private http: HttpClient) {}

  getCurrentFuelPriceRange(): Observable<FuelPrice[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // return this.http.get(this.apiPriceRangeUrl, { headers });
    return this.http.get<FuelPrice[]>(this.apiPriceRangeUrl, { headers });

  }
  getCurrentFuelCategory(): Observable<FuelType[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // return this.http.get(this.apiCategoryUrl, { headers });
    return this.http.get<FuelType[]>(this.apiCategoryUrl,{ headers });

  }
}
