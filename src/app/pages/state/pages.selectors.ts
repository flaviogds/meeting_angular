import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateModel } from './pages.reducer';

export const featureKey = 'pages';

export const selectFeature = createFeatureSelector<StateModel>(featureKey);

export const selectResponse = createSelector(
    selectFeature,
    (state: StateModel) => state.response,
);

export const selectStatus = createSelector(
    selectFeature,
    (state: StateModel) => state.status,
);

export const selectError = createSelector(
    selectFeature,
    (state: StateModel) => state.error,
);
