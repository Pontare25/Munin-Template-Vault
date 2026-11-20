---
type: sop
version: 4
summary: Scan the knowledge graph for broken links, orphans, schema drift, stale notes and indexes, and propose fixes
---

# SOP: Lint

Periodic health check of the knowledge graph. Lint finds problems and proposes fixes; it changes nothing without approval.

**Trigger:** the human says "lint", "check the graph", "broken links", "orphans", "graph health", or [[weekly-review]] calls it.

**Cadence:** a weekly scoped run from [[weekly-review]] covers notes changed since the last lint entry in [[AI-OS/log|log]]. A full run happens monthly or on request.

## Steps

1. **Pick the mode.** Read the last `lint` entry in [[AI-OS/log|log]]. If no note changed since, log one line and stop. Otherwise scope the scan to the changed notes and their links (full run: everything). Incremental mode handles at most 10 findings per run, oldest first; the log entry records the rest as a count plus the first unhandled item.
2. **Scan for findings**, in this order:
   - **Broken links:** wikilinks pointing at notes that do not exist (not topic stubs [[ingest]] will create).
   - **Orphans:** notes in `Atlas/` with no inbound links and no `topics:` pointing at them.
   - **Missing topic pages:** subjects referenced in `topics:` fields with no page in `Atlas/Topics/`.
   - **Schema drift:** notes missing required frontmatter for their type (see [[note-schema]]), or a tag used to classify a note instead of `type:` (the user's own tags are fine). Every `Atlas/` note needs a non-empty `type:` (OKF conformance). Also check the user's notes for these; all are warnings, never auto-applied, and a batch over ten needs approval first.
     - `up:` missing where the core's `up:` table says required (person). Projects and tasks without `up:` count as one line. Notes, frameworks and sources without `up:` are not drift: report their count as one line that points at the Notes.base view "No up".
     - A relationship field written as a scalar, not a YAML list: `up`, `related`, `down`, `opposes`, `people`, `skills`, `interests`, `topics`.
     - `type:` that disagrees with the folder per the core type table. `Archive/` and `Raw/Inbox/` are exempt.
     - `topics:` entries that do not resolve to a note in `Atlas/Topics/`.
     - Markdown links `[text](note.md)` to vault notes; propose wikilinks.
     - Retired forms: `status: simmering`; a whole-note `%% #AI-Assisted %%` comment on the first body line (propose `ai: pending`); `[x] #task` reference lines.
     - Task `contexts:` that differs from the top-level Area its `up:` chain reaches (propose it), or an open task with neither; any retired `area:` key.
     - A field missing from the field registry in [[note-schema-reference]]; propose registering or removing it.
   - **Stale index lines:** folder `index.md` listings referencing notes that moved or no longer exist, or missing recent notes. Propose the missing line for notes the human made by hand.
   - **Missing maps:** a topic with 10 or more notes and no MOC; propose one (the human owns `Atlas/MOCs/`).
   - **Stubs:** topics with an empty compass and 3 or more notes linking in are the "Stubs" view in `Topics.base`. Propose compass fill-in; do not guess.
   - **Oversized indexes:** a folder `index.md` past roughly 100 lines. Propose a Base as the index (AI-OS README growth path).
   - **Contradictions and stale claims:** conflicting notes with no `opposes:` link; claims that time has overtaken. A note is stale when its `date_modified` is older than the newest source linking its topic. Flag it, never rewrite it.
3. **Write the report:** group findings by category, one line each (`path: problem`). State counts. Propose a fix per finding. A category also non-zero in the previous two bulleted lint entries is recurring: say so and propose fixing its cause.
4. **Wait for approval.** The human picks which fixes to apply (all, some, none).
5. **Apply approved fixes** only, and set `date_modified` on each note you change. For contradictions, prefer linking both notes via `opposes:` over deleting either.
6. **Log it** on every run: one [[AI-OS/log|log]] entry (`## [YYYY-MM-DD] lint | N findings, M fixed`, plus the queue line in incremental mode), with one bullet of per-category counts using the step 2 names, non-zero only or "none" (`- broken links 2, schema drift 3`). A no-change entry (step 1) has no bullet; recurrence counting skips it.

## Output

A findings report grouped by category with counts, the approved fixes applied, and the step 6 log entry.

## Judgment calls

- Empty compass keys on a young topic stub are normal, not findings. See Stubs for the threshold.
- When unsure whether something is stale, ask; the human's memory outranks the file dates.

## Manual checklist (without an AI)

1. Look for broken links (Obsidian shows them in a fainter color), notes in `Atlas/` with no backlinks, and notes without `type:`.
2. Compare each folder `index.md` with the notes in that folder.
3. Fix what you find, or write it down for later.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
