import { createFeatureSelector, createSelector } from '@ngrx/store';
import { loadingFeatureKey, LoadingState } from './loading.reducer';

export const selectLoadingFeature = createFeatureSelector<LoadingState>(loadingFeatureKey);

export const selectLoading = createSelector(selectLoadingFeature, (state: LoadingState): boolean => state[loadingFeatureKey]);

export const selectRemovalProcessing = createSelector(selectLoadingFeature, (state: LoadingState): boolean[] => state.removalProcessing);
