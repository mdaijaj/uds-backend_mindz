import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRemoteOfficeComponent } from './create-remote-office.component';

const routes: Routes = [
  { path: "", component: CreateRemoteOfficeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRemoteOfficeRoutingModule { }
