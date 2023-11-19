import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import header from './app/locales/en/translation.json';

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  returnEmptyString: false,
  debug: true,
  fallbackLng: 'ua',
  resources: {
    header,
  },
});
i18n.changeLanguage('en');

export default i18n;
