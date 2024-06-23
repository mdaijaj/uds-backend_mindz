import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteOfficeComplainListRoutingModule } from './remote-office-complain-list-routing.module';
import { RemoteOfficeComplainListComponent } from './remote-office-complain-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ComplainActionComponent } from './complain-action/complain-action.component';
import { ComplainDailogComponent } from './complain-dailog/complain-dailog.component';


@NgModule({
  declarations: [
    RemoteOfficeComplainListComponent,
    ComplainActionComponent,
    ComplainDailogComponent
  ],
  imports: [
    CommonModule,
    RemoteOfficeComplainListRoutingModule,
    AgGridModule,
    MaterialModule
  ]
})
export class RemoteOfficeComplainListModule { }
