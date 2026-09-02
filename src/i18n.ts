import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import header from './data/translations/header.json';
import hero from './data/translations/hero.json';
import about from './data/translations/about.json';
import skills from './data/translations/skills.json';
import experience from './data/translations/experience.json';
import projects from './data/translations/projects.json';
import contact from './data/translations/contact.json';
import ui from './data/translations/ui.json';
import links from './data/translations/links.json';

const resources = {
  'pt-BR': {
    translation: {
      ...header.pt,
      ...hero.pt,
      ...about.pt,
      ...skills.pt,
      ...experience.pt,
      ...projects.pt,
      ...contact.pt,
      ...ui.pt,
      links: links.pt
    }
  },
  'en-US': {
    translation: {
      ...header.en,
      ...hero.en,
      ...about.en,
      ...skills.en,
      ...experience.en,
      ...projects.en,
      ...contact.en,
      ...ui.en,
      links: links.en
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
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
