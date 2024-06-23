import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulingComponent } from './scheduling.component';

const routes: Routes = [
  { path: "", component:SchedulingComponent,
  children:[
    {
    path:'',
    redirectTo: 'scheduling-list',
    pathMatch: 'full',
    },
    {
      path: 'scheduling-list',
      loadChildren: () =>
        import('./scheduling-list/scheduling-list.module').then(
          (m) => m.SchedulingListModule
        ),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingRoutingModule { }
