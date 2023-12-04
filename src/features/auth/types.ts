export type UserCredentials = {
  email?: string;
  password?: string;
  nickName?: string;
};

export type User = {
  firstName: string;
  lastName: string;
  initials: string;
};

export type NewUser = User & UserCredentials;

export type AuthError = {
  code: string;
  message: string;
  errors: AuthErrors[];
};
export type AuthErrors = {
  domain: string;
  message: string;
  reason: string;
};
