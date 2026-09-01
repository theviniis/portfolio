# Design: Social Links em JSON

## Context

Os links do GitHub e LinkedIn estão hardcoded em dois componentes separados (`github-button.tsx` e `linkedin-button.tsx`), importados em 3 lugares (`Hero.tsx`, `About.tsx`, `Contact.tsx`). O objetivo é centralizar esses dados em um JSON dentro dos translations para facilitar adição/edição de links.

## Estrutura do JSON

Adicionar chave `links` nos translations (`en/translation.json` e `pt-BR/translation.json`):

```json
{
  "links": [
    {
      "url": "https://github.com/theviniis/",
      "name": "GitHub",
      "ariaLabel": "GitHub profile",
      "iconName": "github"
    },
    {
      "url": "https://www.linkedin.com/in/viniis/",
      "name": "LinkedIn",
      "ariaLabel": "LinkedIn profile",
      "iconName": "linkedin"
    }
  ]
}
```

## Tipo TypeScript

Adicionar em `src/data/types.ts`:

```typescript
export interface SocialLinkItem {
  url: string;
  name: string;
  ariaLabel: string;
  iconName: string;
}
```

## Novos Arquivos

### `src/components/ui/social-icons.tsx`

Mapper de ícones que converte `iconName` → componente SVG:

```typescript
import GitHub from "../../assets/github.svg?react";
import LinkedIn from "../../assets/linkedin.svg?react";

export const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GitHub,
  linkedin: LinkedIn,
};
```

### `src/components/ui/social-link-button.tsx`

Componente que renderiza um link social individual:

- Props: `url`, `iconName`, `ariaLabel`
- Usa `Button` existente com `variant="secondary"` e `size="lg"`
- Usa `socialIconMap` para renderizar o ícone correto

### `src/components/ui/social-links.tsx`

Componente que renderiza a lista completa de links:

- Usa `useTranslation()` para ler `links` do JSON
- Renderiza `SocialLinkButton` para cada item
- Envolve em `ButtonGroup`

## Atualizações em Arquivos Existentes

| Arquivo | Mudança |
|---------|---------|
| `src/data/types.ts` | Adicionar interface `SocialLinkItem` |
| `src/data/en/translation.json` | Adicionar chave `links` |
| `src/data/pt-BR/translation.json` | Adicionar chave `links` |
| `src/components/Hero.tsx` | Substituir `LinkedInButton`/`GitHubButton` por `SocialLinks` |
| `src/components/About.tsx` | Substituir `LinkedInButton`/`GitHubButton` por `SocialLinks` |
| `src/components/Contact.tsx` | Substituir `LinkedInButton`/`GitHubButton` por `SocialLinks` |

## Arquivos a Deletar

- `src/components/ui/github-button.tsx`
- `src/components/ui/linkedin-button.tsx`

## Como Adicionar um Novo Link

1. Colocar SVG em `src/assets/`
2. Adicionar import e mapeamento em `social-icons.tsx`
3. Adicionar objeto no JSON dos translations

## Fora do Escopo

- Mudar a estrutura existente de i18n
- Adicionar animações ou estilos diferentes
- Mudar o comportamento dos links (abrir na mesma aba, etc.)
