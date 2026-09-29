# 📚 Table of Contents — Weather Dashboard (Rome, GA)

Live site: `weather.chiggi.net` (GitHub Pages, repo `durgesh0505/Weather_Rome_Ga`)

## 🗂️ File Structure
```
Weather_App/
├── index.html                 # Page shell + all layout CSS (inline <style>)
├── weather.js                 # NWS fetch, render, theme, fullscreen, favicon, 5-min refresh
├── weather-icons.js           # getWeatherIcon(): NWS shortForecast text → emoji
├── CNAME                      # GitHub Pages custom domain
├── CLAUDE.md                  # Project instructions; @-imports RULEBOOK.md
├── RULEBOOK.md                # Project law: one-line rules with incident-based why
├── Talk.md                    # Claude Code ↔ Codex handoff log (append-only)
├── learn.md                   # Lessons learned (narrative)
├── Table_of_Contents.md       # This file
├── .claude/settings.local.json
├── UI_Design_Update/          # Neumorphic CSS design system
│   ├── neumorphic-ui.css      # Entry file, @imports everything below
│   ├── README.md
│   ├── core/ (variables.css, base.css)
│   ├── themes/dark/dark-theme.css   # Warm-dark TV palette lives here
│   ├── animations/physics/physics.css
│   ├── components/ (buttons, cards, controls, data-display, feedback, forms, layout, navigation)
│   └── utils/utilities.css
└── projectdocs/               # Task trackers, proposals, findings per work pass
```

## 📄 File Table
| File | Description | Reason |
|------|-------------|--------|
| `index.html` | Header, 3-column grid (hourly / current / daily), footer; inline CSS with `dvh` + `clamp()` sizing | Single-page TV dashboard |
| `weather.js` | Fetches NWS hourly + daily + KRMG latest observation (current temp/humidity, forecast fallback), renders cards, dark default theme, fullscreen toggle, emoji favicon, refresh every 5 min | All runtime logic |
| `weather-icons.js` | Keyword match on `shortForecast` → emoji | Icons without image assets |
| `CNAME` | `weather.chiggi.net` | Custom domain for GitHub Pages |
| `UI_Design_Update/themes/dark/dark-theme.css` | `[data-theme="dark"]` warm palette (#18120D base, #FFB000 accent, #F6E7C8 text) | Blue-tinted aged TV |
| `UI_Design_Update/core/variables.css` | Base tokens (light defaults) | Design system tokens |
| `UI_Design_Update/components/*` | Buttons, cards, forms, etc. | Mostly unused; only `.spinner` and `.alert` used |
| `CLAUDE.md` | Imports RULEBOOK.md | Auto-load rules each session |
| `RULEBOOK.md` | Rule/Why tables | Prevent repeat incidents |
| `Talk.md` | Agent handoff log | Claude Code ↔ Codex continuity |
| `learn.md` | Lessons with timestamps | Long-form learnings |
| `projectdocs/project-analysis-task.md` | Codex initial analysis tracker | History |
| `projectdocs/tv-visibility-design-research.md` | TV color research, canonical palette | Palette source of truth |
| `projectdocs/tv-visibility-fix-plan.md` | Scoped plan + on-device checklist (Section 11) | TV validation |
| `projectdocs/tv-visibility-planning-task.md` / `tv-doc-scope-alignment-task.md` | Task trackers | History |
| `projectdocs/dynamic-sizing-optimization-task.md` / `-findings.md` | Fit-to-viewport pass, zero overflow at 3 viewports | Layout baseline |
| `projectdocs/text-size-maximization-task.md` / `-findings.md` | Global text size pass | Readability |
| `projectdocs/forecast-column-text-proposal.md` | 2x–3x text request vs. constraints | Decision record |
| `projectdocs/forecast-column-text-implementation-task.md` / `-findings.md` | Forecast column text increase | Readability |
| `projectdocs/current-card-fit-task.md` / `-findings.md` | Center card fill 0.54 → 0.97 | Layout baseline |
| `projectdocs/project-understanding-task.md` | 2026-09-29 read-only analysis + open findings | Current state |
| `projectdocs/opendesign-ui-analysis-task.md` | OpenDesign critique task tracker | Workflow rule |
| `projectdocs/opendesign-ui-analysis-findings.md` | OD 5-dimension scores + Claude-verified/rejected findings | UI improvement backlog |
| `projectdocs/ui-fixes-p0-p1-task.md` | 5 OD-confirmed fixes: night icons, KRMG obs, amber reduction, card borders, alert contrast + verification results | Change record |
