export type UserCredentials = {
  nickName?: string;
};
export type UserRequest = {
  code?: string;
  message?: string;
  user?: User;
};
export type UserReq = {
  code?: string;
  message?: string;
  user?: User;
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

export type User = {
  nickName: string;
  password: string;
};
