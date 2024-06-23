import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssestManagementSubComponent } from './assest-management-sub.component';

const routes: Routes = [
  {path:'',component:AssestManagementSubComponent},

  {
    path: 'email-creation-list',
    loadChildren: () => import('./email-cration-list/email-cration-list.module').then(m => m.EmailCrationListModule),
  },

  {
    path: 'product-asset-master',
    loadChildren: () => import('./product-master/product-master.module').then(m => m.ProductMasterModule),
  },

  {
    path: 'email-request-update',
    loadChildren: () => import('./email-request-update/email-request-update.module').then(m => m.EmailRequestUpdateModule),
  },

  {
    path: 'product-asset-update',
    loadChildren: () => import('./product-asset-update/product-asset-update.module').then(m => m.ProductAssetUpdateModule),
  },

  {
    path: 'add-product-asset',
    loadChildren: () => import('./add-product-asset/add-product-asset.module').then(m => m.AddProductAssetModule),
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssestManagementSubRoutingModule { }
