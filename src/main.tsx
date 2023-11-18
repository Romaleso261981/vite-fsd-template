import React from 'react';

import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import './index.css';
// import App from './app/App';
import './i18n';
import { RouterProvider } from 'react-router-dom';

import AppRouter from './app/app-router';

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <React.StrictMode>
      <Notifications position="bottom-center" />
      <RouterProvider router={AppRouter} />
    </React.StrictMode>
  </MantineProvider>,
);
