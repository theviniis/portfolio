# Experience Show More Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a toggle "Ver mais / Ver menos" button to the experience section that shows 3 experiences by default and expands to show all when clicked.

**Architecture:** Modify `Experience.tsx` to add React state (`expanded`), slice the experiences array based on state, and render a conditional toggle button.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, shadcn/ui Button, Lucide React icons

---

### Task 1: Add imports and state to Experience component

**Files:**
- Modify: `src/components/Experience.tsx:1-3` (imports)
- Modify: `src/components/Experience.tsx:127-136` (Experience component)

- [ ] **Step 1: Add useState import and Lucide icons**

Replace the existing imports at the top of `src/components/Experience.tsx`:

```tsx
import { useState } from "react";
import { Section } from "./ui/Section";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ChevronDown } from "lucide-react";
```

- [ ] **Step 2: Add ITEMS_PER_PAGE constant and state to Experience component**

Replace the `Experience` component (lines 127-136):

```tsx
const ITEMS_PER_PAGE = 3;

const Experience = () => {
  const [expanded, setExpanded] = useState(false);
  const visibleExperiences = expanded
    ? experiences
    : experiences.slice(0, ITEMS_PER_PAGE);

  return (
    <Section id="experience">
      <h2>Experiência</h2>
      <div>
        <ul className="space-y-6" id="experience-list">
          {visibleExperiences.map(ExperienceItem)}
        </ul>
        {experiences.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-6">
            <Button
              variant="ghost"
              size="sm"
              aria-expanded={expanded}
              aria-controls="experience-list"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Ver menos" : "Ver mais"}
              <ChevronDown
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
};
```

- [ ] **Step 3: Run dev server to verify**

Run: `pnpm dev`
Expected: App loads, experience section shows 3 experiences with "Ver mais" button visible (since there are exactly 3 experiences, the button will NOT appear — this is correct per spec: button only appears when `experiences.length > ITEMS_PER_PAGE`)

- [ ] **Step 4: Test with more than 3 experiences (temporary)**

Temporarily add a 4th experience to the `experiences` array to verify the button works:

```tsx
{
  role: "Teste",
  company: "Teste",
  period: { start: "jan/2024", end: "dez/2024" },
  responsibilities: ["Teste de responsabilidade"],
  skills: ["Teste"],
},
```

Verify:
- Button "Ver mais" appears below the list
- Clicking it shows all 4 experiences and text changes to "Ver menos"
- Clicking again hides the 4th experience and text changes back to "Ver mais"

- [ ] **Step 5: Remove temporary test experience**

Remove the 4th test experience from the array.

- [ ] **Step 6: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "feat: add show more/less toggle to experience section"
```

---

## Verification

After implementation:
1. `pnpm dev` — app loads without errors
2. Experience section shows 3 experiences by default
3. Button does NOT appear when there are 3 or fewer experiences
4. If a 4th experience is added, button appears and toggles correctly
5. `aria-expanded` attribute updates on the button
6. `pnpm lint` passes (if configured)
