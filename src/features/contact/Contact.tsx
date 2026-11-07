import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/shared/ui/Section'
import { SocialLinks } from '@/shared/ui/social-links'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'
import { SlidingUnderlineGroup } from '@/shared/ui/sliding-underline-group'
import { getCvForLang } from '@/shared/lib/cv'

const ContactForm = lazy(() =>
  import('./ContactForm').then((m) => ({ default: m.ContactForm }))
)

const Contact = () => {
  const { t, i18n } = useTranslation()
  const cv = getCvForLang(i18n.language)

  return (
    <Section>
      <div className="space-y-4">
        <h2>{t('contact.title')}</h2>
        <SlidingUnderlineGroup>
          <p>
            {t('contact.emailLabel')}{' '}
            <Button className="p-0 text-base" variant="link" asChild>
              <a href={`mailto:${t('contact.email')}`}>
                <span className="sliding-underline">{t('contact.email')}</span>
              </a>
            </Button>
          </p>

          <p>
            {t('contact.cvLabel')}{' '}
            <Button className="p-0 text-base" variant="link" asChild>
              <a href={cv.url} download={cv.filename}>
                <span className="sliding-underline">{t('contact.cvLink')}</span>
              </a>
            </Button>
          </p>
        </SlidingUnderlineGroup>
        <Suspense
          fallback={
            <div>
              <Spinner />
              {t('common.sending')}
            </div>
          }
        >
          <SocialLinks />
        </Suspense>
      </div>
      <ContactForm />
    </Section>
  )
}

export { Contact }
