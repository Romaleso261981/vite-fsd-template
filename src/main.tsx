// import { Suspense } from 'react';

import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import '@mantine/core/styles.css';
import './index.css';
import { RouterProvider } from 'react-router-dom';

import App from './app/App';
import store from './app/store';
import initI18n from './i18n';

const theme = createTheme({
  /** Put your mantine theme override here */
});

initI18n().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <Notifications position="top-left" />
        <RouterProvider router={App} />
      </MantineProvider>
    </Provider>,
  );
});
