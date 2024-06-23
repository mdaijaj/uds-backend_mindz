import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectionLoaderComponent } from './redirection-loader.component';
import { RedirectionLoaderRoutingModule } from './redirection-loader-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../@shared/material/material.module';


@NgModule({
  declarations: [
    RedirectionLoaderComponent
  ],
  imports: [
    CommonModule,
    RedirectionLoaderRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class RedirectionLoaderModule { }
