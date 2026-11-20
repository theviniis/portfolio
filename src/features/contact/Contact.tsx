import { profile } from '@/data/profile'
import { RevealSection } from '@/shared/components/RevealSection'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { AnimatedAction } from '@/shared/components/AnimatedAction'
import { usePortfolioTranslation } from '@/shared/hooks/usePortfolioTranslation'
import { TypingIndicator } from './TypingIndicator'

export function Contact() {
  const { t } = usePortfolioTranslation()
  const links = [
    { href: profile.linkedin, label: 'LinkedIn' },
    { href: `mailto:${profile.email}`, label: t('contact.emailLabel') },
    { href: profile.github, label: 'GitHub' },
    { href: profile.whatsapp, label: 'WhatsApp' }
  ]
  return (
    <RevealSection
      id="contato"
      className="mx-auto grid max-w-200 grid-cols-[160px_minmax(0,1fr)] items-center gap-14 max-[767px]:grid-cols-1 max-[767px]:gap-6"
    >
      <TypingIndicator />
      <div>
        <SectionHeading className="mb-3.5">
          {t('contact.heading')}
        </SectionHeading>
        <p className="max-w-120 text-[15px] leading-[1.45] text-muted-foreground">
          {t('contact.description')}
        </p>
        <div className="mt-6 grid max-w-120 grid-cols-2 gap-3 max-[767px]:max-w-none">
          {links.map((link) => (
            <AnimatedAction
              key={link.href}
              href={link.href}
              variant="contact"
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
            >
              {link.label}
            </AnimatedAction>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}
