import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //this.user=JSON.parse(localStorage.getItem('ulogovan'));
  }

  driver = {
    profileImage: 'assets/driver.jpg',
    name: 'John Doe',
    rating: 4.8,
    bio: '5 years of driving experience. Speaks English and Spanish.',
    phone: '+1234567890',
    email: 'john.doe@example.com',
    licenseNumber: 'AB1234567',
    licenseExpiry: '12/2025'
  };

  car = {
    image: 'assets/car.jpg',
    make: 'Toyota',
    model: 'Prius',
    year: 2020,
    licensePlate: 'XYZ 1234',
    color: 'Blue',
    fuelType: 'Hybrid',
    type: 'Sedan',
    mileage: 35000,
    features: ['Air Conditioning', 'Leather Seats', 'Music System', 'Child Seat']
  };

  bookRide() {
    alert('Ride booked with ' + this.driver.name);
  }

  reportIssue() {
    alert('Report an issue with ' + this.driver.name);
  }

}
