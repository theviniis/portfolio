import type { i18n as I18n } from 'i18next';
import contactPt from '@/data/translations/contact/pt-BR.json';
import contactEn from '@/data/translations/contact/en-US.json';
import uiPt from '@/data/translations/ui/pt-BR.json';
import uiEn from '@/data/translations/ui/en-US.json';

export function mountContactTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', contactPt, true, true);
  i18n.addResourceBundle('en-US', 'translation', contactEn, true, true);
  i18n.addResourceBundle('pt-BR', 'translation', uiPt, true, true);
  i18n.addResourceBundle('en-US', 'translation', uiEn, true, true);
}
