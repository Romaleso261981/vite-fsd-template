import { Suspense, lazy } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

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
        <Suspense fallback={<h1>Loading......</h1>}>
          <NotFound />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<h1>Loading......</h1>}>
              <Main />
            </Suspense>
          ),
        },
        {
          path: 'dashboard',
          element: (
            <Suspense fallback={<h1>Loading......</h1>}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: 'admin',
          element: (
            <Suspense fallback={<h1>Loading......</h1>}>
              <Admin />
            </Suspense>
          ),
        },
        {
          path: 'auth',
          element: (
            <Suspense fallback={<h1>Loading......</h1>}>
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
