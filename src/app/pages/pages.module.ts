import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../material/material.module';

import { HomePage } from './home/home.page';
import { MeetingsPage } from './meetings/meeting.page';

import { DialogMeetingComponent } from './meetings/components/dialog-meeting/dialog-meeting.component';
import { TableMeetingComponent } from './meetings/components/table-meetings/table-meetings.component';

import { featureKey } from './state/pages.selectors';
import { reducers } from './state/pages.reducer';
import { MeetingsEffects } from './state/pages.effects';
import { SearchComponent } from './meetings/components/search-meeting/search-meeting.component';

@NgModule({
  declarations: [
    HomePage,
    MeetingsPage,
    DialogMeetingComponent,
    TableMeetingComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature([MeetingsEffects]),
  ]
})
export class PagesModule { }
