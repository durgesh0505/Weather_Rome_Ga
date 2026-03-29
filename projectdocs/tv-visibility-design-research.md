# TV Visibility Design Research
**Date:** 2026-03-29
**Last updated:** 2026-03-29 — corrections applied from Codex review; user constraints confirmed
**Context:** Weather Dashboard displayed full-screen in a browser on an aged TV with a persistent blue tint.
**Purpose:** Inform color and theme changes before any code is written.

---

## Confirmed Constraints (User-Provided)

| Constraint | Value |
|---|---|
| TV size | 30–40 inches |
| Viewing distance | ~20 feet |
| Usage pattern | Full-screen, all day |
| Implementation scope | **Color and theme changes only — no layout or element changes** |
| Platform | Browser on PC-connected TV (not a native TV app) |

---

## 1. Root Cause — Why the TV Has a Blue Tint

> **Note (corrected from original):** The exact hardware failure mode cannot be diagnosed from software alone. The following is the most common mechanism for this symptom, not a confirmed diagnosis of this specific panel.

The most common cause of persistent blue tint on aged LED-backlit TVs is degradation of the phosphor layer on the LED backlight. That phosphor converts raw blue LED light into warm white light. Over years of use, heat and photon bombardment cause the phosphor to degrade, leaving the raw blue light to dominate. This shifts the white point from the intended ~6500K toward a visibly cooler ~8000–10000K range. Other causes (failing T-con board, white balance drift) produce the same visible result. The design response is identical regardless of root cause.

**Effect on the display:** Every color rendered on screen is perceived through a blue wash. Cool colors merge into it and lose contrast. Warm colors resist the tint and maintain or gain perceived contrast.

---

## 2. How the Blue Tint Affects the Current App

The current app defaults to a **light neumorphic theme** built on neutral grays and whites. This is the worst starting point for a blue-shifted screen.

| Current UI Element | Effect on Blue-Tinted TV |
|---|---|
| Light gray neumorphic surfaces | Absorb blue tint → appear icy, flat, shadows lose depth |
| Neutral white backgrounds | Look cold and bluish |
| Neumorphic shadow/highlight contrast | Both tones shift cool — depth becomes invisible |
| Any blue/cyan/purple accent | Blends directly into the tint — effectively invisible |
| Cool gray text | Perceived as blue-gray, low contrast |
| Pure white text | Appears cold blue rather than clean white |

---

## 3. Core Design Principle for This TV

> **Warm colors resist the tint. Cool colors disappear into it.**

The blue tint acts as a constant additive overlay. Warm-wavelength colors (amber, orange, gold, cream) retain perceived contrast because they are opposite the tint on the color spectrum. Cool colors lose contrast because they merge with it.

**Dark backgrounds are required for this screen.** A dark base gives warm-colored text maximum contrast headroom. A light base eliminates contrast room — warm text on a light background reads as low-contrast beige on icy white.

---

## 4. Canonical Color Palette

> **This is the reference palette for implementation.** Codex's values (`tv-visibility-fix-plan.md` Section 5) are the authoritative source — they are more conservative and better tuned for bleed/halation on aged panels. Both sets are included below for traceability; Codex's values should be used in code.

### Backgrounds

| Role | Codex (Use This) | Original Research | Notes |
|---|---|---|---|
| Page background | `#18120D` | `#1C1610` | Warm brown-black; resists blue absorption |
| Card / widget surface | `#241B14` | `#2A2118` | Warm dark base for neumorphic surfaces |
| Neumorphic shadow (dark side) | `#120D09` | `#151009` | Warm shadow — not cool black |
| Neumorphic highlight (light side) | `#33271E` | `#332820` | Warm lifted tone for neumorphic depth |
| Dividers / borders | `#3B2C20` | `#3D2E1E` | Barely-visible warm border |

### Text

| Role | Codex (Use This) | Original Research | Notes |
|---|---|---|---|
| Primary text / key data | `#F6E7C8` | `#FFF8E7` | Warm cream — avoids cold-white cast |
| Secondary labels | `#D8BD8A` | — | Warm tan; readable at distance |
| Muted / tertiary info | `#9E835A` | `#C8960C` | Warm mid-tone |
| Critical numeric emphasis | `#FFD166` | `#FFB300` | Lighter amber — less bleed risk on aged panels |

### Accent Family

| Role | Codex (Use This) | Original Research | Notes |
|---|---|---|---|
| Primary accent | `#FFB000` | `#FFA726` | Warm amber; focal emphasis |
| Hot / alert accent | `#FF8A00` | `#FF8F00` | Deep orange; high temperature or alerts |
| Secondary positive | `#D9A441` | `#FFD54F` | Warm gold; lower intensity emphasis |

### Precipitation / Rain Encoding

> **Correction from Codex review:** The original research proposed warm teal `#4DB6AC` for precipitation. This is incorrect. On a blue-shifted panel, any teal-family color retains enough blue content to lose contrast and semantic clarity. **Do not use teal or any cool-family color for data encoding on this TV.**

Precipitation meaning should be carried by **weather icons and text labels first**. The existing `weather-icons.js` already provides semantic icons for rain, snow, thunderstorms, etc. Color is a secondary reinforcement only, and if needed, use a warm muted tone from the existing palette rather than a dedicated cool accent.

### Colors to Avoid Completely

