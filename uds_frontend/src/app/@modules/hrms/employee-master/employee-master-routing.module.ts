import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeMasterComponent } from './employee-master.component';
import { ResignationCreateComponent } from './resignation-create/resignation-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: '', component: EmployeeMasterComponent },
  // {path:'pay-slip',component:PaySlipComponent},
  // {path:'calendar',component:CalendarComponent},
  { path: 'resignation-create', component: ResignationCreateComponent },

  {
    path: 'employ',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },


  // {
  //   path: 'advance_payment',
  //   loadChildren: () =>
  //     import('./advance-payment/advance-payment.module').then(
  //       (m) => m.AdvancePaymentModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeMasterRoutingModule { }
