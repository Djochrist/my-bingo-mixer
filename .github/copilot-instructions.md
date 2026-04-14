---
description: Workspace instructions for the Bingo Mixer repository. Use when modifying source code, adding features, updating styles, or running build/test tasks.
applyTo: "**"
---

# Bingo Mixer Workspace Instructions

## What this repo is
- A Vite + React + TypeScript single-page app.
- Uses Tailwind CSS v4 via `@import "tailwindcss"` in `src/index.css`.
- Implements a social bingo game with a start screen, board UI, and bingo modal.

## Key scripts
- `npm install` — install dependencies
- `npm run dev` — start the local development server
- `npm run build` — build production assets
- `npm run lint` — run ESLint across the repo
- `npm run test` — run Vitest tests

## Core app structure
- `src/main.tsx` — app entry point
- `src/App.tsx` — top-level page flow
- `src/hooks/useBingoGame.ts` — game state, localStorage persistence, and bingo flow
- `src/components/` — UI concerns
  - `StartScreen.tsx`
  - `GameScreen.tsx`
  - `BingoBoard.tsx`
  - `BingoSquare.tsx`
  - `BingoModal.tsx`
- `src/utils/bingoLogic.ts` — board generation, toggle logic, win detection
- `src/utils/bingoLogic.test.ts` — core logic tests
- `src/test/setup.ts` — Vitest/jsdom test setup

## Development conventions
- Keep UI and business logic separate: UI belongs in `components`, logic belongs in `hooks` or `utils`.
- Preserve immutability in board updates and game logic.
- Rely on existing component patterns rather than inventing new layouts for small UI changes.
- Use the built-in Tailwind v4 conventions and available utility classes.
- Keep GitHub Pages compatibility in mind: `vite.config.ts` sets `base` from `VITE_REPO_NAME` when present.

## Helpful repo references
- `README.md` — project overview and run instructions
- `workshop/GUIDE.md` — lab guide for onboarding and tasks
- `.github/prompts/setup.prompt.md` — workspace setup agent prompt
- `.github/instructions/frontend-design.instructions.md` — frontend design guidance
- `.github/instructions/tailwind-4.instructions.md` — Tailwind v4 guidance

## When you need to make changes
- For UI changes, start by inspecting the relevant component in `src/components/`.
- For state or game behavior changes, inspect `src/hooks/useBingoGame.ts` and `src/utils/bingoLogic.ts`.
- For styling changes, use Tailwind utilities and CSS in `src/index.css`.
- Run `npm run lint`, `npm run build`, and `npm run test` before finalizing changes.

## Agent guidance
- Prefer linking to existing docs and prompts rather than duplicating full workshop content.
- Keep workspace instructions concise and focused on the repo's actual patterns.
- Use the `workshop/` docs and existing `.github/instructions/` files as authoritative references.