| Color Type | Why |
|---|---|
| Any blue (`#0000FF`, `#1976D2`, `#2196F3`, etc.) | Merges into tint — invisible |
| Cyan / teal (any saturation) | Retains blue content — loses contrast |
| Purple / violet | Absorbed by tint |
| Cool grays (`#808080`, `#9E9E9E`, `#BDBDBD`) | Read as lavender/blue on this TV |
| Pure white (`#FFFFFF`) | Appears icy cold blue |
| Saturated red (`#FF0000`) | Bleeds and halates on aged panels |

---

## 5. Typography Observations

> **Reference basis corrected:** Original research cited Android TV guidelines. This is a browser-on-TV, not a native TV app. The sizing observations below are derived from large-screen browser dashboard guidance and passive-viewing signage references.

At 30–40 inches diagonal, 20 feet away, this screen sits at the harder end of the readable range for dense data. These notes remain useful for risk assessment, but typography changes are not part of the currently approved implementation scope.

| Element | Recommended Size | Weight | Notes |
|---|---|---|---|
| Temperature (main number) | `clamp(3.5rem, 7vw, 8rem)` | 700 | Absolute dominant read at 20 feet |
| City / location name | `clamp(1.5rem, 2.5vw, 2.8rem)` | 600 | Key orientation anchor |
| Condition text ("Partly Cloudy") | `clamp(1.2rem, 2.2vw, 2.2rem)` | 500 | Critical secondary context |
| Hourly / daily labels | `clamp(1.1rem, 1.8vw, 1.8rem)` | 500 | Must be readable at 20 feet — currently risky |
| Humidity, wind, UV data | `clamp(1rem, 1.6vw, 1.6rem)` | 500 | Minimum floor — do not go below |
| Section titles | `clamp(1.2rem, 2vw, 2rem)` | 600 | Clear section separation |

**Critical note:** Thin weights and small labels are a documented risk at this viewing distance even if the color palette is corrected. If readability remains poor after in-scope color/theme changes, typography would need separate approval.

---

## 6. Neumorphic System — What Changes, What Stays

The neumorphic CSS framework (`UI_Design_Update/`) does not need to be discarded. The depth technique works on dark backgrounds.

**What must change (CSS variable reassignments only):**
- `--neu-base` and surface variables → warm dark values from Section 4
- `--neu-shadow-dark` → deep warm brown (`#120D09`), not cool black
- `--neu-shadow-light` → warm lifted dark (`#33271E`), not cool gray-white
- All text color variables → warm palette values from Section 4
- Any cool-toned accent variables → replace with warm equivalents

**What stays exactly the same:**
- Shadow distance, blur, and spread values (the geometry of neumorphism)
- Layout structure, grid, component shapes
- The CSS variable system itself (values change, not the variable names)
- All HTML structure
- All JavaScript logic

---

## 7. Theme Default

The current `initTheme()` in `weather.js` forces **light** on every page load. This must change to **dark** as the startup default for this TV. The manual toggle can remain for occasional use, but dark + warm is the required out-of-the-box state.

---

## 8. Implementation Scope

**Scope is strictly color and theme. No layout changes. No element removal. No typography changes. No motion changes. No JS logic changes beyond the theme default.**

| File | Change |
|---|---|
| `UI_Design_Update/core/variables.css` | Reassign all color variables to warm dark palette (Section 4) |
| `UI_Design_Update/themes/dark/dark-theme.css` | Make this the primary active palette; verify all variables are covered |
| `weather.js` | Change `initTheme()` to default `dark` instead of `light` |
| `index.html` | Audit for any hardcoded color values or inline styles that would override variables |

Estimated files touched: **3–4**. No structural HTML changes. No JS logic changes beyond one line in `initTheme()`.

---

## 9. Validation (After Coding)

Must be done on the actual TV at normal viewing distance. Desktop-only review is not acceptable for this problem.

1. Current temperature is readable instantly from 20 feet — no leaning forward
2. Hourly and daily labels are legible — not a blur
3. Text does not appear icy, lavender, or washed out
4. Card edges and shadows are still distinguishable on the TV
5. No critical information near the screen edges is clipped or softened
6. Weather meaning is clear through icons and labels, not relying on cool-family colors
7. Screen is comfortable to look at after extended viewing — no visual fatigue
8. Dark theme is the startup state, no flash of light theme on load

Residual risk:
If the TV remains hard to read after the approved color/theme changes, the unresolved cause will likely be text scale or layout density, which are outside the current scope.

---

## 10. Sources

- [Aging TV Screens Reveal a Bluish Tint - EDN Engineering](https://www.edn.com/blue-screen-of-deterioration/)
- [Blue Tint Issues: Causes & DIY Fixes - TV Parts Today](https://tvpartstoday.com/blogs/blog/blue-tint-vs-blue-screen-what-s-the-difference-and-how-to-fix-it)
- [Color on TV - Android Developers](https://developer.android.com/design/ui/tv/guides/foundations/color-on-tv)
- [Color System for TV - Android Developers](https://developer.android.com/design/ui/tv/guides/styles/color-system)
- [Introduction - Android TV - Material Design Guidelines](https://designguidelines.withgoogle.com/android-tv/)
- [Power BI TV Design Best Practices - Rocket Screens](https://www.rocketscreens.com/resources/power-bi-dashboards-large-screen-display)
- [8 UX/UI Best Practices for TV Apps - Spyro Soft](https://spyro-soft.com/blog/media-and-entertainment/8-ux-ui-best-practices-for-designing-user-friendly-tv-apps)
- [Designing for Television - Marvel Blog](https://marvelapp.com/blog/designing-for-television/)
- [Color Theory in Dashboard Design - FreshBI](https://freshbi.com/blogs/color-theory-in-dashboard-design/)
