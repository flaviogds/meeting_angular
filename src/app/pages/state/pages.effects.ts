import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MeetingService } from 'src/app/services/meeting.service';
import { createMeeting } from './pages.actions';

@Injectable()
export class MeetingsEffects{

    constructor(
        private actions$: Actions,
        private meetingService: MeetingService
    ){}

    createMeeting$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(createMeeting),
                mergeMap(({ meeting }) =>
                    this.meetingService.createMeeting(meeting)),
                catchError((err, caught$) => {
                    return caught$;
                }),
                map((response: any) => {
                    return response;
                }),
            ),
    );
}
