import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailListRequestComponent } from './email-list-request/email-list-request.component';

const routes: Routes = [
  {path:'',component:EmailListRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailCrationListRoutingModule { }
