import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteOfficeFacilityComponent } from './remote-office-facility.component';

const routes: Routes = [
  { path: "", component:RemoteOfficeFacilityComponent},
  {
    path: 'remote-office-facility-list',
    loadChildren: () =>
      import('./remote-office-facility-list/remote-office-facility-list.module').then((m) => m.RemoteOfficeFacilityListModule), 
  },
  {
    path: 'request-complaints-list',
    loadChildren: () =>
      import('./request-compliant/request-compliant.module').then((m) => m.RequestCompliantModule), 
  },
  {
    path: 'remote-office-complaints-list',
    loadChildren: () =>
      import('./remote-office-complain-list/remote-office-complain-list.module').then((m) => m.RemoteOfficeComplainListModule), 
  },

  {
    path: 'create-remote-office',
    loadChildren: () =>
      import('./create-remote-office/create-remote-office.module').then((m) => m.CreateRemoteOfficeModule), 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteOfficeFacilityRoutingModule { }
