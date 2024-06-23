import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskOrderListComponent } from './task-order-list/task-order-list.component';
import { FcrRequestedReturnlistComponent } from './fcr-requested-returnlist/fcr-requested-returnlist.component';
import { RequestwithtoComponent } from './fcr-requested-returnlist/requestwithto/requestwithto.component';

const routes: Routes = [
  {path:'',redirectTo:'task-order-list',pathMatch:'full'},
  { path: "task-order-list", component:TaskOrderListComponent},
  { path: "fcr-request-return", component:FcrRequestedReturnlistComponent},
  {path:'request-with-to',component:RequestwithtoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class ForexCurrencyListRoutingModule { }
