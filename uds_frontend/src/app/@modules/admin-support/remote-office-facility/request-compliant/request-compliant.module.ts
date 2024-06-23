import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestCompliantRoutingModule } from './request-compliant-routing.module';
import { RequestCompliantComponent } from './request-compliant.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { RemoteComplainActionComponent } from './remote-complain-action/remote-complain-action.component';

@NgModule({
  declarations: [
    RequestCompliantComponent,
    RemoteComplainActionComponent
  ],
  imports: [
    CommonModule,
    RequestCompliantRoutingModule,
    MaterialModule,
    AgGridModule
  ]
})
export class RequestCompliantModule { }
