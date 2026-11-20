import portfolioPt from '@/data/translations/portfolio/pt-BR.json'
import portfolioEn from '@/data/translations/portfolio/en-US.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import headerPt from '@/data/translations/header/pt-BR.json'
import headerEn from '@/data/translations/header/en-US.json'
import linksPt from '@/data/translations/links/pt-BR.json'
import linksEn from '@/data/translations/links/en-US.json'

const headerAndLinksPt = { ...portfolioPt, ...headerPt, links: linksPt.links }
const headerAndLinksEn = { ...portfolioEn, ...headerEn, links: linksEn.links }

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: headerAndLinksPt },
      'en-US': { translation: headerAndLinksEn }
    },
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      caches: [],
      convertDetectedLanguage: (lng: string) => {
        return lng.startsWith('pt') ? 'pt-BR' : 'en-US'
      }
    }
  })

export default i18n
