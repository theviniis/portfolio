import i18n from '@/i18n';
import { Hero } from './Hero';
import { mountHeroTranslations } from './i18n';

let registered = false;
function setup() {
  if (!registered) {
    mountHeroTranslations(i18n);
    registered = true;
  }
}

setup();

export { Hero };
