import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ScheduledInstallRoutingModule } from './scheduled-install-routing.module';
import { ScheduledInstalledComponent } from './scheduled-installed/scheduled-installed.component';
import { ScheduledInstallComponent } from './scheduled-install.component';
import { ScheduleInstallListingComponent } from './scheduled-install-listing/scheduled-install-listing.component';
import { ScheduledInstallDialog } from './scheduled-install-dialog/scheduled-install-dialog.component';
import { ActionComponent  } from './scheduled-install-listing/action/action.component';
@NgModule({
  declarations: [
    ScheduledInstallComponent,
    ScheduledInstalledComponent,
    ScheduleInstallListingComponent,
    ScheduledInstallDialog,
    ActionComponent
  ],
  imports: [
    CommonModule,
    ScheduledInstallRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ScheduledInstallModule { }
