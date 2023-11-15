import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA0AdoQoblJrm_a9Qbh628U-Yt2-6DEKHQ',
  authDomain: 'new-spa-b84ea.firebaseapp.com',
  projectId: 'new-spa-b84ea',
  storageBucket: 'new-spa-b84ea.appspot.com',
  messagingSenderId: '326537037114',
  appId: '1:326537037114:web:7b126f6bf625fe0b7dfc03',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
