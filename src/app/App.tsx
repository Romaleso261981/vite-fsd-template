import { Suspense, lazy, useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Spiner } from '../features/components/Loader';
import RootLayout from '../features/components/RootLayout/RootLayout';
import { UserDetail } from '../pages/UserDetail/UserDetail';
import { getUser } from '../shared/helpers/getUser';

const Main = lazy(() => import('../pages/Main/Main'));
const NotFound = lazy(() => import('../pages/NoFound/NoFound'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const AuthPage = lazy(() => import('../pages/Auth/Auth'));

const App: React.FC = () => {
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);

  useEffect(() => {
    const user = getUser();

    if (user) {
      if (user.roles !== undefined) {
        setShowAdminBoard(user.roles.includes('ROLE_ADMIN') ?? false);
      }
    }
  }, []);

  return (
    <Suspense fallback={<Spiner />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Main />} />
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
