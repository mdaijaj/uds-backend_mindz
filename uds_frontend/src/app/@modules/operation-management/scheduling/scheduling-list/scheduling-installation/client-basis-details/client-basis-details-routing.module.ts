import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientBasisDetailsComponent } from './client-basis-details.component';

const routes: Routes = [
  {
  path: '',
  component: ClientBasisDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientBasisDetailsRoutingModule { }
