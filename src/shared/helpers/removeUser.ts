import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '../../integations/firebase';

export const removeUser = async (userId: string) => {
  const docRef = doc(db, 'users', userId);

  try {
    await deleteDoc(docRef);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Помилка при видаленні документа з Firestore:', e);
  }
};
