import GitHub from "../assets/github.svg?react";
import LinkedIn from "../assets/linkedin.svg?react";
import Whatsapp from "../assets/whatsapp.svg?react";

export const socialIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  github: GitHub,
  linkedin: LinkedIn,
  whatsapp: Whatsapp,
};
