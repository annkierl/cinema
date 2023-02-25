export interface User {
  id: number;
  password: '';
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
}

export const InitialUserData: User = {
  id: 0,
  password: '',
  firstName: '',
  lastName: '',
  phone: 0,
  email: '',
};
