import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteOfficeFacilityListRoutingModule } from './remote-office-facility-list-routing.module';
import { RemoteOfficeFacilityListComponent } from './remote-office-facility-list.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { RemoteOfficeActionComponent } from './remote-office-action/remote-office-action.component';
import { RemoteOfficeDailogComponent } from './remote-office-dailog/remote-office-dailog.component';

@NgModule({
  declarations: [
    RemoteOfficeFacilityListComponent,
    RemoteOfficeActionComponent,
    RemoteOfficeDailogComponent,
  ],
  imports: [
    CommonModule,
    RemoteOfficeFacilityListRoutingModule,
    MaterialModule,
    FormsModule,
    AgGridModule
  ]
})
export class RemoteOfficeFacilityListModule { }
