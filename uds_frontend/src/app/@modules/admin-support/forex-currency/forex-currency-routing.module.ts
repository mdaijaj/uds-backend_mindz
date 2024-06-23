import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForexCurrencyComponent } from './forex-currency.component';
import { ApprovalFormComponent } from './approval-form/approval-form.component';
import { ForexAdminFormComponent } from './forex-admin-form/forex-admin-form.component';
import { ForexCurrencyRateComponent } from './forex-currency-rate/forex-currency-rate.component';
import { ReturnForexCurrencyComponent } from './return-forex-currency/return-forex-currency.component';
import { ForexRequestLaterComponent } from './forex-request-later/forex-request-later.component';
import { ReturnLaterComponent } from './return-later/return-later.component';

const routes: Routes = [
  { path: "", component: ForexCurrencyComponent },
{
  path: 'forex-currency-list',
  loadChildren: () =>
    import('./forex-currency-list/forex-currency-list.module').then((m) => m.ForexCurrencyListModule), 
},
{
  path: 'req-list',
  loadChildren: () =>
  import('./requestedlist-forexcurrency/requestedlist-forexcurrency.module').then((m)=> m.RequestedlistForexcurrencyModule)
},

{ path: "forex_currency_approval", component: ApprovalFormComponent },
{
  path: 'req-list-admin',
  loadChildren: () =>
  import('./forex-currency-admin/forex-currency-admin.module').then((m)=> m.ForexCurrencyAdminModule)
},
{ path: "update-forex_currency", component: ForexAdminFormComponent },
{ path: "forex_currency-rate", component: ForexCurrencyRateComponent },
{ path: "forex-currency-request-later", component: ForexRequestLaterComponent },
{ path: "return-forex_currency", component: ReturnForexCurrencyComponent },
{ path: "request-forex_currency-latter", component: ForexRequestLaterComponent },
{ path: "return_letter", component: ReturnLaterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForexCurrencyRoutingModule { }
