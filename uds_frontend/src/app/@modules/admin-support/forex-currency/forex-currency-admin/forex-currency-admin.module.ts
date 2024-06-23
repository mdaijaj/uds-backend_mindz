import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForexCurrencyAdminRoutingModule } from './forex-currency-admin-routing.module';
import { ForexCurrencyAdminComponent } from './forex-currency-admin.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ForexAdminActionComponent } from './forex-admin-action/forex-admin-action.component';
import { ForexAdminDailogComponent } from './forex-admin-dailog/forex-admin-dailog.component'

@NgModule({
  declarations: [
    ForexCurrencyAdminComponent,
    ForexAdminActionComponent,
    ForexAdminDailogComponent
  ],
  imports: [
    CommonModule,
    ForexCurrencyAdminRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ForexCurrencyAdminModule { }
