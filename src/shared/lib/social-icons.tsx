import GitHub from "@/assets/github.svg?react";
import LinkedIn from "@/assets/linkedin.svg?react";
import Whatsapp from "@/assets/whatsapp.svg?react";

export type SocialIcon = "github" | "linkedin" | "whatsapp";

type Component = React.ComponentType<{ className?: string }>;

export const socialIconMap: Record<SocialIcon, Component> = {
  github: GitHub,
  linkedin: LinkedIn,
  whatsapp: Whatsapp,
};
