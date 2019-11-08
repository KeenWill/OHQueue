import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QueuesComponent } from './queue/queues/queues.component';
import { LoginComponent } from './login/login.component';
import { TAGuard } from '../@core/auth/ta.guard';
import { AuthGuard } from '../@core/auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard, TAGuard],
    },
    {
      path: 'queues',
      component: QueuesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: '**',
      redirectTo: 'login',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
