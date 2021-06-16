import { createAction, props } from '@ngrx/store';

export const setIsToday = createAction(
  '[IsToday] Set IsTodays',
  props<{ payload: boolean }>()
);




