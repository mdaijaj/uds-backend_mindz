import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestCompliantComponent } from './request-compliant.component';

const routes: Routes = [
  { path: "", component: RequestCompliantComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestCompliantRoutingModule { }
