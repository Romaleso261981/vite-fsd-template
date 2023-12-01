export interface IAuth {
  userName: string;
}

export interface UserError {
  login: string | null;
  update: string | null;
  logout: string | null;
}

export type UserCredentials = {
  email: string;
  password: string;
};

export type User = {
  firstName: string;
  phoneNumber: string;
};

export type NewUser = User & UserCredentials;

export type AuthError = {
  code: string;
  message: string;
  id: string;
};

export type UserState = {
  user: null | {} | undefined;
};
export type AuthState = {
  nickName: string;
  loading: boolean;
  error: AuthError;
};
