import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectionLoaderComponent } from './redirection-loader.component';

const routes: Routes = [
  { path: "", component: RedirectionLoaderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedirectionLoaderRoutingModule { }

