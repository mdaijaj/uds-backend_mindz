import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetManagementComponent } from './assets-management.component';

const routes: Routes = [
  {
    path: '',
    component: AssetManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'asset-list',
        pathMatch: 'full',
      },
      {
        path: 'asset-list',
        loadChildren: () =>
          import('./asset-list/asset-list.module').then(
            (m) => m.AssetListModule
          ),
      },
      {
        path: 'contract-list',
        loadChildren: () =>
          import('./contract-list/contract-list.module').then(
            (m) => m.ContractListModule
          ),
      },
      {
        path: 'client-details',
        loadChildren: () =>
          import('./client-details/client-details.module').then(
            (m) => m.ClientDetailsModule
          ),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetManagementRoutingModule {}
