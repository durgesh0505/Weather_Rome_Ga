# Project Understanding Task — 2026-09-29

Owner: Claude Code
Status: ✅ Complete

## Scope
Read-only analysis of the Weather Dashboard. No application code changes.

## Steps
| # | Step | Status |
|---|------|--------|
| 1 | Read index.html, weather.js, weather-icons.js, dark-theme.css | ✅ |
| 2 | Read Talk.md history, learn.md, git log | ✅ |
| 3 | Create Table_of_Contents.md | ✅ |
| 4 | Create RULEBOOK.md from real incidents in Talk.md/learn.md | ✅ |
| 5 | Create project CLAUDE.md that @-imports RULEBOOK.md | ✅ |
| 6 | Append Claude Code entry to Talk.md | ✅ |

## Findings (open items, not fixed)
| # | Finding | File |
|---|---------|------|
| 1 | "Current" temp is NWS hourly forecast period 0, not a measured observation | weather.js `updateCurrentWeather` |
| 2 | No retry on NWS failure; next attempt is 5 min later | weather.js `fetchWeatherData` |
| 3 | `probabilityOfPrecipitation.value \|\| 0` shows `0%` when NWS returns null | weather.js (3 places) |
| 4 | Page never self-reloads; deployed JS/CSS changes need manual TV reload | weather.js `init` |
| 5 | Whole neumorphic library (11 CSS files via @import) loads; only variables, dark theme, spinner, alert used | UI_Design_Update/neumorphic-ui.css |
| 6 | Grid point FFC/20,107 hard-coded | weather.js `NWS_API` |
| 7 | learn.md untracked in git | repo root |
