import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulingInstallationComponent } from './scheduling-installation.component';
import { ClientBasisDetailsComponent } from './client-basis-details/client-basis-details.component';

const routes: Routes = [
  { path: "", component: SchedulingInstallationComponent },
  // { path: "client-basis-details", component: ClientBasisDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingInstallationRoutingModule { }
