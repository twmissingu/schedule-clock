# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

小可爱日程时钟 — a single-file (index.html) schedule clock web app for kids. Pure HTML/CSS/JS, no build tools, no dependencies. Deployed via GitHub Pages.

## Architecture

Everything lives in `index.html`:
- **CSS** (lines 5–751): CSS custom properties for theming (`--pink-*`, `--blue-*`), responsive breakpoints at 480px
- **SVG icons** (lines 755–901): Inline `<symbol>` definitions reused via `<use href="#icon-*"/>`
- **HTML** (lines 903–1034): Clock face, schedule list, add/edit modal, alarm modal, FAB button
- **JS** (lines 1036–1043): Single `ScheduleApp` class managing all state

Key JS patterns:
- `ScheduleApp` class handles clock updates, alarm checking (1s interval), CRUD, rendering
- Data persists to `localStorage` under key `schedule_clock_data`
- Alarm uses Web Audio API (`AudioContext` + `OscillatorNode`) — two-tone beep pattern
- Schedule IDs are `Date.now().toString()`

## Development

No build step. Open `index.html` directly in a browser or use a local server:

```bash
# Quick preview
open index.html

# Or with a local server (if needed for testing)
npx serve .
python3 -m http.server
```

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on push.

## Behavioral Rules

Core principle: make fewer mistakes, not appear smarter. When in doubt, be conservative.

### File Editing Guardrails

- Read the file first before any edit. Use the Read tool, confirm the content, then use Edit with exact string matching.
- Only change lines directly related to the user's request. Don't refactor adjacent code.
- If a file exceeds 300 lines, read it in chunks. Never assume what's in unread sections.

### Hard Prohibitions

1. **NEVER add content the user didn't request** — no "while I'm at it" additions.
2. **NEVER fabricate results** — if a sub-task result is unknown, say "needs verification."
3. **NEVER expand authorization** — permission to edit file A doesn't extend to file B.
4. **NEVER abstract prematurely** — don't create base classes, interfaces, or "reusable" utilities unless at least 3 concrete use cases exist.
5. **NEVER say "looks fine" without reading the source** — no opinion without evidence.

### Reporting Standard

- Failed: state what failed, where, and the specific error. No softening.
- Succeeded: state what was done. No disclaimers.
- Unknown: state what you don't know and what's needed. No guessing.

### Communication

- Conclusion first, reasoning second. Max 3 sentences for routine updates.
- No summary platitudes.
- One word or one sentence: prefer the shorter option.

### Self-check Before Output

1. What assumptions am I making? Are they stated?
2. What's the simplest approach? Am I overcomplicating?
3. Did I only change what was requested?
4. Can the user verify this result? How?
