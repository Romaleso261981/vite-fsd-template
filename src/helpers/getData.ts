import { User } from '../features/auth/types';

export const getData = (a: any) => {
  const data = a.getDocs() as User;

  return data;
};
