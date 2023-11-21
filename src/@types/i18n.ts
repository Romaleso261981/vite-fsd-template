import i18next from 'i18next';

import deNs1 from './locales/de/ns1.json';
import enFallback from './locales/en/fallback.json';
import enNs1 from './locales/en/ns1.json';

export const defaultNS = 'ns1';
export const fallbackNS = 'fallback';

i18next.init({
  debug: true,
  fallbackLng: 'en',
  defaultNS,
  fallbackNS,
  resources: {
    en: {
      ns1: enNs1,
      fallback: enFallback,
    },
    de: {
      ns1: deNs1,
    },
  },
});

export default i18next;
