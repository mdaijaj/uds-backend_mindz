import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventManagementListRoutingModule } from './event-management-list-routing.module';
import { EventManagementListComponent } from './event-management-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { EventActionComponent } from './event-action/event-action.component';
import { EventDailogComponent } from './event-dailog/event-dailog.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';

@NgModule({
  declarations: [
    EventManagementListComponent,
    EventActionComponent,
    EventDailogComponent
  ],
  imports: [
    CommonModule,
    EventManagementListRoutingModule,
    AgGridModule,
    MaterialModule
  ]
})
export class EventManagementListModule { }
