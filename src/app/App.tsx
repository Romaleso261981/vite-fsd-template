import React, { useState } from 'react';

import {
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import viteLogo from '../../public/vite.svg';
import reactLogo from '../assets/react.svg';
import './App.css';
import { auth } from '../shared/firebase';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const email = 'ladg@gmail.com';
  const password = 'leso261981';

  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     const { user } = userCredential;

  //     console.log('user', user);
  //   })
  //   .catch((error) => {
  //     console.log('errorMessage', error);
  //   });

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;

      console.log(user);
    })
    .catch((error) => {
      console.log('errorMessage', error);
    });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="submit" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          user email <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
};

export default App;
