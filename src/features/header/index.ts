import i18n from '@/i18n'
import { Header } from './Header'
import { mountHeaderTranslations } from './i18n'

let registered = false
function setup() {
  if (!registered) {
    mountHeaderTranslations(i18n)
    registered = true
  }
}

setup()

export { Header }
