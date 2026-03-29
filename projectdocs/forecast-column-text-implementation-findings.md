# Forecast Column Text Implementation Findings

Created: 2026-03-29 13:34 EDT

## Scope

This pass applied the approved constrained path from `projectdocs/forecast-column-text-proposal.md`.

The work was limited to:
1. The `Next 5 Hours` forecast cards
2. The `Next 5 Days` forecast cards
3. Their time/day, date, temperature, and precipitation text
4. The minimum spacing and padding changes required to make those larger values still fit

No layout restructuring was introduced.

## Files Changed

File changed: `index.html`

## What Changed

1. Increased `.hourly-time` and `.daily-day`
2. Increased `.daily-date`
3. Increased `.hourly-temp` and `.daily-temps`
4. Increased `.precip-info`
5. Tightened `.hourly-section` and `.daily-section` spacing and padding
6. Tightened `#hourlyForecast` and `#dailyForecast` list gaps
7. Tightened `.hourly-item` and `.daily-item` padding and internal gaps
8. Tightened the small-height forecast spacing inside the `max-height: 820px` and `max-height: 720px` breakpoints

## Measured Result

### At 1920x1080

1. Hourly time: `24px`
2. Daily day: `24px`
3. Daily date: `18px`
4. Hourly temperature: `32px`
5. Daily temperatures: `32px`
6. Precipitation text: `18px`
7. Page overflow: none

### At 1366x768

1. Hourly time: `20.736px`
2. Daily day: `20.736px`
3. Daily date: `15.36px`
4. Hourly temperature: `30.72px`
5. Daily temperatures: `30.72px`
6. Precipitation text: `16.896px`
7. Page overflow: none

### At 1280x720

1. Hourly time: `19.44px`
2. Daily day: `19.44px`
3. Daily date: `15.2px`
4. Hourly temperature: `28.8px`
5. Daily temperatures: `28.8px`
6. Precipitation text: `15.84px`
7. Page overflow: none

## Outcome

This hit the realistic ceiling that was proposed for the locked layout.

At `1920x1080`, the forecast columns reached:
1. Time/day `24px`
2. Date `18px`
3. Temperature `32px`
4. Precipitation `18px`

That is materially larger than the previous state while preserving:
1. All 5 hourly rows
2. All 5 daily rows
3. The same 3-column structure
4. Zero document overflow

## Verification

1. `1920x1080`: pass
2. `1366x768`: pass
3. `1280x720`: pass
4. Console: 0 errors, 0 warnings
5. NWS hourly request: `200`
6. NWS daily request: `200`

## Limitation

This is the largest forecast-column-only increase that cleared the browser guardrails in the current layout. If the actual TV still needs meaningfully larger forecast text than this, the next step is structural, not typographic. That means reducing forecast row count, widening the side columns, shrinking the center block, or allowing a forecast-region scroll model.
