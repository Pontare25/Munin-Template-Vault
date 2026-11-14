---
type: sop
version: 1
summary: Monthly review of Areas, goal drift, archiving of closed efforts, stale claims and projects without a next action
---

# SOP: Monthly Review

Look at the month from one altitude up: are the Areas healthy, are closed efforts out of the way, does every project have a next move. Run it once a month.

**Trigger:** the human says "monthly review", "review my month", "review my Areas", or on the monthly cadence.

## Steps

1. **Open this month's monthly note** (`Calendar/Monthly Notes/`, filed by the Journals plugin as `YYYY-MM`). Create it from the monthly template if it does not exist.
2. **Review the Areas** in [[AoR Review]]: the red flags in Project health, the Task loops strip and the Checklist. List each Area with a red flag and what it needs.
3. **Goal drift.** Report active Areas with no active project (the AoR Review flag). Set the free-text priorities in the latest quarterly note and last month's priorities against what the month's notes show. Ask the human; do not decide.
4. **Archive closed efforts.** List projects, learning projects and Areas with `status: done` or `dropped` that are not under `Archive/`. Propose a destination for each, mirroring the folder: `Archive/Projects/<folder>/`, `Archive/Learning/<Subject>/`, `Archive/Areas/`. Move them only through Obsidian (the app or its CLI), never by file system. Ask for approval per batch of ten. Calendar, Atlas, Fleeting and source notes never move.
5. **Stale-claim check** across the month. Compare `AI-OS/state.md` (Open threads, Pending decisions) and the Lessons in `AI-OS/memory.md` against the month's daily and meeting notes. Report claims that look superseded. Never edit without approval.
6. **Projects with no open task.** Open the Projects.base view "No open task". Each project needs a next action (create a task note) or a status change (`waiting`, `done`, `dropped`). Ask per project.
7. **Fill the note with the human.** Wins, Misses, a "Carries forward" list and next month's priorities. Write what the human says; suggest, never invent.
8. **Log it:** one entry `## [YYYY-MM-DD] monthly-review | YYYY-MM` with bullets for notes moved, status changes, tasks created and claims flagged.

## Output

A filled monthly note, closed efforts moved to `Archive/`, every active project with a next action or a new status, and the step 8 log entry.

## Judgment calls

- A `done` project may still be a reference. Archiving hides it from search, not from links; ask when the human might still need it.
- Do not reopen a closed effort here; that is a new project or a status change on purpose.
- Skip a step that has nothing to show and say so in one line.

## Manual checklist (without an AI)

1. Open this month's monthly note.
2. Open [[AoR Review]]; for each red Area decide: add a project, change the Area's status, or accept it.
3. List notes with `status: done` or `dropped` outside `Archive/` (Projects.base "All Projects"); drag each into the mirrored `Archive/` folder in Obsidian.
4. Reread `AI-OS/state.md` and the lessons in `AI-OS/memory.md` against the month; fix what is out of date.
5. Open Projects.base "No open task"; add a next action or change the status for each.
6. Fill Wins, Misses, Carries forward and next month's priorities.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
