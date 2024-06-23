import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetManagementComponent } from './asset-management.component';

const routes: Routes = [
  {
    path: '', component: AssetManagementComponent,
    children: [

      // {
      //   path: '', redirectTo: 'assest-management-sub', pathMatch: 'full'
      // },
      {
        path: 'assest-management-sub',
        loadChildren: () => import('./assest-management-sub/assest-management-sub.module').then(m => m.AssestManagementSubModule),
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetManagementRoutingModule { }
