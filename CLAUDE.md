# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HIS (Hospital Information System) frontend component library — Vue 3 + DevExtreme 25.2 + VitePress docs.
Consumed by business sub-apps via npm install or qiankun `loadMicroApp`.

## Commands

```bash
# Quality gate (MUST pass before any commit)
npm run check:all        # type-check + test + build + docs:build

# Quick check (no build)
npm run check:quick      # type-check + test

# Individual checks
npm run type-check       # vue-tsc --noEmit
npm run test             # vitest run
npm run test:watch       # vitest (watch mode)
npm run test:coverage    # vitest run --coverage
npm run build            # vue-tsc --noEmit && vite build
npm run docs:build       # vitepress build docs

# Development
npm run dev              # vite dev server on :5001
npm run docs:dev         # vitepress dev server

# Linting & formatting
npm run lint             # eslint .
npm run lint:fix         # eslint . --fix
npm run format           # prettier --write src/**/*.{ts,vue,css}
```

## Architecture

### Dual Entry Points

- **`src/index.ts`** — npm package entry. Exports all components, hooks, utils, types, constants, directives, event-bus. Used by sub-apps via `import { ... } from 'df-web-base'`.
- **`src/main.ts`** — qiankun lifecycle entry. Exports `bootstrap/mount/unmount` for micro-app loading. Also exposes `window.DfWebBase` in standalone mode.

### Plugin System (`src/install.ts`)

`createDfUI(options)` returns a Vue plugin that:
1. Configures DevExtreme globals (locale, currency, editorStylingMode)
2. Provides `DfUIOptions` via Vue injection key `DF_UI_KEY`
3. Registers all components globally via `registerGlobalComponents(app)`
4. Registers directives (e.g. `v-permission`)

Components access injected services via `inject(DF_UI_KEY)`. The library is **fully decoupled from business logic** — all infrastructure (http, auth, dict, tenant) is injected by the consuming app.

### Component Organization (src/components/index.ts)

~100+ components organized in batches:
- **Original**: DfTable, DfForm, DfSelect, DfDialog, DfButton, DfInput
- **Batch 1-2**: Pure CSS components (DfTag, DfBadge, DfCard, DfAlert, etc.)
- **Batch 3**: DevExtreme wrappers (DfDatePicker, DfInputNumber, DfTabs, DfDrawer)
- **Batch 4**: Composite (DfTree, DfUpload, DfTransfer, DfCascader)
- **Batch 5-7**: Navigation, feedback, miscellaneous
- **Batch 8-14**: DevExtreme advanced (DfChart, DfScheduler, DfDiagram, DfGantt, etc.)
- **Batch 15**: Layout components (DfSearchLayout, DfDetailLayout, DfAppShell, etc.)
- **HIS business**: DfPatientStrip

Function-call components (DfMessage, DfMessageBox, DfNotification) are **not globally registered** — import them on demand.

### Hooks (src/hooks/)

| Hook | Purpose |
|------|---------|
| `useDfUI` | Access injected `DfUIOptions` |
| `useHttp` | Pre-configured axios via `options.http` |
| `useTable` | DfTable state management |
| `useForm` | DfForm data management |
| `usePermission` | Permission checks via `options.permission` |
| `useDict` | Dictionary resolution via `options.dict` |
| `useTenant` | Tenant context via `options.tenant` |
| `useNotification` | DfNotification wrapper |
| `useLoading` | Loading state management |
| `useDebounce/useDebounceFn` | Debounce values/functions |
| `useClipboard` | Clipboard access |

### Testing Setup

- **Vitest + jsdom** with globals enabled
- All DevExtreme components are stubbed in `tests/setup.ts` using `vi.mock()` — tests never render real DevExtreme
- Path alias `@/` → `src/`
- Coverage: 65% statements/branches, 40% functions (lower because DevExtreme internals can't be tested)
- Run single test: `npx vitest run tests/path/to/test.ts`

### Build Output

UMD library format (`dist/df-web-base.umd.js`). All heavy deps (vue, devextreme, axios, dayjs, xlsx, exceljs) are **external** — the consuming app must provide them.

## Creating New Components

```bash
npx tsx scripts/scaffold-component.ts df-xxx-name
```

Generates: `DfXxxName.vue` + `types.ts` + `index.ts` + doc page + auto-registers in `src/components/index.ts`.

## Key Conventions

### Component File Structure
```
df-component-name/
├── DfComponentName.vue   # <script setup lang="ts"> with defineOptions({ name: 'DfComponentName' })
├── types.ts              # export DfComponentNameProps, DfComponentNameEmits
└── index.ts              # export component + types
```

### CSS Variables
New format: `--df-{category}-{property}` (e.g. `--df-color-bg-page`, `--df-spacing-sm`)
Old format (`--df-bg-color`) is deprecated — do not use.

### Demo Documentation
**No inline styles in demos.** Use `demo-utilities.css` classes: `.demo-frame`, `.demo-form`, `.demo-tbl`, `.demo-tag`, `.demo-toolbar`, etc. See `docs/.vitepress/theme/DEMO_STYLE_GUIDE.md`.

### Layout Density Modes
Layout components support `compact` (HIS default) and `default` modes via CSS classes `.df-xxx--compact` / `.df-xxx--default` and `--d-*` custom properties.

## Pitfalls

1. **DfDataGrid does not exist** — the library uses `DfTable` (wraps DxDataGrid)
2. **DevExtreme SSR**: Component registration must be inside `!import.meta.env.SSR` in docs
3. **Text color** is `#1A1A1A`, not `#333` or `#1A2030`
4. **DfDetailLayout compact body padding** is 20px, not 16px
5. **DemoBlock** is a flex container — layout components need `flex-basis: 100%`
6. **VitePress docs** can use globally registered components directly in `<script setup>`
