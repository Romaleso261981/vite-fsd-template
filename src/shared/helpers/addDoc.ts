import { addDoc, collection } from 'firebase/firestore';

import { db } from '../../integations/firebase';
import { UserData } from '../types/Types';

export const setFirestoreData = (nickName: string, path: string) => {
  const userData: UserData = {
    nickName,
    balans: '10',
    LastName: 'Lesyo',
  };
  const collectionRef = collection(db, path);

  addDoc(collectionRef, userData);
};
