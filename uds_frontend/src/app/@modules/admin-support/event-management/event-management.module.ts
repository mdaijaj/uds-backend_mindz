import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventManagementRoutingModule } from './event-management-routing.module';
import { EventManagementComponent } from './event-management.component';


@NgModule({
  declarations: [
    EventManagementComponent
  ],
  imports: [
    CommonModule,
    EventManagementRoutingModule
  ]
})
export class EventManagementModule { }
