import { addDoc, collection } from 'firebase/firestore';

import { db } from '../../integations/firebase';

export const setFirestoreData = (nickName: string, path: string) => {
  const collectionRef = collection(db, path);

  addDoc(collectionRef, { nickName });
};
