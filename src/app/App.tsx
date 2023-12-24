import { Suspense, lazy, useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Spiner } from '../features/components/Loader';
import RootLayout from '../features/components/RootLayout/RootLayout';
import { User } from '../features/user/types';
import { UserDetail } from '../pages/UserDetail/UserDetail';
import { getUser } from '../shared/helpers/getUser';

const Main = lazy(() => import('../pages/Main/Main'));
const NotFound = lazy(() => import('../pages/NoFound/NoFound'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const AuthPage = lazy(() => import('../pages/Auth/Auth'));

const App: React.FC = () => {
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getUser();

    if (user) {
      if (user.roles === undefined) {
        setUser(user);
        setShowAdminBoard(user.rule === 'admin');
      }
    }
  }, []);

  return (
    <Suspense fallback={<Spiner />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={user ? <Main /> : <AuthPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route
            path="admin"
            element={showAdminBoard ? <Admin /> : <h1>Ви немаєте права доступу</h1>}
          />
          <Route path="admin/:id" element={<UserDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
