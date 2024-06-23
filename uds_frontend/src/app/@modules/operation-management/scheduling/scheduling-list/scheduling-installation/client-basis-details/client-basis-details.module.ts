import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientBasisDetailsRoutingModule } from './client-basis-details-routing.module';
import { ClientBasisDetailsActionComponent } from './client-basis-details-action/client-basis-details-action.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AllocationFormDialogueComponent } from './allocation-form-dialogue/allocation-form-dialogue.component';


@NgModule({
  declarations: [
    ClientBasisDetailsActionComponent,
    AllocationFormDialogueComponent
  ],
  imports: [
    CommonModule,
    ClientBasisDetailsRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientBasisDetailsModule { }
