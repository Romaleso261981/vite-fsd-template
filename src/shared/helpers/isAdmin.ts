import { User } from '../types/Types';

export const isAdmin = (data: User | null) => {
  if (data) {
    return data?.rule === 'admin';
  }
};
