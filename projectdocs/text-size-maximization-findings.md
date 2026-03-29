# Text Size Maximization Findings

Created: 2026-03-29 13:10 EDT

## Goal

Increase the dashboard text to the largest practical size that still keeps the full page visible on screen.

## What Changed

File changed: `index.html`

1. Increased the main typography clamps for the location, current temperature, condition text, section titles, forecast labels, forecast temperatures, detail labels, detail values, precipitation text, and footer text.
2. Promoted the current condition line visually by increasing its size and changing it from muted text color to the amber accent color.
3. Reduced lower-value spacing so the larger text still fits: container padding, header padding, grid gap, section gap, list gap, card padding, item padding, and detail-card padding were all tightened.
4. Tightened the small-height breakpoints further so the enlarged text still fits at shorter fullscreen heights.

## Measured Result

### At 1920x1080

1. Current temperature increased from `112px` to `128px`.
2. Condition text increased from `28.8px` to `36px`.
3. Section titles increased from `17.28px` to `20.52px`.
4. Forecast day/time labels increased from `16.2px` to `19.44px`.
5. Detail values increased from `36px` to `41.6px`.
6. The page still has zero document overflow.

### At 1366x768

1. Current temperature increased from `92.16px` to `107.52px`.
2. Condition text increased from `24.576px` to `32.256px`.
3. Section titles increased from `15.2px` to `17.6px`.
4. Forecast day/time labels increased from `15.2px` to `16.8px`.
5. Detail values increased from `30.72px` to `35.328px`.
6. The page still has zero document overflow.

### At 1280x720

1. Current temperature renders at `100.8px`.
2. Condition text renders at `30.24px`.
3. Forecast day/time labels render at `16.8px`.
4. Detail values render at `33.12px`.
5. The page still has zero document overflow.

## Verification

1. `1920x1080`: pass, no overflow.
2. `1366x768`: pass, no overflow.
3. `1280x720`: pass, no overflow.
4. Console messages: 0 errors, 0 warnings.
5. NWS hourly and daily requests: both returned `200`.

## Remaining Limitation

This is the largest text scale that I could push through the browser validation pass without reintroducing page overflow in the guardrail viewports. Real readability on the actual TV still depends on the physical display, browser zoom, and viewing distance, so the final judgment still belongs to the real device test.
