# UI Fixes P0 + P1 Task — 2026-09-29

Owner: Claude Code
Status: ✅ Complete (uncommitted, awaiting user review)
Approved by user: "all" (the 5 confirmed findings in `opendesign-ui-analysis-findings.md`). TV = LCD/LED → burn-in protection dropped (low image-retention risk).

## Steps
| # | Fix | Files | Status |
|---|-----|-------|--------|
| 1 | Night icons: `getWeatherIcon(forecast, isDaytime = true)`; clear/mostly clear/partly cloudy at night → 🌙, mostly cloudy at night → ☁️, light rain/drizzle at night → 🌧️; check "mostly/partly sunny" before "sunny" so 🌤️ is reachable | `weather-icons.js`, callers in `weather.js` | ✅ |
| 2 | Real current conditions from `https://api.weather.gov/stations/KRMG/observations/latest` (°C → °F, humidity, textDescription). Fall back to hourly period 0 if obs missing, null, or older than 2 h. Show source in footer. Precip % stays from forecast | `weather.js` | ✅ |
| 3 | Amber reduction (color only): `.location` → cream, `.detail-value` → cream, `.temp-low` → dim tan. Amber kept for `.feels-like` + `.hourly-temp` | `index.html` | ✅ |
| 4 | Visible card edges: new token `--neu-card-border` (`#5A4430` dark, 2.04:1; `#b8c2d0` light; `#4a4a4a` OS-dark pre-JS block) + `border: 1px solid` on `.header`, `.current-card`, `.detail-item`, `.hourly-item`, `.daily-item` | `dark-theme.css`, `variables.css`, `index.html` | ✅ |
| 5 | Error alert contrast: `#errorContainer .alert.error { color: #18120D; }` (3.03 → 6.13:1) | `index.html` | ✅ |
| 6 | Verify: `node --check`, icon unit test vs live NWS strings, headless Chrome zero-overflow at 1920x1080 / 1366x768 / 1280x720 + screenshots | — | ✅ |
| 7 | Docs: findings, Talk.md, TOC | — | ✅ |

## Known limits
KRMG METAR temps are often whole °C → °F display moves in ~2 °F steps. Observation can lag up to ~1 h (hourly METAR).

## Verification results
| Check | Result |
|---|---|
| `node --check weather.js`, `weather-icons.js` | ✅ pass |
| Icon test vs live NWS hourly + daily strings | ✅ 0 night periods get ☀️/🌤️/⛅/🌦️; "Mostly Sunny" → 🌤️ |
| Headless Chrome 1920x1080, 1366x768, 1280x720 | ✅ overflow X/Y = 0, 5 hourly + 5 daily rows, 0 clipped cards |
| Live KRMG path | ✅ 82°F "Clear", footer "Observed 2:20 PM at KRMG" |
| Fallback path (obs URL broken) at 1280x720 | ✅ 84°F forecast, footer "Current from NWS forecast (station data unavailable)", no error banner, footer 1 line |
| Screenshot 1920x1080 | ✅ borders visible, cream location/details, red high vs tan low |

## New limitation found
NWS `isDaytime` is a fixed 06:00–17:59 window (verified on live hourly data), not real sunrise/sunset → icons can show 🌙 before sunset (summer evenings) or ☀️ after dark (winter 5:30–6 PM). Exact fix = compute sunrise/sunset for 34.257,-85.165 in JS. Not done — needs user approval.
Pre-existing quirk kept: "Slight Chance…" contains substring `light` → 🌦️ by day.
