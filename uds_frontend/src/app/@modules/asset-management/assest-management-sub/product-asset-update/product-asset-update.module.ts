import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductAssetUpdateRoutingModule } from './product-asset-update-routing.module';
import { ProductAssetUpdateComponent } from './product-asset-update.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductAssetUpdateComponent
  ],
  imports: [
    CommonModule,
    ProductAssetUpdateRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ProductAssetUpdateModule { }
