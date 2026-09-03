import { useTranslation } from 'react-i18next'
import { Section } from '@/shared/ui/Section'
import { Button } from '@/shared/ui/button'
import { SkillList } from '@/shared/components/SkillList'

const SkillsWrapper = () => {
  const { t } = useTranslation()

  return (
    <Section id={t('skills.id')}>
      <h2>{t('skills.title')}</h2>
      <div className="space-y-8">
        <p>{t('skills.description')}</p>
        <SkillList
          skills={t('skills.list', { returnObjects: true }) as string[]}
          renderItem={(skill, variant) => (
            <Button
              variant={variant}
              className="pointer-events-none flex-1"
              asChild
            >
              <span>{skill}</span>
            </Button>
          )}
        />
      </div>
    </Section>
  )
}

export { SkillsWrapper }
