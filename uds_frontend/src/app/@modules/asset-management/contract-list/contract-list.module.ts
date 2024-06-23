import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractListRoutingModule } from './contract-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractListComponent } from './contract-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { ActionComponent } from './contract-action/action.component';
import { ContractActionComponent } from './contract-allocation/action/contract-action.component';
import { ContractAllocationComponent } from './contract-allocation/contract-allocation.component';
import { SerialDialogComponent } from './contract-allocation/serial-dialog/serial-dialog.component';
import { BatchDialogComponent } from './contract-allocation/batch-dialog/batch-dialog.component';
import { SerialDialogActionComponent } from './contract-allocation/serial-dialog/serial-dialog-action/serial-dialog-action.component';
import { BatchDialogActionComponent } from './contract-allocation/batch-dialog/batch-dialog-action/batch-dialog-action.component';

@NgModule({
  declarations: [
    ContractListComponent,
    ContractAllocationComponent,
    SerialDialogComponent,
    BatchDialogComponent,
    ActionComponent,
    ContractActionComponent,
    SerialDialogActionComponent,
    BatchDialogActionComponent
  ],
  imports: [
    CommonModule,
    ContractListRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContractListModule { }
