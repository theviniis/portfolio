import GitHub from "../assets/github.svg?react";
import LinkedIn from "../assets/linkedin.svg?react";

export const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GitHub,
  linkedin: LinkedIn,
};
