import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulingInstallationRoutingModule } from './scheduling-installation-routing.module';
import { SchedulingInstallationComponent } from './scheduling-installation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ActionComponent } from './action/action.component';
import { ClientBasisDetailsComponent } from './client-basis-details/client-basis-details.component';


@NgModule({
  declarations: [
    SchedulingInstallationComponent,
    ActionComponent,
    ClientBasisDetailsComponent
  ],
  imports: [
    CommonModule,
    SchedulingInstallationRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SchedulingInstallationModule { }
