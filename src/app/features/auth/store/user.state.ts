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
