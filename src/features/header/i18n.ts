import type { i18n as I18n } from 'i18next'
import headerPt from '@/data/translations/header/pt-BR.json'
import headerEn from '@/data/translations/header/en-US.json'

export const headerPtBR = headerPt
export const headerEnUS = headerEn

export function mountHeaderTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', headerPt, true, true)
  i18n.addResourceBundle('en-US', 'translation', headerEn, true, true)
}
