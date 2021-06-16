import { createFeatureSelector, createSelector } from '@ngrx/store';
import { addErrorFeatureKey, AddErrorState } from './add-error.reducer';

export const selectAddErrorFeature = createFeatureSelector<AddErrorState>(addErrorFeatureKey);

export const selectAddError = createSelector(selectAddErrorFeature, (state: AddErrorState): boolean => state[addErrorFeatureKey]);
