import { createBrowserRouter } from 'react-router-dom';

import { routesLib } from '../shared/lib/index';

export const appRouter = createBrowserRouter([
  {
    path: routesLib.MAIN,
    element: <h1>MainPage</h1>,
  },
]);
