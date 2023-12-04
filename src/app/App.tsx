import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthPage from '../pages/Auth';
import Main from '../pages/Main';
import { NotFound } from '../pages/NoFound/NoFound';

import { useAppSelector } from './store';

const App: React.FC = () => {
  const { setIsRegistered } = useAppSelector((state) => state.auth);

  console.log(setIsRegistered);

  if (!setIsRegistered) return <AuthPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
