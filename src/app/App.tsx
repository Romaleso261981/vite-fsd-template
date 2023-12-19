import { Suspense, lazy } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Spiner } from '../features/components/Loader';
import RootLayout from '../features/components/RootLayout/RootLayout';

const Main = lazy(() => import('../pages/Main/Main'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const NotFound = lazy(() => import('../pages/Dashboard/Dashboard'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const AuthPage = lazy(() => import('../pages/Auth/Auth'));

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: (
        <Suspense fallback={<Spiner />}>
          <NotFound />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Spiner />}>
              <Main />
            </Suspense>
          ),
        },
        {
          path: 'dashboard',
          element: (
            <Suspense fallback={<Spiner />}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: 'admin',
          element: (
            <Suspense fallback={<Spiner />}>
              <Admin />
            </Suspense>
          ),
        },
        {
          path: 'auth',
          element: (
            <Suspense fallback={<Spiner />}>
              <AuthPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
