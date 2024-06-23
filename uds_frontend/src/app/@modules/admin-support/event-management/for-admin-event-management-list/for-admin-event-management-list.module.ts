import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForAdminEventManagementListRoutingModule } from './for-admin-event-management-list-routing.module';
import { ForAdminEventManagementListComponent } from './for-admin-event-management-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';

@NgModule({
  declarations: [
    ForAdminEventManagementListComponent
  ],
  imports: [
    CommonModule,
    ForAdminEventManagementListRoutingModule,
    AgGridModule,
    MaterialModule
  ]
})
export class ForAdminEventManagementListModule { }
