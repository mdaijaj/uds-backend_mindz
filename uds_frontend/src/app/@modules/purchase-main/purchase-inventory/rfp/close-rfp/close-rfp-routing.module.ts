import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloseRfpComponent } from './close-rfp.component';
import { QuotationDetailsComponent } from '../live-rfp/quotation-details/quotation-details.component';

const routes: Routes = [
  { path: "", component: CloseRfpComponent},
  { path:"quotation-details",component:QuotationDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloseRfpRoutingModule { }
