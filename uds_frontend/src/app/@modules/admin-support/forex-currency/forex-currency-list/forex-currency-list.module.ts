import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForexCurrencyListRoutingModule } from './forex-currency-list-routing.module';
import { ForexCurrencyListComponent } from './forex-currency-list.component';
import { TaskOrderListComponent } from './task-order-list/task-order-list.component';
import { FcrRequestedReturnlistComponent } from './fcr-requested-returnlist/fcr-requested-returnlist.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ActionComponent } from './fcr-requested-returnlist/action/action.component';
import { FcrDialogComponent } from './fcr-requested-returnlist/fcr-dialog/fcr-dialog.component';
import { TaskDialogComponent } from './task-order-list/task-dialog/task-dialog.component';
import { TaskActionComponent } from './task-order-list/task-action/task-action.component';
import { RequestwithtoComponent } from './fcr-requested-returnlist/requestwithto/requestwithto.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ActionTaskComponent } from './task-order-list/action/action.component';


@NgModule({
  declarations: [
    ForexCurrencyListComponent,
    TaskOrderListComponent,
    FcrRequestedReturnlistComponent,
    ActionComponent,
    FcrDialogComponent,
    TaskDialogComponent,
    TaskActionComponent,
    RequestwithtoComponent,
    ActionTaskComponent
  ],
  imports: [
    CommonModule,
    ForexCurrencyListRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule, ReactiveFormsModule,
    LeadModule,
    HttpClientModule,
    MatDatepickerModule
  ]
})
export class ForexCurrencyListModule { }
