import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationManagementComponent } from './operation-management.component';

const routes: Routes = [
  {
    path: '', component: OperationManagementComponent,
    children: [
      {
        path: 'scheduling',
        loadChildren: () => import('./scheduling/scheduling.module').then(m => m.SchedulingModule),
      },
      {
        path: 'scheduled-install',
        loadChildren: () => import('./scheduled-install/scheduled-install.module').then(m => m.ScheduledInstallModule),
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationManagementRoutingModule { }
