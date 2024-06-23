import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@auth/auth-material/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('../app/@auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'redirecting',
    loadChildren: () =>
      import('../app/redirection-loader/redirection-loader.module').then((m) => m.RedirectionLoaderModule),
  },
  

  {
    path: 'master',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/@modules/master.module').then((m) => m.MasterModule),
  },
  {
    path: 'request-form',
    loadChildren: () =>
      import('../app/request/request.module').then((m) => m.RequestModule),
  },

  {
    path: 'send-rfp-link',
    loadChildren: () =>
      import('../app/send-rfp/send-rfp.module').then((m) => m.SendRfpModule),
  },

  {
    path: 'advance-planning',
    loadChildren: () =>
      import(
        './@modules/lead/existing-customer/advance-planning/advance-planning.module'
      ).then((m) => m.AdvancePlanningModule),
  },
  {
    path: 'suspection',
    loadChildren: () =>
      import(
        './@modules/lead/existing-customer/suspection/suspection.module'
      ).then((m) => m.SuspectionModule),
  },
  {
    path: 'withdrawal',
    loadChildren: () =>
      import(
        './@modules/lead/existing-customer/withdrawal/withdrawal.module'
      ).then((m) => m.WithdrawalModule),
  },
  {
    path: 'customer-type',
    loadChildren: () =>
      import(
        './@modules/itticketing/configurationalmaster/customer-type/customer-type.module'
      ).then((m) => m.CustomerTypeModule),
  },
  {
    path: 'training-name',
    loadChildren: () =>
      import(
        './@modules/itticketing/configurationalmaster/training-name/training-name.module'
      ).then((m) => m.TrainingNameModule),
  },
  {
    path: 'level-slab',
    loadChildren: () =>
      import(
        './@modules/itticketing/configurationalmaster/level-slab/level-slab.module'
      ).then((m) => m.LevelSlabModule),
  },
  {
    path: 'pricing-level',
    loadChildren: () =>
      import(
        './@modules/itticketing/configurationalmaster/pricing-level/pricing-level.module'
      ).then((m) => m.PricingLevelModule),
  },

  {
    path: 'receive-response',
    loadChildren: () =>
      import('./answering-form/answering-form.module').then(
        (m) => m.AnsweringFormModule
      ),
  },

  {
    path: 'response-confirmation',
    loadChildren: () =>
      import('./branching-form/branching-form.module').then(
        (m) => m.BranchingFormModule
      ),
  },

  {
    path: 'send-vendor',
    loadChildren: () =>
      import('./send-link-vendor/send-link-vendor.module').then(
        (m) => m.SendLinkVendorModule
      ),
  },
  {
    path: 'training-material',
    loadChildren: () =>
      import(
        './@modules/audit/pre-audit/training-material/training-material.module'
      ).then((m) => m.TrainingMaterialModule),
  },
  {
    path: 'training--result',
    loadChildren: () =>
      import(
        './@modules/audit/pre-audit/training-result/training-result.module'
      ).then((m) => m.TrainingResultModule),
  },

  {
    path: 'new-employee-form',
    loadChildren: () =>
      import('./new-employee-form/new-employee-form.module').then(
        (m) => m.NewEmployeeFormModule
      ),
  },
  {
    path: 'open-house-training',
    loadChildren: () =>
      import('../app/registration/registration.module').then((m) => m.RegistrationModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
