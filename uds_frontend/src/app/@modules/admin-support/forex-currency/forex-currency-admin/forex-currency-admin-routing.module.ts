import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForexCurrencyAdminComponent } from './forex-currency-admin.component';

const routes: Routes = [
  { path: "", component:ForexCurrencyAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForexCurrencyAdminRoutingModule { }
