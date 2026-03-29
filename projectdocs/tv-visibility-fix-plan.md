# TV Visibility Fix Plan

Date: 2026-03-29
Last updated: 2026-03-29 — implementation scope narrowed to literal color/theme changes only
Context: Weather dashboard shown full-screen in a browser on an aging television with a persistent blue cast.
Scope: Research and planning only. No code changes are included in this document.

---

## Confirmed Constraints (User-Provided)

| Constraint | Value |
|---|---|
| TV size | 30–40 inches |
| Viewing distance | ~20 feet |
| Usage pattern | Full-screen, all day |
| Implementation scope | **Color and theme changes only** |
| Element changes | **None — no elements removed, no layout restructured** |
| Platform | Browser on PC-connected TV (not a native TV app) |

> All density reduction, layout restructuring, element-count changes, typography scaling, and motion changes are **out of scope** per user direction. The implementation is limited to color/theme changes and changing the theme default.

---

## 1. What Is Definitively True

The display has a persistent cool-blue bias. That is enough to drive the design decision. The exact hardware failure mode is not proven from software alone, so the design plan targets the visible symptom rather than claiming a specific physical diagnosis.

Confirmed constraints:
1. The UI is viewed from ~20 feet, not monitor distance.
2. The TV panel is 30–40 inches at approximately 1080p.
3. The TV is older and color-inaccurate.
4. The page runs in a browser on a PC-connected TV — not a native TV app.
5. Visibility matters more than stylistic purity.
6. The display is on all day — comfort over long durations matters.
7. No layout changes. Color and theme only.
8. No typography resizing as part of this implementation.
9. No motion changes as part of this implementation.

---

## 2. What the Earlier Research Got Right

`projectdocs/tv-visibility-design-research.md` is directionally correct on the most important points:

1. Warm-leaning colors are more resilient than cool blue, cyan, and violet on this display.
2. Dark surfaces are the correct default — they preserve contrast headroom.
3. Pure white should be avoided — it reads cold and blue on this screen.
4. Text and key weather values need to be larger and heavier than standard desktop sizing.
5. Gradients, deep blur, and subtle cool-gray shadows are weak choices on an older TV.

---

## 3. What Was Corrected

1. **Hardware diagnosis overstated.** The original document described phosphor degradation as the confirmed cause. It is the most common cause of this symptom, not a proven diagnosis. The design response is the same regardless.

2. **Android TV guidelines are not directly applicable.** This is a browser dashboard on a PC-connected TV. Android TV guidance is useful only where it overlaps with generic large-screen browser readability. It is not authoritative for this deployment.

3. **Warm teal is not a safe data color for this screen.** The original document proposed `#4DB6AC` for precipitation. Any teal-family color retains enough blue content to lose contrast on a blue-shifted panel. Precipitation meaning must be carried by icons and labels, not color encoding.

4. **Density reduction is out of scope.** Earlier analysis noted the 30–40 inch / 20-foot combination would strain the current layout density. User has confirmed layout is not being changed. Typography scaling must therefore do the work that layout reduction cannot.

---

## 4. What 30–40 Inches at 20 Feet Means for Color/Theme Scope

At this size and distance, readability risk remains high even after a correct palette update. Color correction can improve contrast perception, but the fixed scope means typography, density, and layout changes are not being used to solve the distance problem in this pass.

The specific risk on this screen is straightforward: if text is correctly colored but still too small or thin, readability can remain poor at 20 feet. That residual risk must stay documented because the current approved scope does not include typography or layout remediation.

---

## 5. Canonical Palette

> Authoritative values for implementation. See `tv-visibility-design-research.md` Section 4 for full traceability table. These values are chosen to remain legible after the blue-shift is applied.

### Backgrounds

| Role | Hex |
|---|---|
| Page background | `#18120D` |
| Card background | `#241B14` |
| Neumorphic raised highlight | `#33271E` |
| Neumorphic inset shadow | `#120D09` |
| Divider / border | `#3B2C20` |

### Text

| Role | Hex |
|---|---|
| Primary text / labels | `#F6E7C8` |
| Secondary text | `#D8BD8A` |
| Muted / tertiary | `#9E835A` |
| Critical numeric emphasis | `#FFD166` |

### Accents

| Role | Hex |
|---|---|
| Primary accent | `#FFB000` |
| Hot / alert | `#FF8A00` |
| Secondary positive | `#D9A441` |

### Do Not Use

Pure blue, cyan, teal, violet, cool gray (`#808080`, `#9E9E9E`, `#BDBDBD`), pure white (`#FFFFFF`), saturated red (`#FF0000`).

---

## 6. Typography Risk Note

Typography remains a documented visibility risk, but it is not part of the approved implementation scope.

The current screen size and viewing distance make small supporting text fragile. If the palette changes are implemented and the TV still fails readability checks, the unresolved cause is likely text scale and density rather than color choice. That follow-up work would require a separate approval because it exceeds color/theme scope.

---

## 7. All-Day Display Comfort

The display is on continuously. Color and scale choices must account for this.

1. Bright amber and orange are for focal data (temperature numbers, active conditions) only — not large background regions.
2. The dark warm base itself reduces visual fatigue compared to a bright light interface.
3. Decorative motion remains a documented comfort risk, but changing motion is outside the current scope.

---

## 8. Safe Framing

Older TV panels can visually soften or physically crop screen edges. Keep generous padding on all sides. No critical data should sit within the outer ~5% of the viewport.

---

## 9. Implementation Scope

**Color and theme only. No element removal. No layout changes. No typography changes. No motion changes. No JS logic changes beyond theme default.**

| File | What Changes |
|---|---|
| `UI_Design_Update/core/variables.css` | Reassign all color CSS variables to canonical palette (Section 5) |
| `UI_Design_Update/themes/dark/dark-theme.css` | Verify all variables covered; this becomes the primary active theme |
| `weather.js` — `initTheme()` | Change default from `light` to `dark` |
| `index.html` | Audit for hardcoded color values or inline styles that override variables |

Estimated files touched: **3–4**. All changes are additive rewrites of existing color/theme values and one JS default line.

---

## 10. Implementation Order

1. **Token layer** — reassign CSS color variables to warm dark palette. This single step shifts the entire visual system.
2. **Theme default** — change `initTheme()` to start on dark. Confirm no flash of light theme on load.
3. **Contrast audit** — verify no cool neutrals, weak borders, or low-visibility color choices remain after the variable reassignment.
4. **Real-device test** — validate on the actual TV at 20 feet. No desktop-only signoff.

---

## 11. Validation Checklist (On the Actual TV)

Must be performed at normal viewing distance. Desktop review does not count.

1. Current temperature is readable instantly from 20 feet — no leaning forward required
2. Hourly times and daily forecast labels are legible at distance
3. Text does not appear icy, lavender, or washed out
4. Card edges and shadows are distinguishable — neumorphic depth still reads
5. No critical information near screen edges is clipped or visually softened
6. Weather meaning is clear through icons and labels — no information encoded only in cool colors
7. Display is comfortable after extended viewing — no visual fatigue from brightness
8. Dark theme is the startup state — no flash of light theme before JS runs

Residual risk:
If the TV still fails readability after these in-scope changes, the next fixes will require out-of-scope work on typography, density, or layout.

---

## 12. Sources

1. Android Developers: Color on TV — https://developer.android.com/design/ui/tv/guides/foundations/color-on-tv
2. Android Developers: Color System for TV — https://developer.android.com/design/ui/tv/guides/styles/color-system
3. Android Developers: Typography for TV
4. Marvel: Designing for Television — https://marvelapp.com/blog/designing-for-television/
5. EDN: Aging TV Screens Reveal a Bluish Tint — https://www.edn.com/blue-screen-of-deterioration/
6. TV Parts Today: Blue Tint Issues — https://tvpartstoday.com/blogs/blog/blue-tint-vs-blue-screen-what-s-the-difference-and-how-to-fix-it
7. Digital signage viewing-distance references for 20-foot passive legibility benchmarking
