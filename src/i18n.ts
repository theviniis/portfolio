import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptBR from './data/pt-BR/translation.json';
import enUS from './data/en/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      'en-US': { translation: enUS }
    },
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
      convertDetectedLanguage: (lng: string) => {
        return lng.startsWith('pt') ? 'pt-BR' : 'en-US';
      }
    }
  });

export default i18n;
