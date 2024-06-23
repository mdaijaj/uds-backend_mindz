import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationalmasterRoutingModule } from './configurationalmaster-routing.module';
import { ConfigurationalmasterComponent } from './configurationalmaster.component';

import { CountrymasterComponent } from './countrymaster/countrymaster.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { StatemasterComponent } from './statemaster/statemaster.component';
import { QuotationCurrencyComponent } from './quotation-currency/quotation-currency.component';
import { VendorTypeComponent } from './vendor-type/vendor-type.component';
import { PricemappingComponent } from './pricemapping/pricemapping.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HrmsModule } from '../../hrms/hrms.module';
import { TicketManagementModule } from '../ticket-management/ticket-management.module';


@NgModule({
  declarations: [
    ConfigurationalmasterComponent,
    CountrymasterComponent,
    StatemasterComponent,
    // CitymasterComponent,
    // PincodeComponent,
    QuotationCurrencyComponent,
    // AccrediationLogoDetailsComponent,
    // EacodeComponent,
    // CertificateComponent,
    // GlobalsalesmanagerComponent,
    VendorTypeComponent,
    PricemappingComponent,
    // ServiceCategoryComponent,
  

  ],
  imports: [
    CommonModule,
    ConfigurationalmasterRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    HrmsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    ShairedModule,
    TicketManagementModule
  ]
})
export class ConfigurationalmasterModule { }
