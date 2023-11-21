import React from 'react';

import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import '@mantine/core/styles.css';
import './index.css';
// import App from './app/App';
import './i18n';
import { RouterProvider } from 'react-router-dom';

import App from './app/App';
import store from './app/store';

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider theme={theme}>
      <React.StrictMode>
        <Notifications position="top-left" />
        <RouterProvider router={App} />
      </React.StrictMode>
    </MantineProvider>
  </Provider>,
);
