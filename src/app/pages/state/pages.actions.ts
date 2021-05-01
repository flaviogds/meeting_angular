import { createAction, props } from '@ngrx/store';
import { Meeting } from 'src/app/entity/meeting-entity';

export const listAllMeeting = createAction(
    '[Meeting] List All Meeting',
);

export const findById = createAction(
    '[Meeting] Find By Id',
    props<{ id: string }>()
);

export const findByDate = createAction(
    '[Meeting] Find By Date',
    props<{ date: string }>()
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

export const listAllMeetingConcluded = createAction(
    '[Meeting Service] List All Meeting Concluded',
    props<{ response: Meeting[] }>()
);

export const findByIdOrDateConcluded = createAction(
    '[Meeting Service] Find By Id Or Date Concluded',
    props<{ meeting: Meeting }>()
);