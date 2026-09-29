# RULEBOOK — Weather Dashboard

## Universal
| Rule | Why |
|------|-----|
| When user says "color/theme only", change only color tokens and theme default; no typography, layout, motion, or element removal | 2026-03-29: TV plan drifted into density reduction and layout changes; user restated scope twice (Talk.md 12:52) |
| Write a proposal in `projectdocs/` and wait for approval before code when user asks for a proposal first | 2026-03-29 forecast text: user required proposal before 2x–3x change; literal 2x–3x did not fit constraints |
| Verify every claim from another agent or OpenDesign critique against current code, recomputed math, and pre-change state (`git show HEAD~1:<file>`) before fixing or relaying | 2026-03-29: `.weather-description` mis-attributed as regression; 2026-09-29: OD critique claimed daily temps smaller than hourly (same rule) and proposed a `prefers-reduced-motion` fix that does nothing on the TV PC |
| Append to Talk.md only at end of file; never insert mid-file | Codex 13:05 entry landed after 13:46 entry, breaking chronological order |

## Layout / TV display
| Rule | Why |
|------|-----|
| Target: browser on PC → 30–40 in 1080p TV, ~20 ft, fullscreen all day; not Android TV | Early research used Android TV guidance and had to be redone (learn.md 12:27) |
| Fit via `100dvh` budget + `min-height: 0` on flex/grid children + `minmax(0, …)` tracks; never hide overflow with hidden scrollbars | Commit 82c3fe8 hid scrollbars instead of fixing overflow; real fix came in e64e6c9 |
| Any size change: verify zero document overflow at 1920x1080, 1366x768, 1280x720 before claiming done | These three viewports are the established baseline in every findings doc |
| Increasing text in one region: pay for it by shrinking spacing in that same region only | Global rescales destabilized center block; region-only pass worked (learn.md 13:34) |
| Keep 5 hourly rows, 5 daily rows, 3-column layout unless user relaxes it | User locked these constraints; 2x–3x forecast text was rejected because it broke them |

## Theme / color
| Rule | Why |
|------|-----|
| Dark theme is default on load; warm palette lives in `[data-theme="dark"]` in `UI_Design_Update/themes/dark/dark-theme.css` | Aged TV has permanent blue tint; blue accent #4a9eff was unreadable |
| No blues, cool grays, pure white, or warm teal in dark palette | Teal #4DB6AC flagged unreliable on blue-shifted panel (Talk.md 12:39 review) |
| Card edges use `border: 1px solid var(--neu-card-border)` (`#5A4430`, 2.04:1); don't rely on neumorphic shadows alone in dark theme | 2026-09-29: shadows measured 1.03–1.11:1 vs `#18120D`, so cards looked flat |
| Amber `--neu-accent` only on `.feels-like` + `.hourly-temp`; location/detail values use `--neu-text`, daily low uses `--neu-text-dim` | 2026-09-29 OD critique: amber on 7 elements, 1.50:1 vs text, so there was no color hierarchy |
| Initial HTML icon in `#themeToggle` must match default theme (`☀️` for dark) | Wrong `🌙` flashed on first paint before weather.js ran |

## Data / NWS
| Rule | Why |
|------|-----|
| Build daily rows by date key from NWS periods; never assume fixed day/night index order | Hard-coded periods 2–11 mispaired forecasts when first period was night (fixed e64e6c9) |
| Use `fetch(..., { cache: 'no-store' })` for freshness; never wipe cookies/storage/caches | Commit 2474a4a wiped all storage twice per load; removed in e64e6c9 |
| Current temp/humidity/condition come from `stations/KRMG/observations/latest` (°C → °F); fall back to hourly period 0 only when obs is missing, null, or > 2 h old, and show the source in the footer | 2026-09-29: big temp was forecast period 0 (84°F) while KRMG measured 82°F |
| NWS `isDaytime` = fixed 06:00–17:59, not sunrise/sunset; don't treat it as real daylight | 2026-09-29: screenshot showed 🌙 at 6 PM and 7 PM with sunset ~7:25 PM |
| Pass `isDaytime` to `getWeatherIcon(desc, isDaytime)` on every call; check 'mostly/partly sunny' and 'mostly clear' before 'sunny'/'clear' | 2026-09-29: 36 of 156 hours showed ☀️ at night and the 🌤️ branch was unreachable |

## Deploy / GitHub Pages
| Rule | Why |
|------|-----|
| Before changing `CNAME`, confirm `nslookup -type=CNAME <domain> 8.8.8.8` resolves to `durgesh0505.github.io`; Cloudflare record must be DNS-only (grey cloud) so GitHub can issue HTTPS | 2026-09-29: switch to `weather.chiggi.net` found both `.net` and old `.us` NXDOMAIN; an active custom domain makes github.io redirect to a dead name |

## Session hygiene
| Rule | Why |
|------|-----|
| Keep `index.html` default favicon as inline SVG data URI | Empty href caused `/favicon.ico` 404 on every load |
| Create `projectdocs/<task>-task.md` before any change; close it with a `-findings.md` | Established workflow across all 2026-03-29 passes |
| Check MCP availability with `"$APPDATA/npm/claude.cmd" mcp list` from the project dir before claiming a server is added; `claude` is not on Git Bash PATH | 2026-09-29: opendesign was registered only at local scope `C:/Users/durge`, so it was missing in Weather_App and the UI analysis was blocked |
| MCP config changes need a Claude Code restart before tools load | 2026-09-29: opendesign showed ✔ Connected in `mcp list` but ToolSearch still found nothing in the running session |
| OpenDesign line numbers refer to the uploaded bundle, not repo files; map by selector/function name before editing | 2026-09-29 critique cited bundle lines 320, 663, 796 that do not exist at those positions in repo files |
