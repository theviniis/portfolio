import type { i18n as I18n } from 'i18next'
import experiencePt from '@/data/translations/experience/pt-BR.json'
import experienceEn from '@/data/translations/experience/en-US.json'

export function mountExperienceTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', experiencePt, true, true)
  i18n.addResourceBundle('en-US', 'translation', experienceEn, true, true)
}
