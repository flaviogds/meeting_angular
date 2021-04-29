import { createAction, props } from '@ngrx/store';
import { Rooms } from 'src/app/entity/room-entity';

export const listAllRooms = createAction(
    '[Rooms] List All Rooms',
);

export const findById = createAction(
    '[Rooms] Find By Id',
    props<{ id: string }>()
);

export const findByDate = createAction(
    '[Rooms] Find By Date',
    props<{ date: string }>()
);

export const createMeeting = createAction(
    '[Rooms] Create Room',
    props<{ room: Rooms }>()
);

export const editMeetingDetails = createAction(
    '[Rooms] Edit Room',
    props<{ room: Rooms }>()
);

export const deleteMeeting = createAction(
    '[Rooms] Delete Room ',
    props<{ id: string }>()
);

export const listAllRoomsConcluded = createAction(
    '[Room Service] List All Rooms Concluded',
    props<{ response: Rooms[] }>()
);

export const findByIdOrDateConcluded = createAction(
    '[Room Service] Find By Id Or Date Concluded',
    props<{ room: Rooms }>()
);