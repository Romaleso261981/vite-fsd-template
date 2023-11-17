import { createBrowserRouter } from 'react-router-dom';

import Auth from '../pages/Auth/Auth';
import Main from '../pages/Main/Main';
import { routesLib } from '../shared/lib/index';

const AppRouter = createBrowserRouter([
  {
    path: routesLib.MAIN,
    element: <Main />,
  },
  {
    path: routesLib.AUTH,
    element: <Auth />,
  },
]);

export default AppRouter;
