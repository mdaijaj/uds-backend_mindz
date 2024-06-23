import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../@shared/material/material.module';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { HrmsModule } from './hrms/hrms.module';
// import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { AllowActionModule } from '../@shared/shaired/allow-action.module';

@NgModule({
  declarations: [
    MasterComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MasterRoutingModule,
    FormsModule,
    HrmsModule,
    HttpClientModule,
    ToastrModule,
    MaterialModule,
    // LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    AllowActionModule
    
  ],
  providers:[
    { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } },

  ]
})
export class MasterModule { }
