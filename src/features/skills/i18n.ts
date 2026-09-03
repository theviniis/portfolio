import type { i18n as I18n } from 'i18next';
import skillsPt from '@/data/translations/skills/pt-BR.json';
import skillsEn from '@/data/translations/skills/en-US.json';

export function mountSkillsTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', skillsPt, true, true);
  i18n.addResourceBundle('en-US', 'translation', skillsEn, true, true);
}
