# Design: Botão "Ver Mais" na Seção de Experiências

## Resumo

Adicionar um botão toggle "Ver mais / Ver menos" na seção de experiências do portfólio. Por padrão, 3 experiências são exibidas. O botão aparece quando há mais de 3 experiências e permite expandir/recolher a lista.

## Contexto

- **Arquivo:** `src/components/Experience.tsx`
- **Dados:** Array `experiences` com 3 itens hardcoded
- **Componente atual:** Renderiza todas as experiências sem controle de visibilidade
- **Estilo:** Tailwind CSS v4 + shadcn/ui

## Decisões

| Decisão | Escolha | Razão |
|---------|---------|-------|
| Abordagem | `useState` + `slice` | Simples, sem dependências externas |
| Animação | Nenhuma | Número pequeno de itens, transição abrupta é aceitável |
| Separação de dados | Não | Manter no componente por simplicidade |

## Especificação

### Constante

```ts
const ITEMS_PER_PAGE = 3;
```

### Estado

```ts
const [expanded, setExpanded] = useState(false);
```

### Lógica de renderização

```ts
const visibleExperiences = expanded
  ? experiences
  : experiences.slice(0, ITEMS_PER_PAGE);
```

### Botão toggle

- Aparece condicionalmente: `experiences.length > ITEMS_PER_PAGE`
- Texto: `"Ver mais"` quando `!expanded`, `"Ver menos"` quando `expanded`
- Acessibilidade: `aria-expanded={expanded}`, `aria-controls="experience-list"`
- Estilo: `variant="ghost"`, `size="sm"`, centralizado abaixo da lista
- Ícone: `ChevronDown` (Lucide) rotacionado 180° quando expandido

### Layout

```
[Experiência 1]
───────────────
[Experiência 2]
───────────────
[Experiência 3]
───────────────
    [Ver mais ▼]      ← aparece apenas se > 3 experiências
```

## Arquivos afetados

| Arquivo | Mudança |
|---------|---------|
| `src/components/Experience.tsx` | Adicionar `useState`, constante, lógica de slice, botão toggle |

## Acessibilidade

- `aria-expanded` no botão indica estado atual
- `aria-controls` aponta para o `id` da lista
- Botão é-focusable e funciona com Enter/Space

## Fora do escopo

- Animação de expansão/recolhimento
- Extração de dados para arquivo separado
- Paginação
- Persistência do estado (localStorage)
