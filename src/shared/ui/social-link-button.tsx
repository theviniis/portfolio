import { Button } from "./button";
import { socialIconMap, type SocialIcon } from "@/shared/lib/social-icons";

interface SocialLinkButtonProps {
  url: string;
  iconName: SocialIcon;
  ariaLabel: string;
}

const SocialLinkButton = ({
  url,
  iconName,
  ariaLabel,
}: SocialLinkButtonProps) => {
  const Icon = socialIconMap[iconName];

  if (!Icon) return null;

  return (
    <Button variant="secondary" size="lg" asChild>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        <Icon className="text-primary size-6.5" />
      </a>
    </Button>
  );
};

export { SocialLinkButton };
