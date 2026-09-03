import i18n from '@/i18n';
import { Experience } from './Experience';
import { mountExperienceTranslations } from './i18n';

let registered = false;
function setup() {
  if (!registered) {
    mountExperienceTranslations(i18n);
    registered = true;
  }
}

setup();

export { Experience };
