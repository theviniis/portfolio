import type { ComponentProps } from 'react'
import { Button } from './button'
import { socialIconMap, type SocialIcon } from '@/shared/lib/social-icons'

interface SocialLinkButtonProps {
  url: string
  iconName: SocialIcon
  ariaLabel: string
  onPointerEnter?: ComponentProps<'a'>['onPointerEnter']
}

const SocialLinkButton = ({
  url,
  iconName,
  ariaLabel,
  onPointerEnter
}: SocialLinkButtonProps) => {
  const Icon = socialIconMap[iconName]

  if (!Icon) return null

  return (
    <Button
      variant="secondary"
      size="lg"
      className="bg-transparent hover:bg-transparent focus-visible:bg-(--social-highlight) motion-reduce:hover:bg-(--social-highlight)"
      asChild
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onPointerEnter={onPointerEnter}
      >
        <Icon className="text-primary size-6.5" />
      </a>
    </Button>
  )
}

export { SocialLinkButton }
