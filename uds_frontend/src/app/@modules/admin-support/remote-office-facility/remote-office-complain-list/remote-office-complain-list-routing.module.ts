import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteOfficeComplainListComponent } from './remote-office-complain-list.component';

const routes: Routes = [
  { path: "", component: RemoteOfficeComplainListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteOfficeComplainListRoutingModule { }
