import { Action, createReducer, on } from '@ngrx/store';
import { setIsToday } from './is-today.actions';


export const isTodayFeatureKey = 'isToday';

export interface IsTodayState {
  [isTodayFeatureKey]: boolean;
}

export const initialState: IsTodayState = {
  [isTodayFeatureKey]: false
};


export const isTodayReducer = createReducer(
  initialState,
  on(setIsToday, (state, { payload }) => ({ ...state, [isTodayFeatureKey]: payload }))
);

