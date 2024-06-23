import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteOfficeFacilityListComponent } from './remote-office-facility-list.component';

const routes: Routes = [
  { path: "", component: RemoteOfficeFacilityListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteOfficeFacilityListRoutingModule { }
