import { FC, Suspense, lazy, useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import { currentUser } from '../features/auth/authSlice';
import { Spiner } from '../features/components/Loader';
import RootLayout from '../features/components/RootLayout/RootLayout';
import { useAdminCheck } from '../shared/helpers/isAdmin';
import { RoutersPaths } from '../shared/types/enums';

import { useAppDispatch } from './store';

import ConditionList from '@/features/components/ConditionList/ConditionList';

// const Main = lazy(() => import('../pages/Main/Main'));
const NotFound = lazy(() => import('../pages/NoFound/NoFound'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const AuthPage = lazy(() => import('../pages/Auth/AuthPage'));
const Userdetails = lazy(() => import('../pages/Userdetails/Userdetails'));
const NoAccess = lazy(() => import('../features/components/NoAccess/NoAccess'));

const App: FC = () => {
  const [isAllow, setIsAllow] = useState(false);

  const dispach = useAppDispatch();

  useEffect(() => {
    dispach(currentUser());
  }, [dispach]);

  const isAdmin = useAdminCheck();

  useEffect(() => {
    if (isAdmin) {
      setIsAllow(true);
    }
  }, [isAdmin]);

  return (
    <Suspense fallback={<Spiner />}>
      <Routes>
        <Route path={RoutersPaths.MAIN} element={<RootLayout />}>
          {/* <Route index element={<Main />} /> */}
          <Route index element={<ConditionList />} />
          <Route path={RoutersPaths.AUTH} element={<AuthPage />} />
          <Route path={RoutersPaths.ADMIN} element={isAllow ? <Admin /> : <NoAccess />} />
          <Route path={RoutersPaths.USERBYID} element={<Userdetails />} />
        </Route>
        <Route path={RoutersPaths.NOFOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
