import i18n from '@/i18n';
import { Projects } from './Projects';
import { mountProjectsTranslations } from './i18n';

let registered = false;
function setup() {
  if (!registered) {
    mountProjectsTranslations(i18n);
    registered = true;
  }
}

setup();

export { Projects };
