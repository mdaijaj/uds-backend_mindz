import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailCrationListRoutingModule } from './email-cration-list-routing.module';
import { EmailListRequestComponent } from './email-list-request/email-list-request.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { EmailRequestActionComponent } from './email-list-request/email-request-action/email-request-action.component';
import { EmailDilogComponent } from './email-list-request/email-dilog/email-dilog.component';



@NgModule({
  declarations: [
    EmailListRequestComponent,
    EmailRequestActionComponent,
    EmailDilogComponent
  ],
  imports: [
    CommonModule,
    EmailCrationListRoutingModule,
    MaterialModule,
    AgGridModule
  ]
})
export class EmailCrationListModule { }
