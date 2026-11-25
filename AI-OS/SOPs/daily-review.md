---
type: sop
version: 5
summary: Sort the daily note, Raw/Inbox and Fleeting captures into sources, notes, tasks and entity links, and report overdue and waiting tasks
---

# SOP: Daily Review

Sweep the daily note, the inbox and the fleeting notes so capture stays effortless. The human's only job is to dump things into the **Brain dump** section of today's daily note; this SOP is where those dumps get sorted.

**Trigger:** the human says "review my daily note", "sweep my captures", "process my inbox", or similar. Works on any day's note, defaulting to today. "Develop my fleeting notes" runs the sub-mode after the steps.

## Steps

1. **Open the daily note** (`Calendar/Daily Notes/YYYY/MM-MMM/YYYY-MM-DD.md`, filed by the Journals plugin). If it does not exist, say so and stop.
2. **Also list `Raw/Inbox/` and `Fleeting/`** for captures that arrived outside the daily note.
3. **Short-path exit.** If the Brain dump section, `Raw/Inbox/` and `Fleeting/` hold nothing new since the last [[log]] entry for this SOP, say so and stop.
4. **Walk every item** in the Brain dump section, the inbox and `Fleeting/`. For each one, classify:
   - **Source material** (link, article, quote worth keeping): run [[ingest]] on it (ask first if there are more than a couple). Ingest captures the content and files the `type: source` note in `Raw/Sources/`. If the content could not be captured (fetch blocked, file outside the vault, no text), leave the capture where it is and list it under step 11 with what the human must do; never file an empty source.
   - **Fleeting idea:** promote to an atomic note in `Atlas/Notes/` via [[new-note]] if it holds up; otherwise keep it in `Fleeting/` to mature, or drop it with the human's blessing.
   - **Task:** create a task note in `Efforts/TaskNotes/Tasks/` named `task - <title>.md`, with the keys from the Tasks section of [[note-schema-reference]]: `type: task`, `title: <title>`, `status: backlog`, `up:` the effort it belongs to (its project, or an Area for a task outside any project), `contexts:` the top-level Area that chain reaches, lowercase, and `origin:` the daily note. Give it the body of `System/Templates/Templater/Effort-templates/task-note-template.md`. Then replace the capture in the daily note with the reference line `- [t] [[task - <title>|<title>]]`, the same line the *New task* command (Ctrl+Alt+T) writes.
   - **Mention of a person, organization, or meeting:** link the existing entity page, or create one if they matter (pattern in [[note-schema-reference]]).
5. **Promote logs worth keeping.** Read the day's `[i]` lines and `#log/decision` lines. For each one that states something lasting, propose an Atlas note via [[new-note]] and ask before creating it. A decision keeps its form: `Decision: X. Why: Y. Trade-off: Z.` When a line changes a fact about an existing note (a new member of a project, a person's new role or employer), propose the edit to that note too: add the person to the project's `people:`, update the person's `up:` or summary. Show the exact change and apply it on the human's yes.
6. **Ask about parents.** When a new note's `up:` is unclear, ask the human which note it belongs under. Never guess.
7. **Report overdue and waiting tasks.** Read them from frontmatter, the same rule as the Tasks.base views "Overdue" and "Waiting". Overdue: `type: task`, `date_due` before today, `status` not `done` or `dropped`. Waiting: `status: waiting`. List each with its due date and project. Do not change them.
8. **Update indexes:** for every note this review created in `Atlas/` (entity pages included), append its one-line entry to that folder's `index.md`.
9. **Leave the daily note readable:** replace processed dumps with wikilinks to where the content went, so the day still tells its story. Set `date_modified` on every note you edit.
10. **Log it:** one [[log]] entry (`## [YYYY-MM-DD] daily-review | YYYY-MM-DD`) with bullets for what was promoted, filed, or dropped.
11. **Report** anything you were unsure about instead of guessing.

### Sub-mode: develop my fleeting notes

1. Pick one or two notes in `Fleeting/`, oldest first (by `date_created`).
2. For each, propose one of: turn it into an Atlas note via [[new-note]], merge it into an existing note, or drop it. Give your reasoning in a line.
3. Do nothing without the human's approval. Log the outcome as in step 10.

## Output

The daily note with processed dumps replaced by links, every capture filed or dropped, a list of overdue and waiting tasks, and the step 10 log entry. The short-path exit gives one line and no log entry.

## Judgment calls

- Not everything deserves promotion. A capture that means nothing a day later can be dropped; ask when unsure.
- The daily note stays a running log. Never write state snapshots into it.

## Manual checklist (without an AI)

1. Open today's daily note, `Raw/Inbox/` and `Fleeting/`. If nothing is new, stop.
2. For each capture: move sources to `Raw/Sources/` once their content is in the note, promote ideas that hold up to `Atlas/Notes/`, turn tasks into task notes with *New task* (`Ctrl+Alt+T`), and link the people you mention.
3. Look through the day's `[i]` and `#log/decision` lines; write an Atlas note for each that will still be true next month.
4. Open Tasks.base and read the "Overdue" and "Waiting" views.
5. Replace processed dumps with links to where they went.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
