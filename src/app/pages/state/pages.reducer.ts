import { Action, createReducer, on } from '@ngrx/store';

import * as actions from './pages.actions';

export interface StateModel{
    response: any;
    status: any;
    error: any;
}

export const initialState: StateModel = {
    response: {},
    status: null,
    error: {},
};

const reducer = createReducer(
    initialState,
    on(
        actions.listByDate,
        actions.listAllMeetings,
        actions.createMeeting,
        actions.editMeetingDetails,
        actions.deleteMeeting,
        state => ({ ...state })
    ),
    on(
        actions.listMeetingConcluded,
        (state, response) => ({ ...state, ...response })
    ),
    on(
        actions.responseStatusConcluded,
        (state, status) => ({ ...state, ...status })
    ),
    on(
        actions.error,
        (state, error) => ({ ...state, ...error })

    ),
);

export function reducers(state: StateModel | undefined, action: Action): StateModel{
    return reducer(state, action);
}
