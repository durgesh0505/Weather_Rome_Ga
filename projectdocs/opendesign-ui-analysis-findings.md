# OpenDesign UI Analysis — Findings (2026-09-29)

Source: OpenDesign Cloud project `rome-ga-weather-dashboard`, Critique plugin, report file `critique.html` (25 KB, lives in OpenDesign, not in this repo). Run took ~4 min, exit 0.
Input: single bundled `index.html` (repo index.html + weather.js + weather-icons.js + only the 5 used UI_Design_Update CSS files). ⚠️ Line numbers in the OD report refer to that bundle, NOT repo files — use the repo mapping column below.

## 📊 Scores
| Dimension | Score | Band |
|---|---|---|
| Philosophy consistency | 7/10 | Strong |
| Visual hierarchy | 5/10 | Functional |
| Detail execution | 7/10 | Strong |
| Functionality | 6/10 | Functional |
| Innovation | 5/10 | Functional |
| **Mean** | **6.0/10** | "production-grade, not glanceable-grade" |

## ✅ Verified findings (Claude Code checked each against code + math)
| # | Pri | Finding | Verdict | Evidence | Repo location |
|---|---|---|---|---|---|
| 1 | P0 | Sun icon at night | ✅ Confirmed | Live NWS: 36 of 156 hourly periods are "Clear"/"Mostly Clear" with `isDaytime:false` → ☀️. OD mis-stated one detail: "Mostly Sunny" returns ☀️ (not 🌤️) because `'sunny'` matches first; the 🌤️ `mostly sunny`/`partly sunny` branch is dead code | `weather-icons.js` `getWeatherIcon`; callers in `weather.js` must pass `period.isDaytime` |
| 2 | P0 | Big "current" temp is forecast period 0, not observation | ✅ Confirmed | `data.hourly[0]`; nearest station verified via `/gridpoints/FFC/20,107/stations` = `KRMG` (Rome, R. B. Russell Airport) | `weather.js` `updateCurrentWeather` |
| 3 | P1 | Amber used for 7 unrelated things → no color hierarchy | ✅ Confirmed | Amber vs cream text 1.50:1; amber low vs red high 1.65:1 | `index.html`: `.location`, `.feels-like`, `.detail-value`, `.hourly-temp`, `.daily-temps`, `.temp-low` |
| 4 | P1 | Neumorphic shadows invisible on dark base | ✅ Confirmed | Light shadow 1.11:1, dark shadow 1.03:1 vs `#18120D`. OD fix `rgba(70,54,40,0.6)` only reaches 1.30:1 → weak; a 1px border is the stronger option | `UI_Design_Update/themes/dark/dark-theme.css` `--neu-light` |
| 5 | P1 | Error alert contrast fails AA | ✅ Confirmed | White on `#f56565` = 3.03:1; `#18120D` on `#f56565` = 6.13:1 | `UI_Design_Update/components/feedback/feedback.css` `.alert.error` |

## ❌ / ⚠️ OD claims rejected or needing a decision
| OD claim | Verdict | Reason |
|---|---|---|
| Gate `float` animation behind `prefers-reduced-motion` | ❌ Ineffective | TV PC has OS default (reduce-motion off) → icon keeps animating. Real fix: remove or slow `.weather-icon` animation in `index.html` |
| "Raise `.daily-temps` so highs read like the hourly column" | ❌ Wrong | `.hourly-temp, .daily-temps` share one rule; sizes are identical |
| Burn-in "guaranteed" (P0) | ⚠️ Overstated | Depends on panel type. LCD = low image-retention risk; plasma/OLED = real risk. TV type unknown — ask user |
| Delete theme toggle button | ⚠️ User decision | Conflicts with the 2026-03-29 "no element removal" decision |
| Replace emoji with inline SVG icons | ⚠️ Low value | Single fixed Windows PC renders Segoe UI Emoji consistently; only worth it if icons look bad on the TV |
| `.temp-low` recolor | ⚠️ Self-contradicting | OD Fix list says `var(--neu-text)`, Quick-wins says `var(--neu-text-dim)` — pick one |

## ✅ OD "Keep" list (agreed)
Warm palette (all text ≥ 6.1:1), `clamp()` type scale, `min-height:0` + 820/720px height breakpoints, live canvas favicon, `no-store` 5-min refresh.

## ✅ Status
All 5 confirmed findings fixed on 2026-09-29 (see `ui-fixes-p0-p1-task.md`). Burn-in dropped: TV is LCD/LED.
