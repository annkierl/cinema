export interface LoginData {
  accessToken: string;
  user: {
    role: string;
    id: number;
  };
}

export interface UserState {
  type: string;
  id: number;
  password: '';
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
}
