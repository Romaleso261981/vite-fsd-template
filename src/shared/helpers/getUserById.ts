import { DatabasePaths } from '../types/enums';
import { User } from '../types/Types';

import { getFirestoreData } from './getData';
import { hadleError } from './hadleError';

export const getUserRefById = async (userId: string) => {
  try {
    const userData = await getFirestoreData<User>(DatabasePaths.USERS, 1, userId);

    if (userData) {
      return userData[0];
    }

    return null;
  } catch (error) {
    hadleError({
      message: `error ${error}`,
    });
  }
};
