import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeMasterRoutingModule } from './employee-master-routing.module';
import { EmployeeMasterComponent } from './employee-master.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { MatNativeDateModule } from '@angular/material/core';
import { PaySlipComponent } from './pay-slip/pay-slip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ResignationCreateComponent } from './resignation-create/resignation-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HRManagementComponent } from './pending-task/hr-management/hr-management.component';
import { ProcurementBudgetApprovalComponent } from './pending-task/procurement-budget-approval/procurement-budget-approval.component';
import { LMSComponent } from './pending-task/lms/lms.component';
import { AdminComponent } from './pending-task/admin/admin.component';
import { ItTicketingComponent } from './pending-task/it-ticketing/it-ticketing.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  declarations: [
    EmployeeMasterComponent,
    PaySlipComponent,
    ResignationCreateComponent,
    DashboardComponent,
    ChangePasswordComponent,

    // For pending task start
    HRManagementComponent,
    ProcurementBudgetApprovalComponent,
    LMSComponent,
    AdminComponent,
    ItTicketingComponent,
    // For pending task end
  ],
  imports: [
    CommonModule,
    EmployeeMasterRoutingModule,
    MaterialModule,
    AgGridModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    FormsModule
  ]
})
export class EmployeeMasterModule { }
