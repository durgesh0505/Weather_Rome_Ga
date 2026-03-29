# TV Visibility Planning Task

Created: 2026-03-29 America/New_York
Status: Completed

Objective:
Validate the best visibility strategy for displaying the weather dashboard in a browser on an aging television with a persistent blue tint, without changing application code yet.

Required work:
1. Read the existing Claude research files in `projectdocs/`.
2. Use MCP tools to validate large-screen browser visibility guidance and TV-specific display constraints.
3. Separate stable guidance from unverified hardware-specific claims.
4. Produce a concrete implementation plan for later approval.
5. Append the result to `Talk.md` so Claude Code can continue without re-reading the project.

Progress log:
2026-03-29 12:19 EDT: Read existing Claude research and prior project analysis files in `projectdocs/`.
2026-03-29 12:24 EDT: Used MCP browser tooling to review Android large-screen TV guidance for color, contrast, readability, viewing distance, and safe-area constraints. Used MCP reasoning to adapt the guidance to a browser on a TV rather than an Android TV app.
2026-03-29 12:27 EDT: Created `projectdocs/tv-visibility-fix-plan.md` with validated design direction, palette strategy, hierarchy changes, fix sequence, and real-device validation steps.
2026-03-29 12:33 EDT: User clarified normal viewing distance is about 20 feet and the page stays full-screen all day. Updated the plan to treat the display as passive signage rather than a typical TV app or desktop dashboard.
2026-03-29 12:39 EDT: User clarified the TV is roughly 30 to 40 inches at 1080p. Recorded the readability risk tied to that hardware.
2026-03-29 12:52 EDT: User locked implementation to literal color/theme changes only with no element removal. Updated the TV documents so typography, density, layout, and motion changes are now documented as residual risks rather than implementation work.
