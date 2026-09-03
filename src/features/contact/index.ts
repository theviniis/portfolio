import i18n from '@/i18n';
import { Contact } from './Contact';
import { mountContactTranslations } from './i18n';

let registered = false;
function setup() {
  if (!registered) {
    mountContactTranslations(i18n);
    registered = true;
  }
}

setup();

export { Contact };
