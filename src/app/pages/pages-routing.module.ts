import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home/home.page';
import { RoomsPage } from './rooms/rooms.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'rooms', component: RoomsPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
