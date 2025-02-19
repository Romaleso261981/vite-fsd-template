import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../../integations/firebase';
import { User } from '../types/Types';

import { hadleError } from './hadleError';

export const hookEditUser = async ({ id, user }: { id: string; user: Partial<User> }) => {
  try {
    if (!id) {
      throw new Error('Відсутній ідентифікатор користувача.');
    }

    const docRef = doc(db, 'users', id);

    await updateDoc(docRef, user);
  } catch (error) {
    return hadleError({
      message: `error ${error}`,
    });
  }
};
