---
name: cyberpunk-neon-design
description: Apply the established Cyberpunk Neon design system for consistent, polished UI across the Bingo Mixer app. Use when modifying UI components, adding new screens, or styling elements.
applyTo: "src/components/**/*.tsx", "src/index.css"
---

# Cyberpunk Neon Design System

## Overview
This app uses a Cyberpunk Neon aesthetic with dark surfaces, luminous accents, and glass panels. The design supports the social, competitive nature of bingo while maintaining modern startup-level polish.

## Core Principles
- **Dark First**: Always start with dark backgrounds and build up with neon accents
- **Glass Panels**: Use translucent surfaces with backdrop blur for depth
- **Neon Accents**: Cyan, violet, and fuchsia for interactive states and highlights
- **Consistent Spacing**: Use Tailwind's spacing scale with rounded-3xl for panels
- **Typography Hierarchy**: Inter font family with precise tracking and leading

## Color Palette

### Theme Tokens (defined in @theme)
```css
--color-surface: #090b14;        /* Deep space background */
--color-surface-soft: #111827;   /* Softer dark surfaces */
--color-panel: #0f172a;          /* Glass panel base */
--color-panel-soft: #111827;     /* Softer panels */
--color-accent: #7c3aed;         /* Primary violet */
--color-accent-light: #a855f7;   /* Lighter violet */
--color-glow: #38bdf8;           /* Cyan glow */
--color-success: #22c55e;         /* Green for wins */
--color-warning: #f59e0b;         /* Amber warnings */
--color-text: #e2e8f0;           /* Primary text */
--color-muted: #94a3b8;          /* Secondary text */
--color-border: rgba(148, 163, 184, 0.18); /* Subtle borders */
```

### Usage Guidelines
- **Backgrounds**: Use radial gradients for atmosphere, not solid colors
- **Text**: White (#e2e8f0) for primary, slate-300 for secondary
- **Interactive States**: Cyan for marked, fuchsia for winning, violet for primary actions
- **Borders**: Always use rgba colors with low opacity for glass effect

## Component Patterns

### Glass Panels
```tsx
<div className="glass-panel rounded-[2rem] border-[rgba(148,163,184,0.14)] p-8">
  {/* Content */}
</div>
```

### Buttons
```tsx
// Primary CTA
<button className="bg-gradient-to-r from-violet-500 via-sky-500 to-cyan-400 px-8 py-4 rounded-full font-semibold text-white shadow-[0_18px_60px_-24px_rgba(59,130,246,0.9)] transition hover:-translate-y-0.5 active:translate-y-0.5">

// Secondary
<button className="rounded-full border border-[rgba(148,163,184,0.14)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-[rgba(255,255,255,0.08)]">
```

### Interactive Elements
```tsx
// Hover states
className="hover:border-[rgba(56,189,248,0.35)] hover:bg-[rgba(71,85,105,0.72)] transition duration-200"

// Active states
className="active:scale-[0.99] active:translate-y-0.5"

// Winning states
className="shadow-[0_0_28px_-12px_rgba(236,72,153,0.7)]"
```

## Layout Guidelines

### Spacing Scale
- Use consistent padding: p-4, p-5, p-6, p-8
- Margins: mb-4, mb-6, mb-8, mb-10
- Gaps: gap-3, gap-4, gap-6

### Typography Scale
- Headings: text-3xl to text-6xl with font-semibold
- Body: text-sm, text-base, text-lg with leading-6 or leading-7
- Small text: text-xs with uppercase tracking-[0.2em] for labels

### Responsive Design
- Mobile-first: Start with mobile styles, add sm: breakpoints
- Grid layouts: grid-cols-5 for bingo board, sm:grid-cols-2 for cards
- Max widths: max-w-md, max-w-3xl, max-w-5xl

## Animation & Motion

### Micro-interactions
- Hover: -translate-y-0.5 for lift effect
- Active: scale-[0.99] for press feedback
- Transitions: duration-200 ease-out for smooth changes

### Winning Celebrations
- Use bounce animations sparingly (only for bingo modal)
- Glow effects for winning states
- Gradient backgrounds for success moments

## Implementation Rules

### Always Include
- Dark color scheme with color-scheme: dark
- Glass panel utility class for consistent surfaces
- Focus-ring-neon for accessibility
- Proper ARIA labels and pressed states

### Never Use
- Light backgrounds or themes
- Generic gray colors (use theme tokens instead)
- Abrupt transitions (always use duration-200+)
- Hard shadows (use soft rgba shadows)

### File Organization
- Global styles in src/index.css
- Component-specific styles inline with Tailwind
- Custom utilities in @layer utilities
- Theme tokens in @theme directive

## Quality Checklist
✅ **Consistent Colors**: All colors from theme tokens
✅ **Glass Effect**: Backdrop blur and translucent surfaces
✅ **Neon Accents**: Cyan, violet, fuchsia for interactions
✅ **Typography**: Inter font with proper hierarchy
✅ **Spacing**: Consistent padding and margins
✅ **Responsive**: Mobile-first with sm: breakpoints
✅ **Accessibility**: Focus rings and ARIA labels
✅ **Performance**: CSS-only animations, no heavy libraries

## When to Apply
Use this design system for:
- New UI components
- Modifying existing screens
- Adding interactive elements
- Creating new pages or modals

This ensures the app maintains its distinctive Cyberpunk Neon aesthetic while remaining polished and professional.
