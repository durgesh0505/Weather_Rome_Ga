# Dynamic Text Fill + Fullscreen Icon Task — 2026-09-29

Owner: Claude Code
Status: ✅ Complete (local commit, push waits on DNS)
User request: "There is too much empty space. The text should be dynamic and change size accordingly. The fullscreen icon is black so it is not visible with dark theme."

## Root causes
| Problem | Cause |
|---|---|
| Empty space in forecast cards | Font sizes are `clamp(…vw/vh…)` capped at 1.5–2rem; cards grow to ~420x165 px at 1080p but text stops at 24–32 px |
| Empty space in center card | `.current-temp` capped at 9.5rem, `.feels-like` at 2.8rem, `.detail-value` at 2.6rem; card is ~900x900 px at 1080p |
| Black fullscreen icon | `.theme-toggle` sets no `color`; `⛶`/`🗗` are text glyphs → browser default button text color (black) |

## Plan
| # | Step | File | Status |
|---|------|------|--------|
| 1 | `.theme-toggle { color: var(--neu-text); }` | `index.html` | ✅ |
| 2 | `container-type: size` on `.hourly-item`, `.daily-item`, `.current-card`; text sizes in `cqh`/`cqi` via `min()` so text scales with its own card. Keep existing `clamp()` as a fallback declaration first (browsers without container units ignore the second one) | `index.html` | ✅ |
| 3 | Keep locked constraints: 3 columns, 5+5 rows, no removal, zero overflow | — | ✅ |
| 4 | Verify in headless Chrome at 1920x1080 / 1366x768 / 1280x720: document overflow 0, per-card overflow 0 (scrollWidth/scrollHeight), longest strings ("12:00 PM", "100°F", "Wed 12/30", "100° 100°", long condition text), screenshots | — | ✅ |
| 5 | Commit as a 3rd local commit; push with the others after DNS resolves | — | ✅ |

## Browser support gotcha
Container query units need Chrome/Edge 105+ or Firefox 110+. Older browsers keep the old `clamp()` sizes, so the page still works there, just without the fill.

## Final values (`@media (min-width: 901px)` block at end of index.html `<style>`)
| Selector | font-size |
|---|---|
| `.hourly-time` | `min(26cqh, 8.4cqi)` |
| `.daily-day` | `min(26cqh, 9.2cqi)` |
| `.daily-date` | `min(16cqh, 5.7cqi)` |
| `.hourly-icon, .daily-icon` | `min(40cqh, 12cqi)` |
| `.hourly-temp` | `min(32cqh, 9.3cqi)` |
| `.daily-temps` | `min(32cqh, 8.3cqi)` |
| `.precip-info` | `min(17cqh, 6cqi)` |
| `.weather-icon` | `min(21cqh, 22cqi)` |
| `.current-temp` | `min(27cqh, 26cqi)` |
| `.feels-like` | `min(7cqh, 6.5cqi)` |
| `.detail-label` | `min(2.6cqh, 2.4cqi)` |
| `.detail-value` | `min(8cqh, 7cqi)` |

## Verification (headless Chrome, live + stress strings "12:00 PM", "100°F", "Wed 12/30", "100° 100°", "Chance Showers And Thunderstorms")
| Viewport | Doc overflow | Card overflow (stress) | Current temp px (before → after) | Center fill live / stress |
|---|---|---|---|---|
| 1920x1080 | 0/0 | 0 | 152 → 228 | 0.76 / 0.86 |
| 1366x768 | 0/0 | 0 | ~108 → 156 | 0.75 / 0.85 |
| 1280x720 | 0/0 | 0 | ~101 → 148 | 0.76 / 0.87 |
Iterations: first pass overflowed hourly cards by 22–40 px under stress (width-bound) → cut cqi factors ~15% total.
Fullscreen toggle color now `rgb(246, 231, 200)`.

## Limit
Forecast rows are width-bound (`cqi` wins), so cards keep some vertical space at 1080p. Filling more needs wider side columns = locked 3-column ratio → user decision.
