import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { OverviewComponent } from './pages/overview/overview.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'overview'},
  {path: 'overview', component: OverviewComponent},
  {path: 'details/:ID', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
