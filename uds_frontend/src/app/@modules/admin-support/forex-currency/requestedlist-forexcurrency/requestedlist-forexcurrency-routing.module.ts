import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestedlistForexcurrencyComponent } from './requestedlist-forexcurrency.component';

const routes: Routes = [
  {path:'', component:RequestedlistForexcurrencyComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestedlistForexcurrencyRoutingModule { }
