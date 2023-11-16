import { createBrowserRouter } from 'react-router-dom';

import { routesLib } from '../shared/lib/index';
import Main from '../pages/Main/Main';
import Auth from '../pages/Auth/Auth';

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
