import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MechanicComponent } from './mechanic/mechanic.component';
import { DriverComponent } from './driver/driver.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { SendRepairsComponent } from './send-repairs/send-repairs.component';
import { AddRepairsComponent } from './add-repairs/add-repairs.component';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { DefectComponent } from './defect/defect.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { SetVehicleComponent } from './set-vehicle/set-vehicle.component';
import { AddFuelComponent } from './add-fuel/add-fuel.component';
import { VehicleProfileComponent } from './vehicle-profile/vehicle-profile.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AllVehiclesComponent } from './all-vehicles/all-vehicles.component';
import { VehicleDriverComponent } from './vehicle-driver/vehicle-driver.component';
import { WaitingListComponent } from './waiting-list/waiting-list.component';
import { RepairmentComponent } from './repairment/repairment.component';
import { HistoryComponent } from './history/history.component';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { EarningsComponent } from './earnings/earnings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MechanicComponent,
    DriverComponent,
    AdminComponent,
    UpdateUserComponent,
    SendRepairsComponent,
    AddRepairsComponent,
    DriverProfileComponent,
    DefectComponent,
    AddVehicleComponent,
    SetVehicleComponent,
    AddFuelComponent,
    VehicleProfileComponent,
    ChangePassComponent,
    UserProfileComponent,
    AllVehiclesComponent,
    VehicleDriverComponent,
    WaitingListComponent,
    RepairmentComponent,
    HistoryComponent,
    PaymentsHistoryComponent,
    HomeAdminComponent,
    EarningsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
