import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventManagementComponent } from './event-management.component';

const routes: Routes = [
  { path: "", component:EventManagementComponent},
  {
    path: 'event-management-list',
    loadChildren: () =>
      import('./event-management-list/event-management-list.module').then((m) => m.EventManagementListModule), 
  },

  {
    path: 'for-admin-event-management',
    loadChildren: () =>
      import('./for-admin-event-management-list/for-admin-event-management-list.module').then((m) => m.ForAdminEventManagementListModule), 
  },

  {
    path: 'create-event-management',
    loadChildren: () =>
      import('./create-event/create-event.module').then((m) => m.CreateEventModule), 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventManagementRoutingModule { }
