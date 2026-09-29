# learn.md

2026-03-29 12:27 EDT
When researching TV visibility problems, do not overfit to platform-specific guidance until the runtime environment is confirmed. A browser running on a PC connected to a TV should be treated as a large-screen web dashboard first, and native Android TV guidance should only be reused where it overlaps with distance viewing, contrast, typography, and safe-area constraints.

2026-03-29 12:33 EDT
Viewing distance can invalidate an otherwise reasonable dashboard plan. At roughly 20 feet, a browser page on a TV should be evaluated as passive signage, which means density reduction and extreme readability can matter more than preserving the original layout.

2026-03-29 12:39 EDT
Physical display size matters as much as viewing distance. A 30 to 40 inch 1080p TV at 20 feet is not just "far away"; it is small enough that preserving a desktop-style multi-column dashboard becomes unrealistic, so simplification must be part of the baseline plan.

2026-03-29 12:52 EDT
When a user says "just color/theme changes," treat that literally. Typography sizing, motion cleanup, density reduction, and layout simplification are separate scopes even if they are visually related and even if they would improve the result.

2026-03-29 12:58 EDT
When a dashboard "almost fits" but overflows on shorter fullscreen heights, hidden scrollbars are a false fix. The reliable correction is to give the layout an explicit viewport-height budget with `dvh`, set flex and grid containers to `min-height: 0`, and use `minmax(0, ...)` so content shares available space instead of forcing intrinsic minimum overflow.

2026-03-29 13:03 EDT
When reviewing follow-up findings from another agent, verify each claim against both the current code and the pre-change state before treating it as a regression. A real issue should be fixed immediately, but an incorrect attribution should be corrected so the project history stays accurate.

2026-03-29 13:10 EDT
For distance-read dashboards, the fastest way to make text meaningfully larger without breaking page fit is not just raising font clamps. The reliable approach is to increase the important text and immediately pay for it by shrinking low-value spacing, padding, and decorative breathing room, then verify against the tightest supported viewport.

2026-03-29 13:34 EDT
When only one region of a dashboard needs more readable text, tune that region surgically instead of scaling the whole page again. Isolating the forecast-card typography and reclaiming space only from forecast-card spacing makes it possible to hit a higher readability ceiling without destabilizing the center block or the overall layout.

2026-03-29 13:46 EDT
If a card feels empty, measure content-to-card height instead of guessing. A low fill ratio usually means the content stack is still acting like a compact centered block. Switching that stack to full-height distribution is more effective than only increasing font size.

2026-09-29 14:21 EDT
An MCP server listed under `projects["C:/Users/durge"].mcpServers` in `~/.claude.json` is local scope and only loads for sessions started in that exact folder. For a server to work in every project it has to be added with `claude mcp add --scope user`. A running session never picks up new MCP config, so a restart is required even after `mcp list` shows it connected.

2026-09-29 14:32 EDT
An OpenDesign critique produces confident, specific findings that are only partly right. In the 2026-09-29 run, all of its contrast math checked out, but one "fix" compared two sizes that come from the same CSS rule, and another relied on `prefers-reduced-motion`, which does nothing on an unattended TV PC. Treat OD output as a lead list: recompute every number, grep every selector, and test each fix against the real runtime environment before relaying it.

2026-09-29 14:38 EDT
NWS hourly periods set `isDaytime` from a fixed 06:00–17:59 clock window, not from sunrise and sunset. Code that trusts it for day or night visuals will be wrong by up to about 1.5 hours at dusk and dawn depending on the season. Real screenshots caught this; unit tests on the flag did not, because the flag itself was the wrong source of truth.

2026-09-29 14:46 EDT
To make dashboard text fill its cards, size it with container query units (`cqh`/`cqi`) inside `min()` rather than viewport units, so each card's own box drives the size. Viewport-based `clamp()` caps are why the cards had empty space. Live data always under-tests width: the worst case here was "12:00 PM" next to "100°F", which overflowed by 40 px while live data looked perfect. Always inject worst-case strings before accepting a sizing change.

2026-09-29 14:55 EDT
A successful `git push` does not prove a GitHub Pages deploy. After the custom domain was changed in the UI, pushes to `main` stopped triggering `pages build and deployment`, and the live site stayed frozen on the previous build. Check the Actions runs API for the pushed SHA, and check the origin with `curl -H "Host: <domain>" http://185.199.108.153/<file>` to bypass Cloudflare. Cloudflare in front also stretched browser cache to 4 h, so the live check needs a cache-busting query string or a purge.

2026-09-29 15:02 EDT
CSS `@import`s inside one stylesheet are fetched in parallel after the parent file arrives, not one after another. The real cost is one extra round-trip plus any unused files. I misstated this as sequential loading before checking and had to correct it. To prove a stylesheet swap changes nothing, diff `getComputedStyle` for every element in both themes between the old and new page. Inherited custom properties from dropped files will appear on every element, so filter them before counting real diffs.
