import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA0AdoQoblJrm_a9Qbh628U-Yt2-6DEKHQ',
  authDomain: 'new-spa-b84ea.firebaseapp.com',
  databaseURL: 'https://new-spa-b84ea-default-rtdb.firebaseio.com',
  projectId: 'new-spa-b84ea',
  storageBucket: 'new-spa-b84ea.appspot.com',
  messagingSenderId: '326537037114',
  appId: '1:326537037114:web:7b126f6bf625fe0b7dfc03',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// async function readDataFromFirestore() {
//   const collectionRef = collection(db, 'users'); // Замініть 'ім\'я-колекції' на реальне ім'я вашої колекції

//   try {
//     const querySnapshot = await getDocs(collectionRef);

//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//     });
//   } catch (e) {
//     console.error('Помилка при отриманні даних з Firestore:', e);
//   }
// }

// // Виклик функції для читання даних
// readDataFromFirestore();
