import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../../integations/firebase';

export const getFirestoreData = async <T>(
  path: string,
  queryLimit: number,
  filterField?: string,
  filterValue?: any,
  orderByField?: string,
  orderDirection?: 'asc' | 'desc',
): Promise<T[]> => {
  const collectionRef = collection(db, path);
  let q = query(collectionRef, limit(queryLimit));

  if (filterField && filterValue) {
    q = query(collectionRef, where(filterField, '==', filterValue), limit(queryLimit));
  }

  if (orderByField) {
    q = query(
      collectionRef,
      orderBy(orderByField, orderDirection || 'asc'),
      limit(queryLimit),
    );
  }

  const querySnapshot = await getDocs(q);
  const data: T[] = [];

  querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    data.push({ ...(doc.data() as T), id: doc.id });
  });

  return data;
};
export const getFirestoreRef = async (
  path: string,
  queryLimit: number,
  filterField?: string,
  filterValue?: any,
  orderByField?: string,
  orderDirection?: 'asc' | 'desc',
) => {
  const collectionRef = collection(db, path);
  let q = query(collectionRef, limit(queryLimit));

  if (filterField && filterValue) {
    q = query(collectionRef, where(filterField, '==', filterValue), limit(queryLimit));
  }

  if (orderByField) {
    q = query(
      collectionRef,
      orderBy(orderByField, orderDirection || 'asc'),
      limit(queryLimit),
    );
  }

  const querySnapshot = await getDocs(q);

  return querySnapshot;
};
