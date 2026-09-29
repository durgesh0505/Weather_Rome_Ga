# CSS Direct Links Task (Option B) — 2026-09-29

Owner: Claude Code
Status: ✅ Complete (local commit; deploy blocked until Pages Source is fixed)
User choice: option B, as "5 direct `<link>` tags" (not a combined file, to avoid a drifting copy).

## Why
`index.html` → `UI_Design_Update/neumorphic-ui.css` → 13 `@import`s. Imports are fetched in parallel, but only after the entry CSS arrives (one extra round-trip). 8 of the 13 files are unused by this page (~47 KB).

## Steps
| # | Step | Status |
|---|------|--------|
| 1 | Prove the 8 dropped files (physics, buttons, cards, controls, data-display, forms, navigation, utilities) have no rules that match this page: element, universal, `:root`, attribute, or used class selectors | ✅ |
| 2 | Replace the single `<link>` with 5 links in the original import order: `core/variables.css`, `core/base.css`, `themes/dark/dark-theme.css`, `components/feedback/feedback.css`, `components/layout/layout.css` | ✅ |
| 3 | Leave `neumorphic-ui.css` and all library files untouched (other projects/docs can still use the entry file) | ✅ |
| 4 | Verify: headless Chrome computed-style diff, old vs new, every element, both themes → 0 visible differences; request count. Separate 3-viewport overflow run NOT done: diff ran at 1920x1080 only; other viewports rely on the dropped files having no media-query rules that match this page (selector scan) | ✅ |
| 5 | Docs + local commit (deploy is blocked until Pages Source is fixed) | ✅ |

## Results
| Check | Result |
|---|---|
| Dropped files vs page | ✅ No class/element/universal matches. `physics.css` `:root` vars and `@keyframes float` are unused (index.html defines its own `float` later) |
| Computed-style diff, 115 elements, dark + light | ✅ Only `--physics-tension/-mass/-friction` differ (unused custom props, 115 × 3 × 2 = 690). Zero visible-property diffs |
| CSS requests | 14 → 5; no extra round-trip through `neumorphic-ui.css` |
| Library files | Untouched; `neumorphic-ui.css` still works for anything else that imports it |
