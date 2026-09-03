import i18n from '@/i18n'
import { SkillsWrapper } from './SkillsWrapper'
import { mountSkillsTranslations } from './i18n'

let registered = false
function setup() {
  if (!registered) {
    mountSkillsTranslations(i18n)
    registered = true
  }
}

setup()

export { SkillsWrapper }
