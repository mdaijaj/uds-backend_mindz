import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ForexCurrencyRoutingModule } from './forex-currency-routing.module';
import { ForexCurrencyComponent } from './forex-currency.component';
import { RequestedlistForexcurrencyComponent } from './requestedlist-forexcurrency/requestedlist-forexcurrency.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { ApprovalFormComponent } from './approval-form/approval-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForexAdminFormComponent } from './forex-admin-form/forex-admin-form.component';
import { ForexCurrencyRateComponent } from './forex-currency-rate/forex-currency-rate.component';
import { ReturnForexCurrencyComponent } from './return-forex-currency/return-forex-currency.component';
import { ForexRequestLaterComponent } from './forex-request-later/forex-request-later.component';
import { ReturnLaterComponent } from './return-later/return-later.component';
@NgModule({
  declarations: [
    ForexCurrencyComponent,
    RequestedlistForexcurrencyComponent,
    ApprovalFormComponent,
    ForexAdminFormComponent,
    ForexCurrencyRateComponent,
    ReturnForexCurrencyComponent,
    ForexRequestLaterComponent,
    ReturnLaterComponent,
  ],
  imports: [
    CommonModule,
    ForexCurrencyRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ForexCurrencyModule { }
