import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { SchedulingRoutingModule } from './scheduling-routing.module';
import { SchedulingComponent } from './scheduling.component';

@NgModule({
  declarations: [
    SchedulingComponent,
  ],
  imports: [
    CommonModule,
    SchedulingRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SchedulingModule { }
