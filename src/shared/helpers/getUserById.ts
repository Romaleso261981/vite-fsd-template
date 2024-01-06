import { notifications } from '@mantine/notifications';
import { DocumentReference, doc } from 'firebase/firestore';

import { db } from '../../integations/firebase';
import { DatabasePaths } from '../types/enums';

export const getUserRefById = async (userId: string) => {
  try {
    try {
      const docRef: DocumentReference = doc(db, DatabasePaths.USERS, userId);

      return docRef;
    } catch (error) {
      notifications.show({
        title: 'error',
        message: `error ${error}`,
      });
    }
  } catch (error) {
    return null;
  }
};
