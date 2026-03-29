# Forecast Column Text Proposal

Created: 2026-03-29 13:27 EDT
Status: Path 1 approved and implemented

## Goal

Increase the readability of the left and right forecast columns only.

This proposal covers:
1. The `Next 5 Hours` column
2. The `Next 5 Days` column
3. The text for time, day/date, temperatures, and precipitation percentage inside those forecast cards

This proposal does not change:
1. The number of forecast items
2. The overall 3-column layout
3. The center current-weather block
4. Color/theme

## Current Measured Sizes

Measured in the browser after the last text-scaling pass.

### At 1920x1080

1. Hourly time text: `19.44px`
2. Daily day text: `19.44px`
3. Daily date text: smaller secondary text
4. Hourly and daily temperature text: `26.4px`
5. Precipitation text: `14.58px`

### At 1366x768

1. Hourly time text: `16.8px`
2. Daily day text: `16.8px`
3. Hourly and daily temperature text: `26.112px`
4. Precipitation text: `13.6px`

## Problem

The forecast cards still underuse the available space for distance reading. The center block is now materially larger, but the left and right columns still read like secondary dashboard text instead of signage text. The weak spots are the time/day labels and the precipitation percentage. Temperature can also be pushed further.

## Proposed Visual Target

Each forecast card should read in this priority order:

1. Time or day/date should be immediately legible without leaning in.
2. Temperature should be the strongest text inside each forecast card.
3. Precipitation percentage should still be clearly readable, not tiny metadata.
4. The cards must still all fit on screen with 5 hourly and 5 daily rows visible at once.

## User-Requested Extreme Target

You asked for the forecast-column text to increase by `2x` to `3x`.

If applied literally, that produces these target ranges.

### 1920x1080 literal 2x to 3x target

1. Hourly time and daily day: from `19.44px` to about `39px` to `58px`
2. Daily date: if scaled with the same ratio, about `30px` to `45px`
3. Hourly and daily temperature: from `26.4px` to about `53px` to `79px`
4. Precipitation percentage: from `14.58px` to about `29px` to `44px`

### 1366x768 literal 2x to 3x target

1. Hourly time and daily day: from `16.8px` to about `34px` to `50px`
2. Daily date: if scaled with the same ratio, about `27px` to `40px`
3. Hourly and daily temperature: from `26.112px` to about `52px` to `78px`
4. Precipitation percentage: from `13.6px` to about `27px` to `41px`

## Feasibility Assessment

This extreme target does not fit the current constraints.

If all of these stay true at the same time:
1. 5 hourly rows remain visible
2. 5 daily rows remain visible
3. The current 3-column layout stays unchanged
4. No page overflow is allowed
5. No text clipping is allowed

Then a literal `2x` to `3x` increase for the forecast-column text is not realistic. The row heights and horizontal space in the forecast cards are too limited for that scale.

## What Has To Give

To actually reach a `2x` to `3x` visual increase, at least one of these constraints must be relaxed:

1. Show fewer than 5 hourly rows
2. Show fewer than 5 daily rows
3. Widen the forecast columns by changing the 3-column proportions
4. Allow the center block to shrink materially so the side columns can grow
5. Allow page overflow or an internal scroll region for forecast lists

## Largest Realistic Increase Without Breaking Current Constraints

If the current constraints stay locked, the realistic next step is still a strong increase, but not a literal `2x` to `3x`.

### 1920x1080 realistic ceiling

1. Hourly time and daily day: about `22px` to `24px`
2. Daily date: about `16px` to `18px`
3. Hourly and daily temperature: about `30px` to `32px`
4. Precipitation percentage: about `17px` to `18px`

### 1366x768 realistic ceiling

1. Hourly time and daily day: about `19px` to `20px`
2. Daily date: about `14px` to `15px`
3. Hourly and daily temperature: about `28px` to `30px`
4. Precipitation percentage: about `15px` to `16px`

## How I Would Make It Fit

To pay for the larger forecast text without breaking fullscreen fit, I would only touch the forecast-card internals:

1. Increase `.hourly-time` and `.daily-day`
2. Increase `.daily-date`
3. Increase `.hourly-temp` and `.daily-temps`
4. Increase `.precip-info`
5. Slightly tighten forecast-card internal padding and forecast-list gap if needed
6. Leave the center block and overall grid structure alone unless the browser measurements prove that the larger forecast text cannot fit

## Guardrails

These conditions must remain true after implementation:

1. No page overflow at `1920x1080`
2. No page overflow at `1366x768`
3. No page overflow at `1280x720`
4. All 5 hourly rows remain visible
5. All 5 daily rows remain visible
6. No text clipping inside forecast cards

## Recommendation

The current requirement set conflicts internally.

If you want a literal `2x` to `3x` forecast-text increase, you need to approve at least one structural relaxation from the list above.

If you want to preserve the current layout, all 5 rows, and no overflow, then the realistic implementation is the smaller ceiling listed above.

## Approval Needed

User selected path 1. That constrained implementation has now been completed and measured in `projectdocs/forecast-column-text-implementation-findings.md`.
