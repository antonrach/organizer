import { createReducer, on } from '@ngrx/store';
import { setLoading, setRemovalProcessing } from './loading.actions';


export const loadingFeatureKey = 'loading';

export interface LoadingState {
  [loadingFeatureKey]: boolean;
  removalProcessing: boolean[];
}

export const initialState: LoadingState = {
  [loadingFeatureKey]: false,
  removalProcessing: []
};


export const loadingReducer = createReducer(
  initialState,
  on(setLoading, (state, { payload }) => ({ ...state, [loadingFeatureKey]: payload })),
  on(setRemovalProcessing, (state, { payload }) => ({ ...state, removalProcessing: payload }))
);

