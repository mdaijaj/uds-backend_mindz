import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledInstalledComponent } from './scheduled-installed/scheduled-installed.component';
import { ScheduleInstallListingComponent } from './scheduled-install-listing/scheduled-install-listing.component';
import { ScheduledInstallComponent } from './scheduled-install.component';

const routes: Routes = [
  {
    path: '', component: ScheduledInstallComponent,
    children: [
      {
        path: '',
        redirectTo: 'scheduled-installed',
        pathMatch: 'full',
      },
      {
        path: 'scheduled-installed',
        component : ScheduledInstalledComponent
      },
      {
        path: 'scheduled-install-listing',
        component: ScheduleInstallListingComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduledInstallRoutingModule { }
