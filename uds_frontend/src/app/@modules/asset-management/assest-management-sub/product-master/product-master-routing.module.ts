import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CetegoryMasterComponent } from './product-master.component';

const routes: Routes = [
  { path: "", component: CetegoryMasterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMasterRoutingModule { }
