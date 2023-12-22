import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '../../integations/firebase';

export const removeUser = async (userId: string) => {
  const docRef = doc(db, 'users', userId);

  try {
    await deleteDoc(docRef);
    console.log(`Документ з ID ${userId} успішно видалено.`);
  } catch (e) {
    console.error('Помилка при видаленні документа з Firestore:', e);
  }
};
