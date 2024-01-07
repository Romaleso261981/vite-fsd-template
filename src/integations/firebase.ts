import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from './firebase.config';

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);

console.log(app);

export const auth = getAuth(app);

console.log(auth);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
