import type { ComponentType } from "react";

type Component = ComponentType<{ className?: string }>;

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

const iconModules = import.meta.glob(
  "/src/assets/social/*.svg",
  { query: "?react", eager: true }
);

export const socialIconMap: Record<string, Component> = Object.fromEntries(
  Object.entries(iconModules).map(([path, mod]) => {
    const name = path.match(/\/([^/]+)\.svg/)?.[1] ?? path;
    return [kebabToCamel(name), (mod as { default: Component }).default];
  })
);

export type SocialIcon = keyof typeof socialIconMap;
