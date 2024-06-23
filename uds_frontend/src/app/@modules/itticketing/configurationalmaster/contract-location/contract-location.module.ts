import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractLocationRoutingModule } from './contract-location-routing.module';
import { ContractLocationComponent } from './contract-location.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { ContractLocationDialogComponent } from './contract-location-dialog/contract-location-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectFilterModule } from 'mat-select-filter';
import { ContractLocationActionComponent } from './contract-location-action/contract-location-action.component';
import { ContractLocationActionStatusComponent } from './contract-location-action/contract-location-action-status/contract-location-action-status.component';

@NgModule({
  declarations: [
    ContractLocationComponent,
    ContractLocationActionComponent,
    ContractLocationDialogComponent,
    ContractLocationActionStatusComponent
  ],
  imports: [
    CommonModule,
    ContractLocationRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatSelectFilterModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class ContractLocationModule { }
