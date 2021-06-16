import { createAction, props } from '@ngrx/store';

export const setAddError = createAction(
  '[AddError] Is AddErrors',
  props<{ payload: boolean }>()
);




