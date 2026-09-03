import type { i18n as I18n } from 'i18next'
import heroPt from '@/data/translations/hero/pt-BR.json'
import heroEn from '@/data/translations/hero/en-US.json'

export function mountHeroTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', heroPt, true, true)
  i18n.addResourceBundle('en-US', 'translation', heroEn, true, true)
}
