import { Action, createReducer, on } from '@ngrx/store';
import { setAddError } from './add-error.actions';


export const addErrorFeatureKey = 'addError';

export interface AddErrorState {
  [addErrorFeatureKey]: boolean;
}

export const initialState: AddErrorState = {
  [addErrorFeatureKey]: false
};


export const addErrorReducer = createReducer(
  initialState,
  on(setAddError, (state, { payload }) => ({ ...state, [addErrorFeatureKey]: payload }))
);

