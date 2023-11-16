import React from 'react';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import ReactDOM from 'react-dom/client';
import { initReactI18next } from 'react-i18next';

import './index.css';
import App from './app/App';

// Localisaton
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ru', 'ua'],
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: './assets/locales/{{lng}}/translation.json',
    },
  });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <React.StrictMode>
      <Notifications />
      <App />
    </React.StrictMode>
  </MantineProvider>,
);
