import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoomsService } from 'src/app/services/rooms.service';
import { createMeeting } from './pages.actions';

@Injectable()
export class RoomsEffects{

    constructor(
        private actions$: Actions,
        private roomService: RoomsService
    ){}

    createMeeting$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(createMeeting),
                mergeMap(({ room }) =>
                    this.roomService.createRoom('room', room)),
                catchError((err, caught$) => {
                    return caught$;
                }),
                map((response: any) => {
                    return response;
                }),
            ),
    );
}
