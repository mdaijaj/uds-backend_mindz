import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetListRoutingModule } from './asset-list-routing.module';
import { AssetListComponent } from './asset-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';

import { ActiveStatusComponent } from './active-status/active-status.component';
import { ActionComponent } from './action/action.component';
import { AssetDialogComponent } from './asset-dialog/asset-dialog.component';

@NgModule({
  declarations: [
    AssetListComponent,
    ActionComponent,
    ActiveStatusComponent,
    AssetDialogComponent

  ],
  imports: [
    CommonModule,
    AssetListRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AssetListModule { }
