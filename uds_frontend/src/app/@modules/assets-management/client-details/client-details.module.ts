import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDetailsRoutingModule } from './client-details-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';

import { ActiveStatusComponent } from './active-status/active-status.component';
import { ActionComponent } from './action/action.component';
import { AssetDialogComponent } from './asset-dialog/asset-dialog.component';
import { ClientDetailsComponent } from './client-details.component';

@NgModule({
  declarations: [
    ClientDetailsComponent,
    ActionComponent,
    ActiveStatusComponent,
    AssetDialogComponent

  ],
  imports: [
    CommonModule,
    ClientDetailsRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientDetailsModule { }
