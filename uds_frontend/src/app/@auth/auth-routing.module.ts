import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChattingComponent } from './chatting/chatting.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'',redirectTo:"login",pathMatch:"full"},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'login/forgot-password',component:ForgotPasswordComponent,pathMatch:'full'},
  {path:'chatting',component:ChattingComponent,pathMatch:'full'},
  {path:'**',redirectTo:"login",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
