import { addDoc, collection } from 'firebase/firestore';

import { db } from '../../integations/firebase';
import { UserData } from '../types/Types';

export const setFirestoreData = (nickName: string, path: string) => {
  const userData: UserData = {
    nickName,
    id: '',
    balans: 10,
    avatar: '',
    name: '',
    rule: '',
    phone: '',
    email: '',
  };
  const collectionRef = collection(db, path);

  addDoc(collectionRef, userData);
};
