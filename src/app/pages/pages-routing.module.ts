import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home/home.page';
import { MeetingsPage } from './meetings/container/meeting.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'meetings', component: MeetingsPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
