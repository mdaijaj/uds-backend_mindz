import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractLocationComponent } from './contract-location.component';

const routes: Routes = [{ path: '', component: ContractLocationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractLocationRoutingModule { }
