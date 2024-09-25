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
import { SendRepairsComponent } from './send-repairs/send-repairs.component';
import { AllVehiclesComponent } from './all-vehicles/all-vehicles.component';
import { WaitingListComponent } from './waiting-list/waiting-list.component';
import { RepairmentComponent } from './repairment/repairment.component';
import { HistoryComponent } from './history/history.component';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { EarningsComponent } from './earnings/earnings.component';
import { HomeDriverComponent } from './home-driver/home-driver.component';
import { EarningsMechanicComponent } from './earnings-mechanic/earnings-mechanic.component';
import { ReportExpensesComponent } from './report-expenses/report-expenses.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"login", component:LoginComponent},
  {path:"admin", component:AdminComponent,
    children:[
      {path:"home", component:HomeAdminComponent},
      {path:"register", component:RegisterComponent},
      {path:"updateUser", component:UpdateUserComponent},
      {path:"addVehicle", component:AddVehicleComponent},
      {path:"setOwner", component:SetVehicleComponent},
      {path:"sendRepair", component:SendRepairsComponent},
      {path:"allVehicle", component:AllVehiclesComponent},
      {path:"carDetail",component:VehicleProfileComponent},
      {path:"paymentHistory", component:PaymentsHistoryComponent},
      {path:"history", component:HistoryComponent},
      {path:"**",component:HomeAdminComponent}

    ]
  },
  {path:"mechanic", component:MechanicComponent,
    children:[
      {path:"waitingList", component:WaitingListComponent},
      {path:"repairment", component:RepairmentComponent},
      {path:"history", component:HistoryComponent},
      {path:"userProfile", component:UserProfileComponent},
      {path:"earnings", component:EarningsMechanicComponent}
    ]
  },
  {path:"driver", component:DriverComponent,
    children:[
      {path:"home",component:HomeDriverComponent},
      {path:"updateUser", component:UpdateUserComponent},
      {path:"addRepair", component:AddRepairsComponent},
      {path:"addFuel",component:AddFuelComponent},
      {path:"carDetail",component:VehicleProfileComponent},
      {path:"changePassword",component:ChangePassComponent},
      {path:"userProfile", component:UserProfileComponent},
      {path:"earnings", component:EarningsComponent},
      {path:"reportExpenses", component:ReportExpensesComponent},
      {path:"**",component:HomeDriverComponent}
    ]
  },
  {path:"**", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
