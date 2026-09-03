import type { i18n as I18n } from 'i18next';
import projectsPt from '@/data/translations/projects/pt-BR.json';
import projectsEn from '@/data/translations/projects/en-US.json';

export function mountProjectsTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', projectsPt, true, true);
  i18n.addResourceBundle('en-US', 'translation', projectsEn, true, true);
}
