import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventManagementListComponent } from './event-management-list.component';

const routes: Routes = [
  { path: "", component: EventManagementListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventManagementListRoutingModule { }
