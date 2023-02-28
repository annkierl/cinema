import { createReducer, on } from '@ngrx/store';
import { userActions } from './user.action';
import { InitialStateStore, initialUserState } from './user.state';
let x = localStorage.getItem('role');
export const userReducer = createReducer(
  { id: NaN, role: x },
  on(userActions.changeRole, (state, { role, id }) => ({
    ...state,
    role: role,
    id: id,
  }))
);
