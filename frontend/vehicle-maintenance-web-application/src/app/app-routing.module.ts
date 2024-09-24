import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { MechanicComponent } from './mechanic/mechanic.component';
import { DriverComponent } from './driver/driver.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { AddRepairsComponent } from './add-repairs/add-repairs.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { SetVehicleComponent } from './set-vehicle/set-vehicle.component';
import { AddFuelComponent } from './add-fuel/add-fuel.component';
import { VehicleProfileComponent } from './vehicle-profile/vehicle-profile.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"login", component:LoginComponent},
  {path:"admin", component:AdminComponent,
    children:[
      {path:"register", component:RegisterComponent},
      {path:"updateUser", component:UpdateUserComponent},
      {path:"addVehicle", component:AddVehicleComponent},
      {path:"setOwner", component:SetVehicleComponent}
    ]
  },
  {path:"mechanic", component:MechanicComponent},
  {path:"driver", component:DriverComponent,
    children:[
      {path:"updateUser", component:UpdateUserComponent},
      {path:"profile", component:DriverProfileComponent},
      {path:"addRepair", component:AddRepairsComponent},
      {path:"addFuel",component:AddFuelComponent},
      {path:"carDetail",component:VehicleProfileComponent},
      {path:"changePassword",component:ChangePassComponent},
      {path:"userProfile", component:UserProfileComponent}
    ]
  },
  {path:"**", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
