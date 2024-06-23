import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulingListComponent } from './scheduling-list.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulingListComponent,
    children: [
      {
        path: '',
        redirectTo: 'scheduling-installation',
        pathMatch: 'full',
      },
      {
        path: 'scheduling-installation',
        loadChildren: () =>
          import('./scheduling-installation/scheduling-installation.module').then(
            (m) => m.SchedulingInstallationModule
          ),
      },  
    ]
  },
  {
    path: 'scheduling-installation/client-basis-details',
    loadChildren: () =>
      import('../scheduling-list/scheduling-installation/client-basis-details/client-basis-details.module').then(
        (m) => m.ClientBasisDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingListRoutingModule { }
