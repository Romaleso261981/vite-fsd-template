import { notifications } from '@mantine/notifications';
import { DocumentReference, doc, getDoc } from 'firebase/firestore';

import { db } from '../../integations/firebase';
import { DatabasePaths } from '../types/enums';

export const getUserRefById = async (userId: string) => {
  try {
    const docRef: DocumentReference = doc(db, DatabasePaths.USERS, userId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();

      return userData;
    }

    return null;
  } catch (error) {
    notifications.show({
      title: 'error',
      message: `error ${error}`,
    });
  }
};
