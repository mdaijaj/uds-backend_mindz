import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAssetUpdateComponent } from './product-asset-update.component';

const routes: Routes = [
  { path: "", component:ProductAssetUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductAssetUpdateRoutingModule { }
