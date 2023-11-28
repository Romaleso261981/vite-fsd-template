import { createBrowserRouter } from 'react-router-dom';

import AuthPage from '../pages/Auth';
import Main from '../pages/Main';
import { NotFound } from '../pages/NoFound/NoFound';
import { routesLib } from '../shared/lib/index';

const App = createBrowserRouter([
  {
    path: routesLib.MAIN,
    element: <Main />,
  },
  {
    path: routesLib.AUTH,
    element: <AuthPage />,
  },
  {
    path: routesLib.NotFound,
    element: <NotFound />,
  },
]);

export default App;
