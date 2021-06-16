import {  ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { addErrorFeatureKey, addErrorReducer, AddErrorState } from './addError/add-error.reducer';
import { isTodayFeatureKey, isTodayReducer, IsTodayState } from './is-today/is-today.reducer';
import { LoadingState, loadingReducer, loadingFeatureKey } from './loading/loading.reducer';


export const appFeatureKey = 'app';

export interface State {
  [loadingFeatureKey]: LoadingState;
  [addErrorFeatureKey]: AddErrorState;
  [isTodayFeatureKey]: IsTodayState;
}

export const reducers: ActionReducerMap<State> = {
  [loadingFeatureKey]: loadingReducer,
  [addErrorFeatureKey]: addErrorReducer,
  [isTodayFeatureKey]: isTodayReducer
};

