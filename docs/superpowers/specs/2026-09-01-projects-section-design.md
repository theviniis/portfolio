# Design: Seção Projetos

## Contexto

O portfolio atual possui seções: Hero, About, Skills, Experience, Contact. O usuário quer adicionar uma seção "Projetos" com um carrossel de iframes mostrando aplicações em produção, links de GitHub e skills utilizadas.

## Decisões

- **Carrossel:** Embla Carousel React v8.6.0 (leve, ~4kB, suporta React 19)
- **Layout do card:** iframe em cima, informações (nome, skills, GitHub) embaixo
- **Navegação:** Setas laterais (ChevronLeft/ChevronRight do lucide-react)
- **Posição na página:** Entre Experience e Contact
- **i18n:** Chave `projects` nos dois arquivos de tradução (en, pt-BR)

## Estrutura de dados

Cada projeto no translation.json:

```json
{
  "name": "Nome do Projeto",
  "deployUrl": "https://...",
  "githubUrl": "https://github.com/...",
  "skills": ["React", "TypeScript"],
  "description": "Breve descrição (opcional — se ausente, não exibe)"
}
```

## Componentes

### `Projects.tsx`
- Usa `Section` existente
- Lado esquerdo: título + descrição da seção
- Lado direito: carrossel Embla com cards

### `ProjectCard.tsx`
- `<iframe>` com `loading="lazy"`, borda arredondada, sombra
- Nome do projeto (h3/h4)
- Badges de skills (reutiliza componente `Badge`)
- Link para GitHub (ícone)

### Navegação do carrossel
- Botões de seta fora do viewport (para evitar conflito com drag)
- Desabilitado no primeiro/último slide
- Indicador de posição (dots)

## Arquivos a modificar

1. `src/data/en/translation.json` — adicionar chave `projects`
2. `src/data/pt-BR/translation.json` — adicionar chave `projects`
3. `src/App.tsx` — adicionar componente `Projects` na ordem
4. `src/components/Header.tsx` — adicionar item de navegação

## Arquivos a criar

1. `src/components/Projects.tsx`
2. `src/components/ProjectCard.tsx`

## Dependência

```
npm install embla-carousel-react
```

## Estilo

- Seguir padrão existente: Tailwind CSS, componentes shadcn (Badge, Button)
- Iframe com aspect-ratio fixo (16/9 ou similar), `w-full`, borda arredondada
- Cards com `min-w-full` dentro do container Embla (1 card visível por vez em todos os breakpoints)
