import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../material/material.module';

import { HomePage } from './home/home.page';
import { RoomsPage } from './rooms/rooms.page';

import { featureKey } from './state/pages.selectors';
import { reducers } from './state/pages.reducer';
import { RoomsEffects } from './state/pages.effects';
import { DialogRoomComponent } from './rooms/components/dialog-room/dialog-room.component';

@NgModule({
  declarations: [
    HomePage,
    RoomsPage,
    DialogRoomComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature([RoomsEffects]),
  ]
})
export class PagesModule { }
