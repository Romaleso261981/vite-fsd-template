import { addDoc, collection } from 'firebase/firestore';

import { db } from '../../integations/firebase';

export const setFirestoreData = (data: {}, path: string) => {
  const collectionRef = collection(db, path);

  addDoc(collectionRef, data);
};
