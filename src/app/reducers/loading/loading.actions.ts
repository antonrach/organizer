import { createAction, props } from '@ngrx/store';

export const setLoading = createAction(
  '[Loading] Loading Loadings',
  props<{ payload: boolean }>()
);

export const setRemovalProcessing = createAction(
  '[Loading] Set Removal Processing]',
  props<{ payload: boolean[] }>()
);
