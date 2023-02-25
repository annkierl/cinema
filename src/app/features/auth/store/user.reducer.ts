import { createReducer, on } from '@ngrx/store';
import { userActions } from './user.action';
import { initialUserState } from './user.state';

export const userReducer = createReducer(
  initialUserState,
  on(userActions.changeRole, (state, { type, id }) => ({
    ...state,
    role: type,
    id: id,
  }))
);
