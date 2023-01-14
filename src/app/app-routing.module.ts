import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartFormComponent } from './chart-form/chart-form.component';
import { ChartFormResolver } from './chart-form/chart-form.resolver';
import { ErrorComponent } from './error/error.component';
import { GlobalVariable } from './shared/global-property';

const routes: Routes = [
  {
    path: '',
    component: ChartFormComponent,
    resolve: { chartData: ChartFormResolver },
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
