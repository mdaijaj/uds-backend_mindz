import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductMasterRoutingModule } from './product-master-routing.module';
import { CetegoryMasterComponent } from './product-master.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { ProductActionComponent } from './product-action/product-action.component';
import { ProductDilogComponent } from './product-dilog/product-dilog.component';

@NgModule({
  declarations: [
    CetegoryMasterComponent,
    ProductActionComponent,
    ProductDilogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AgGridModule,
    ProductMasterRoutingModule
  ]
})
export class ProductMasterModule { }
