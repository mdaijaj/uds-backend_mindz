import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UomListComponent } from './uom-list/uom-list.component';

const routes: Routes = [
  {path: '', component: UomListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UomRoutingModule { }
