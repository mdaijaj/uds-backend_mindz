import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRequestUpdateRoutingModule } from './email-request-update-routing.module';
import { EmailRequestUpdateComponent } from './email-request-update.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmailRequestUpdateComponent
  ],
  imports: [
    CommonModule,
    EmailRequestUpdateRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class EmailRequestUpdateModule { }
