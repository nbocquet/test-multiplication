# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An Angular multiplication table quiz app for school children. Deployed at https://multiplication.classeadeux.fr/. Built with an Nx monorepo structure (the Nx workspace root and `package.json` live in the parent directory — run Nx commands from there).

## Commands

```bash
# Serve the app in development
nx serve multiplication

# Build for production
nx build multiplication

# Run tests for a specific lib
nx test home
nx test test
nx test result
nx test shared-ui
nx test shared-services

# Lint
nx lint multiplication
```

## Architecture

**Monorepo layout:**
- `apps/multiplication/` — Angular app shell (routing, layout, NgRx providers)
- `libs/home/` — Settings page (select tables, set time per question)
- `libs/test/` — Quiz engine (store, component store, effects, constants)
- `libs/result/` — Results page with PDF export (jsPDF)
- `libs/shared/ui/` — Reusable UI components (`@classe-a-deux/shared-ui`)
- `libs/shared/services/` — Shared pipes (`@classe-a-deux/shared-services`)

**Path aliases** (`@classe-a-deux/<lib>`):
- `@classe-a-deux/home`, `@classe-a-deux/test`, `@classe-a-deux/result`
- `@classe-a-deux/shared-ui`, `@classe-a-deux/shared-services`

**App flow:** Home (`/`) → Test (`/test`) → Result (`/result`)

**State management (NgRx):**
- Global store feature (`testFeature` in `libs/test/src/lib/test/test.store.ts`): holds `tables: Multiplication[]`, `selectedTable: number[]`, `nom: string`, `time: number`
- Local component store (`TableMultiplicationComponentStore` in `libs/test/src/lib/test/test.component-store.ts`): manages per-session quiz state (current answer, countdown progress, question counter, validation indicator)
- Effects (`libs/test/src/lib/test/test.effects.ts`): sync `time` and `selectedTable` to `localStorage`; rebuild the `tables` array whenever selected tables change

**Key data type** (`Multiplication` in `libs/test/src/lib/test/test.constante.ts`):
```ts
{ id: number; question: string; result: number; answer: number }
```
`result` is the correct answer; `answer` is filled in by the user during the quiz.

**Quiz timer:** `progress` effect uses `interval(25ms)` and fires `validate()` when elapsed ticks equal `200 * (time / 5)` — i.e., 200 ticks at default 5 s, proportionally scaled for other durations.

**PDF export:** `ResultComponent` uses `jsPDF` to lay out results in columns by table (×2–×9), with green for correct and red for wrong answers.
