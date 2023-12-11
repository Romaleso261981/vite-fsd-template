import { collection, getDocs, limit, query } from 'firebase/firestore';

import { User } from '../../features/auth/types';
import { db } from '../../integations/firebase';

type DatabasePaths = string;

export const getFirestoreData = async (path: DatabasePaths) => {
  const collectionRef = collection(db, path);

  const q = query(collectionRef, limit(20));

  const querySnapshot = await getDocs(q);
  const data: User[] = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data() as User);
  });

  return data;
};
