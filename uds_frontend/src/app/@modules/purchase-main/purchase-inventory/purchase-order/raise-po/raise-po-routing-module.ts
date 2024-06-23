import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaisePoComponent } from './raise-po/raise-po.component';
import { PofromprCreateComponent } from './pofrompr-create/pofrompr-create.component';

const routes: Routes = [
  { path: "", component: RaisePoComponent},
  { path: "createPoFromPr", component: PofromprCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaisePORoutingModule { }