import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ErrorRoutingModule } from './error-routing/error-routing.module';
import { MainComponent } from './main/main.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { DashboardviewComponent } from './dashboardview/dashboardview.component';
import { Fdc3playgroundComponent } from './fdc3playground/fdc3playground.component';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' }, { path: 'main', component: MainComponent, data: { text: 'main' } },
  { path: 'dashboards', component: DashboardsComponent, data: { text: 'dashboards' } },
  { path: 'dashboardview', component: DashboardviewComponent, data: { text: 'dashboardview' } },
  { path: 'dashboardview/:id', component: DashboardviewComponent, data: { text: 'dashboardview' } },
  { path: 'fdc3playground', component: Fdc3playgroundComponent, data: { text: 'fdc3playground' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorRoutingModule],
  exports: [RouterModule, ErrorRoutingModule]
})
export class AppRoutingModule {
}
