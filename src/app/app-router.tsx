import { createBrowserRouter } from 'react-router-dom';

import AuthPage from '../pages/AuthPage';
import Main from '../pages/Main/Main';

// import Auth from '../pages/Auth/Auth';
// import Main from '../pages/Main/Main';
// import { routesLib } from '../shared/lib/index';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/login',
    element: <AuthPage />,
  },
]);

export default AppRouter;
