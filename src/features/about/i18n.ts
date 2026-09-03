import type { i18n as I18n } from 'i18next';
import aboutPt from '@/data/translations/about/pt-BR.json';
import aboutEn from '@/data/translations/about/en-US.json';

export function mountAboutTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', aboutPt, true, true);
  i18n.addResourceBundle('en-US', 'translation', aboutEn, true, true);
}
