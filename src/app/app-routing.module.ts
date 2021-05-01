import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const PagesModule = () => import('./pages/pages.module').then(m => m.PagesModule);

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'meetings'}, /* => / */
  { path: '', loadChildren: PagesModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
