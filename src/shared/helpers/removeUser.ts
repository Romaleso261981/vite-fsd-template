import { notifications } from '@mantine/notifications';
import { deleteDoc } from 'firebase/firestore';

import { DatabasePaths } from '../types/enums';
import { User } from '../types/Types';

import { getFirestoreData } from './getData';
import { getUserRefById } from './getUserById';

export const removeUser = async (userId: string) => {
  try {
    const userRef = await getUserRefById(userId);

    if (userRef !== null && userRef !== undefined) {
      await deleteDoc(userRef);
    }
    const data = await getFirestoreData<User>(DatabasePaths.USERS, 20);

    return data;
  } catch (error) {
    notifications.show({
      title: 'error',
      message: `error ${error}`,
    });
  }
};
