import { createBrowserRouter } from 'react-router-dom';

import AuthPage from '../pages/AuthPage';
import Main from '../pages/Main/Main';
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
]);

export default App;
