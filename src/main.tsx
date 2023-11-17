import React from 'react';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './app/App';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <React.StrictMode>
      <Notifications />
      <App />
    </React.StrictMode>
  </MantineProvider>,
);
