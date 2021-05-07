import { createAction, props } from '@ngrx/store';
import { Meeting } from 'src/app/entity/meeting-entity';

export const listAllMeetings = createAction(
    '[Meeting] List All Meeting',
);

export const listByDate = createAction(
    '[Meeting] List All Meeting',
    props<{ query: any }>()
);

export const createMeeting = createAction(
    '[Meeting] Create Meeting',
    props<{ meeting: Meeting }>()
);

export const editMeetingDetails = createAction(
    '[Meeting] Edit Meeting',
    props<{ meeting: Meeting }>()
);

export const deleteMeeting = createAction(
    '[Meeting] Delete Meeting ',
    props<{ id: string }>()
);

export const error = createAction(
    '[Meeting Service] Error ',
    props<{ error: any }>()
);

export const listMeetingConcluded = createAction(
    '[Meeting Service] List All Meeting Concluded',
    props<{ response: Meeting[] }>()
);

export const responseStatusConcluded = createAction(
    '[Meeting Service] Response Status Concluded',
    props<{ status: any }>()
)
