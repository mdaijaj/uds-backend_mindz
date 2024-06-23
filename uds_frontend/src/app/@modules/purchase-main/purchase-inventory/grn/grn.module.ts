import { NgModule } from '@angular/core';

import { GrnReportComponent } from './grn-report/grn-report.component';
import { GrnReportActionComponent } from './grn-report-action/grn-report-action.component';
import { GenrateGrnComponent } from './genrate-grn/genrate-grn.component';
import { CommonModule } from '@angular/common';
import { GRNRoutingModule } from './grn-report-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { PoListDetailsComponent } from './po-list-details/po-list-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CKEditorModule } from 'ckeditor4-angular';
import { AssignUserModule } from 'src/app/@modules/crm/assign-user/assign-user.module';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { PoActionComponent } from './po-action/po-action.component';



@NgModule({
  declarations: [
    GrnReportComponent,
    GrnReportActionComponent,
    GenrateGrnComponent,
    PoListDetailsComponent,
    PoActionComponent
  ],
  imports: [
    CommonModule,
    GRNRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    ShairedModule,
    CKEditorModule,
    AssignUserModule,
  ]
})
export class GrnModule { }
