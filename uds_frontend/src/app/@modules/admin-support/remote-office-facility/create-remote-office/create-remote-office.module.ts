import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRemoteOfficeRoutingModule } from './create-remote-office-routing.module';
import { CreateRemoteOfficeComponent } from './create-remote-office.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateRemoteOfficeComponent
  ],
  imports: [
    CommonModule,
    CreateRemoteOfficeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateRemoteOfficeModule { }
