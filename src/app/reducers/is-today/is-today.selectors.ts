import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isTodayFeatureKey, IsTodayState } from './is-today.reducer';

export const selectIsTodayFeature = createFeatureSelector<IsTodayState>(isTodayFeatureKey);

export const selectIsToday = createSelector(selectIsTodayFeature, (state: IsTodayState): boolean => state[isTodayFeatureKey]);
