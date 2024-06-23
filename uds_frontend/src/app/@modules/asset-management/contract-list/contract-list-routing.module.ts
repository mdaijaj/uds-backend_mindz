import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractListComponent } from './contract-list.component';
import { ContractAllocationComponent } from './contract-allocation/contract-allocation.component';

const routes: Routes = [
  { path: "", component: ContractListComponent},
  {
    path: 'contract-allocation',
    component: ContractAllocationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractListRoutingModule { }
