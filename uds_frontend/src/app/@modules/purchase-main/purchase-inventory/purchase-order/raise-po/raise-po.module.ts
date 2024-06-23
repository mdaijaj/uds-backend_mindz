import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaisePoComponent } from './raise-po/raise-po.component';
import { RaisePoActionComponent } from './raise-po-action/raise-po-action.component';
import { RaisePORoutingModule } from './raise-po-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { PofromprCreateComponent } from './pofrompr-create/pofrompr-create.component';



@NgModule({
  declarations: [
    RaisePoComponent,
    RaisePoActionComponent,
    PofromprCreateComponent
  ],
  imports: [
    CommonModule,
    RaisePORoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RaisePoModule { }
