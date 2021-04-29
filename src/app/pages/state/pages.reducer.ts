import { Action, createReducer, on } from '@ngrx/store';

import * as actions from './pages.actions';

export interface StateModel{
    response: any;
}

export const initialState: StateModel = {
    response: {}
};

const reducer = createReducer(
    initialState,
    on(
        actions.listAllRoomsConcluded,
        actions.findByIdOrDateConcluded,
        (state, response) => ({...state, ...response})
    )
);

export function reducers(state: StateModel | undefined, action: Action): StateModel{
    return reducer(state, action);
}
