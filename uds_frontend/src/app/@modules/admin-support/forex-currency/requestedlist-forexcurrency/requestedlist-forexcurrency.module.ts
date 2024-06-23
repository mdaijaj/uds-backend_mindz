import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestedlistForexcurrencyRoutingModule } from './requestedlist-forexcurrency-routing.module';

import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ForexActionComponent } from './forex-action/forex-action.component';
import { RequestDailogComponent } from './request-dailog/request-dailog.component';

@NgModule({
  declarations: [
    ForexActionComponent,
    RequestDailogComponent
  ],
  imports: [
    CommonModule,
    RequestedlistForexcurrencyRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,ReactiveFormsModule,
    LeadModule,
    HttpClientModule ,
    MatDatepickerModule

  ]
})
export class RequestedlistForexcurrencyModule { }
