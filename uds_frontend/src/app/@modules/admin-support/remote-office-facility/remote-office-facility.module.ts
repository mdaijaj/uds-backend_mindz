import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteOfficeFacilityRoutingModule } from './remote-office-facility-routing.module';
import { RemoteOfficeFacilityComponent } from './remote-office-facility.component';


@NgModule({
  declarations: [
    RemoteOfficeFacilityComponent
  ],
  imports: [
    CommonModule,
    RemoteOfficeFacilityRoutingModule
  ]
})
export class RemoteOfficeFacilityModule { }
