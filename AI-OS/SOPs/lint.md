---
type: sop
version: 3
summary: Scan the knowledge graph for broken links, orphans, schema drift, stale notes and indexes, and propose fixes
---

# SOP: Lint

Periodic health check of the knowledge graph. Lint finds problems and proposes fixes; it changes nothing without approval.

**Trigger:** the human says "lint", "check the graph", "broken links", "orphans", "graph health", or [[weekly-review]] calls it.

**Cadence:** a weekly scoped run from [[weekly-review]] covers notes changed since the last lint entry in [[AI-OS/log|log]]. A full run happens monthly or on request.

## Steps

1. **Pick the mode.** Read the last `lint` entry in [[AI-OS/log|log]]. If no note changed since, log one line and stop. Otherwise scope the scan to the changed notes and their links (a full run scans everything). Incremental mode handles at most 10 findings per run, oldest first; the log entry records the rest as a count plus the first unhandled item.
2. **Scan for findings**, in this order:
   - **Broken links:** wikilinks pointing at notes that do not exist (excluding topic stubs the ingest SOP is expected to create).
   - **Orphans:** notes in `Atlas/` with no inbound links and no `topics:` pointing at them.
   - **Missing topic pages:** subjects referenced in `topics:` fields with no page in `Atlas/Topics/`.
   - **Schema drift:** notes missing required frontmatter for their type (see [[note-schema]]), or a tag used to classify a note instead of `type:` (the user's own tags are fine). Every `Atlas/` note needs a non-empty `type:` (OKF conformance). Also check the user's notes for the following. All are warnings with a proposed fix, never auto-applied; a batch of more than ten notes needs approval first.
     - `up:` missing where the core's `up:` table says required (note, framework, source, person, organization). Projects and tasks without `up:` count as one line.
     - A relationship field written as a scalar, not a YAML list: `up`, `related`, `down`, `opposes`, `people`, `skills`, `interests`, `topics`, `area`.
     - `type:` that disagrees with the folder per the core type table. `Archive/` and `Raw/Inbox/` are exempt.
     - `topics:` entries that do not resolve to a note in `Atlas/Topics/`.
     - Markdown links `[text](note.md)` to vault notes; propose wikilinks.
     - Retired forms: `status: simmering`; a whole-note `%% #AI-Assisted %%` comment on the first body line (propose `ai: pending`); `[x] #task` reference lines.
     - `area:` missing or different from the top-level Area found by walking `up:` (projects, tasks, meetings, work sessions); propose the walked value.
     - A field missing from the field registry in [[note-schema-reference]]; propose registering or removing it.
   - **Stale index lines:** folder `index.md` listings referencing notes that moved or no longer exist, or missing recent notes. Propose the missing line for notes the human made by hand.
   - **Missing maps:** a topic with 10 or more notes and no MOC; propose one (the human owns `Atlas/MOCs/`).
   - **Stubs:** topics with an empty compass and 3 or more notes linking in are the "Stubs" view in `Topics.base`. Propose compass fill-in; do not guess.
   - **Oversized indexes:** a folder `index.md` listing that has grown far past a quick scan (roughly 100 lines). Propose letting a Base serve as the index (see the growth path in the AI-OS README).
   - **Contradictions and stale claims:** notes that state conflicting things without an `opposes:` link between them; claims that time has overtaken. A note is stale when its topic has a newer source: its `date_modified` is older than the newest source linking that topic. Flag it, never rewrite it.
3. **Write the report:** group findings by category, one line each (`path: problem`). State counts. Propose a fix per finding.
4. **Wait for approval.** The human picks which fixes to apply (all, some, none).
5. **Apply approved fixes** only. For contradictions, prefer linking both notes via `opposes:` over deleting either.
6. **Log it** on every run: one [[AI-OS/log|log]] entry (`## [YYYY-MM-DD] lint | N findings, M fixed`, plus the queue line in incremental mode).

## Output

A findings report grouped by category with counts, the approved fixes applied, and the step 6 log entry.

## Judgment calls

- Empty compass keys on a young topic stub are normal, not findings. Flag them only when a topic has three or more notes and still no compass.
- When unsure whether something is stale, ask; the human's memory outranks the file dates.

## Manual checklist (without an AI)

1. Look for broken links (Obsidian shows them in a fainter color), notes in `Atlas/` with no backlinks, and notes without `type:`.
2. Compare each folder `index.md` with the notes in that folder.
3. Fix what you find, or write it down for later.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
