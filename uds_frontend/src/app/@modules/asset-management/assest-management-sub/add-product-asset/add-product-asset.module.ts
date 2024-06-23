import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductAssetRoutingModule } from './add-product-asset-routing.module';
import { AddProductAssetComponent } from './add-product-asset.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { AddProductActionComponent } from './add-product-action/add-product-action.component';


@NgModule({
  declarations: [
    AddProductAssetComponent,
    AddProductActionComponent
  ],
  imports: [
    CommonModule,
    AddProductAssetRoutingModule,
    MaterialModule,
    AgGridModule
  ]
})
export class AddProductAssetModule { }
