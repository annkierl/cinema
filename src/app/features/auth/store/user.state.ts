import { UserState } from '../auth.interface';

export const initialUserState: UserState = {
  type: 'visitor',
  id: NaN,
  password: '',
  firstName: '',
  lastName: '',
  phone: 0,
  email: '',
};
export const InitialStateStore: UserStateForStore = {
  role: '',
  id: NaN,
};

export interface UserStateForStore {
  role: string;
  id: number;
}
