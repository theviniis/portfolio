# Fix Spacing Inconsistencies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize padding, margin, and gap values across all non-UI components for visual consistency.

**Architecture:** The project uses a `Section` wrapper component (`src/components/ui/Section.tsx`) that applies `gap-8 py-8 lg:gap-16 lg:py-16` to all sections. Individual components then override or add their own spacing, which creates inconsistencies. The fix normalizes these values to a consistent design language.

**Tech Stack:** React, Tailwind CSS v4, shadcn/ui

---

## Spacing Audit Summary

| Pattern | Current Value | Standardized Value | Files Affected |
|---------|---------------|-------------------|----------------|
| Hero internal gap | `gap-y-4 lg:gap-y-8` | `gap-y-8 lg:gap-y-16` (match Section) | `Hero.tsx:13` |
| About text group | `space-y-2` | `space-y-4` (match Hero subtitle pattern) | `About.tsx:15` |
| Contact heading | `mb-4` (inline) | `space-y-4` wrapper, remove `mb-4` | `Contact.tsx:118-143` |

**Already consistent (no changes needed):**
- Header: `py-6` (intentionally different, sticky header)
- Hero subtitle: `space-y-2 lg:space-y-4`
- Hero buttons: `gap-4`
- About inner wrapper: `space-y-8`
- About buttons: `gap-4`
- SkillsWrapper: `space-y-8`, `gap-2`
- Experience: `space-y-6`, `gap-2`, `space-y-1`
- Contact form: `space-y-8`, `gap-4`
- Contact ButtonGroup: `mt-8`

---

### Task 1: Fix Hero gap-y inconsistency

**Files:**
- Modify: `src/components/Hero.tsx:13`

The Hero section uses `gap-y-4 lg:gap-y-8` on its grid, but the Section wrapper already applies `gap-8 lg:gap-16`. The Hero's internal grid should match or deliberately differ. Change to use consistent vertical gap.

- [ ] **Step 1: Update Hero gap**

In `src/components/Hero.tsx`, line 13, change:
```tsx
<div className="grid place-content-center gap-y-4 lg:gap-y-8">
```
to:
```tsx
<div className="grid place-content-center gap-y-8 lg:gap-y-16">
```

This makes the Hero's internal spacing match the Section wrapper's `gap-8 lg:gap-16` pattern.

- [ ] **Step 2: Verify visually**

Run `pnpm dev` and check that the Hero section spacing looks correct — the gap between the text block and the image should match other sections.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "fix: normalize Hero internal gap to match Section spacing"
```

---

### Task 2: Fix About text group spacing

**Files:**
- Modify: `src/components/About.tsx:15`

The About section uses `space-y-2` for the text group, while Hero uses `space-y-2 lg:space-y-4`. For consistency, About should use `space-y-4` (matching the responsive pattern) or stick with `space-y-2` if it's intentionally tighter. Since About has more text content, `space-y-4` is more appropriate.

- [ ] **Step 1: Update About text group spacing**

In `src/components/About.tsx`, line 15, change:
```tsx
<div className="space-y-2">
```
to:
```tsx
<div className="space-y-4">
```

- [ ] **Step 2: Verify visually**

Run `pnpm dev` and check the About section — the heading, description, and paragraph blocks should have slightly more breathing room.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx
git commit -m "fix: increase About text group spacing for consistency"
```

---

### Task 3: Fix Contact section heading margin

**Files:**
- Modify: `src/components/Contact.tsx:118-143`

The Contact section uses `mb-4` on the `<h2>` element directly, which is inconsistent with all other sections that use `space-y-*` on parent containers. The entire Contact content area also lacks a `space-y-*` wrapper.

- [ ] **Step 1: Refactor Contact layout spacing**

In `src/components/Contact.tsx`, replace the outer `<div>` (lines 118-143) content. Change:
```tsx
<div>
  <h2 className="mb-4">Contato</h2>

  <p>
    Entre em contato através do meu email{" "}
    <Button className="p-0 text-base" variant="link" asChild>
      <a href="mailto:vinicius.dsc95@gmail.com">
        vinicius.dsc95@gmail.com
      </a>
    </Button>
  </p>

  <p>
    Para mais informações, baixe o meu{" "}
    <Button className="p-0 text-base" variant="link" asChild>
      <a href={cvUrl} download="vinicius_costa_cv.docx">
        currículo
      </a>
    </Button>
  </p>

  <ButtonGroup className="mt-8">
    <LinkedInButton />
    <GitHubButton />
  </ButtonGroup>
</div>
```
to:
```tsx
<div className="space-y-4">
  <h2>Contato</h2>

  <p>
    Entre em contato através do meu email{" "}
    <Button className="p-0 text-base" variant="link" asChild>
      <a href="mailto:vinicius.dsc95@gmail.com">
        vinicius.dsc95@gmail.com
      </a>
    </Button>
  </p>

  <p>
    Para mais informações, baixe o meu{" "}
    <Button className="p-0 text-base" variant="link" asChild>
      <a href={cvUrl} download="vinicius_costa_cv.docx">
        currículo
      </a>
    </Button>
  </p>

  <ButtonGroup className="mt-8">
    <LinkedInButton />
    <GitHubButton />
  </ButtonGroup>
</div>
```

Key changes:
- Added `space-y-4` to the wrapper `div`
- Removed `mb-4` from `<h2>`
- The `mt-8` on `ButtonGroup` is kept as it provides intentional extra space before the social links

- [ ] **Step 2: Verify visually**

Run `pnpm dev` and check the Contact section — the heading, paragraphs, and button group should have consistent vertical spacing.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "fix: normalize Contact section spacing with space-y wrapper"
```

---

## Final Verification

- [ ] **Step 1: Run build and lint**

```bash
pnpm build && pnpm lint
```

Expected: No errors or warnings.

- [ ] **Step 2: Visual review of all sections**

Run `pnpm dev` and scroll through each section (Hero, About, Skills, Experience, Contact) to verify consistent spacing.

- [ ] **Step 3: Final commit (if any fixups needed)**

```bash
git add -A && git commit -m "fix: final spacing consistency adjustments"
```
