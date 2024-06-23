import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssestManagementSubRoutingModule } from './assest-management-sub-routing.module';
import { AssestManagementSubComponent } from './assest-management-sub.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';

@NgModule({
  declarations: [
    AssestManagementSubComponent,
  ],
  imports: [
    CommonModule,
    AssestManagementSubRoutingModule,
    MaterialModule
  ]
})
export class AssestManagementSubModule { }
