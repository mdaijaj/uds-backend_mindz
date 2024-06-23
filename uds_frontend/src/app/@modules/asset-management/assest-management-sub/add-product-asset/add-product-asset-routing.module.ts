import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductAssetComponent } from './add-product-asset.component';

const routes: Routes = [
  { path: "", component:AddProductAssetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProductAssetRoutingModule { }
