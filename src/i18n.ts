import i18n, { InitOptions, ReactOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const initI18n = async () => {
  const i18nConfig: InitOptions = {
    backend: {
      // translation file path
      loadPath: '/locales/{{ns}}/{{lng}}.json',
    },
    fallbackLng: 'en',
    // disabled in production
    debug: false,
    // can have multiple namespaces, in case you want to divide a huge
    // translation into smaller pieces and load them on demand
    ns: ['header'],

    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      wait: true as boolean, // Змінено тип на boolean
    } as ReactOptions, // Змінено тип на ReactOptions
  };

  await i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(i18nConfig);
};

export default initI18n;
