import i18n from '@/i18n';
import { About } from './About';
import { mountAboutTranslations } from './i18n';

let registered = false;
function setup() {
  if (!registered) {
    mountAboutTranslations(i18n);
    registered = true;
  }
}

setup();

export { About };
