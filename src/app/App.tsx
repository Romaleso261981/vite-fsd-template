import { Suspense, lazy, useEffect, useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { useSelectUserData } from '../features/auth/authSlice';
import { Spiner } from '../features/components/Loader';
import RootLayout from '../features/components/RootLayout/RootLayout';
import { isAdmin } from '../shared/helpers/isAdmin';
import { RoutersPaths } from '../shared/types/enums';

import { useAppSelector } from './store';

const Main = lazy(() => import('../pages/Main/Main'));
const NotFound = lazy(() => import('../pages/NoFound/NoFound'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const AuthPage = lazy(() => import('../pages/Auth/AuthPage'));
const Userdetails = lazy(() => import('../pages/Userdetails/Userdetails'));
const NoAccess = lazy(() => import('../features/components/NoAccess/NoAccess'));

const App: React.FC = () => {
  const [isAllow, setIsAllow] = useState(false);
  const userData = useAppSelector(useSelectUserData);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin(userData)) {
      setIsAllow(true);
    }
  }, [userData]);

  useEffect(() => {
    if (userData === null) {
      navigate('/auth');
    }
  }, [navigate, userData]);

  return (
    <Suspense fallback={<Spiner />}>
      <Routes>
        <Route path={RoutersPaths.MAIN} element={<RootLayout />}>
          <Route index element={<Main />} />
          <Route path={RoutersPaths.AUTH} element={<AuthPage />} />
          <Route path={RoutersPaths.ADMIN} element={isAllow ? <Admin /> : <NoAccess />} />
          <Route path={RoutersPaths.USER} element={<Userdetails />} />
        </Route>
        <Route path={RoutersPaths.USER} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
