import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { MeetingService } from 'src/app/services/meeting.service';

import { Meeting } from 'src/app/entity/meeting-entity';

import * as actions from './pages.actions';

@Injectable()
export class MeetingsEffects {
  constructor(
    private actions$: Actions,
    private meetingService: MeetingService
  ) {}

  listAllMeetings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.listAllMeetings),
      mergeMap(() => this.meetingService.listAllMeeting()),
      catchError((error, caught$) => {
        actions.error({ error });
        return caught$;
      }),
      map((response: Meeting[]) => actions.listMeetingConcluded({ response }))
    )
  );

  listByDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.listByDate),
      mergeMap(({ query }) => this.meetingService.ListMeetingByDate(query)),
      catchError((error, caught$) => {
        actions.error({ error });
        return caught$;
      }),
      switchMap((response: Meeting[]) =>
      [
        response.length !== 0
          ? actions.listMeetingConcluded({ response })
          : actions.responseStatusConcluded({ status: { message: 'No results found', failed: true } })
      ]),
    )
  );

  createMeeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createMeeting),
      mergeMap(({ meeting }) => this.meetingService.createMeeting(meeting)),
      catchError((error, caught$) => {
        actions.error({ error });
        return caught$;
      }),
      map((status: any) => actions.responseStatusConcluded({ status }))
    )
  );

  editMeetingDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.editMeetingDetails),
      mergeMap(({ meeting }) => this.meetingService.updateMeeting(meeting)),
      catchError((error, caught$) => {
        actions.error({ error });
        return caught$;
      }),
      map((status: any) => actions.responseStatusConcluded({ status }))
    )
  );

  deleteMeeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteMeeting),
      mergeMap(({ id }) => this.meetingService.deleteMeeting(id)),
      catchError((error, caught$) => {
        actions.error({ error });
        return caught$;
      }),
      map((status: any) => actions.responseStatusConcluded({ status }))
    )
  );

  responseStatusConcluded$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.responseStatusConcluded),
    mergeMap(async () => actions.listAllMeetings())
  ));
}
