import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthPage from '../pages/Auth/Auth';
import { Dashboard } from '../pages/Dashboard';
import Main from '../pages/Main/Main';
import { NotFound } from '../pages/NoFound/NoFound';

import { useAppSelector } from './store';

const App: React.FC = () => {
  const { setIsRegistered } = useAppSelector((state) => state.auth);

  if (setIsRegistered) return <AuthPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
