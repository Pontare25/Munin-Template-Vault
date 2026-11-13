---
type: sop
version: 1
summary: Sort the daily note and Raw/Inbox captures into sources, notes, tasks and entity links
---

# SOP: Daily Review

Sweep the daily note and the inbox so capture stays effortless. The human's only job is to dump things into today's daily note; this SOP is where those dumps get sorted.

**Trigger:** the human says "review my day", "sweep the daily note", "process my inbox", or similar. Works on any day's note, defaulting to today.

## Steps

1. **Open the daily note** (`Calendar/Daily Notes/YYYY/MM-MMM/YYYY-MM-DD.md`, filed by the Journals plugin). If it does not exist, say so and stop.
2. **Also list `Raw/Inbox/`** for captures that arrived outside the daily note.
3. **Walk every item** in the note's capture section and the inbox. For each one, classify:
   - **Source material** (link, article, quote worth keeping): move it to `Raw/Sources/` as a `type: source` note, then run [[ingest]] on it (ask first if there are more than a couple).
   - **Fleeting idea:** promote to an atomic note in `Atlas/Notes/` via [[new-note]] if it holds up; otherwise move it to a note in `Fleeting/` to mature, or drop it with the human's blessing.
   - **Task:** create a task note in `Efforts/TaskNotes/Tasks/` named `task - <title>.md`, with the keys from the Tasks section of [[note-schema-reference]]: `type: task`, `title: <title>`, `status: backlog`, `up:` the effort it belongs to (its project, or an Area for a task outside any project) and `origin:` the daily note. Give it the body of `System/Templates/Templater/Effort-templates/task-note-template.md`. Then replace the capture in the daily note with the reference line `- [t] #task [[task - <title>|<title>]]`, the same line the *New task* command (Ctrl+Alt+T) writes.
   - **Mention of a person, organization, or meeting:** link the existing entity page, or create one if they matter (pattern in [[note-schema-reference]]).
4. **Update indexes:** for every note this review created in `Atlas/` (entity pages included), append its one-line entry to that folder's `index.md`.
5. **Leave the daily note readable:** replace processed dumps with wikilinks to where the content went, so the day still tells its story.
6. **Log it:** one [[log]] entry (`## [YYYY-MM-DD] daily-review | YYYY-MM-DD`) with bullets for what was promoted, filed, or dropped.
7. **Report** anything you were unsure about instead of guessing.

## Output

The daily note with processed dumps replaced by links, every capture filed or dropped, and the step 6 log entry.

## Judgment calls

- Not everything deserves promotion. A capture that means nothing a day later can be dropped; ask when unsure.
- If the capture section is empty, say so and stop. No busywork.

## Manual checklist (without an AI)

1. Open today's daily note and `Raw/Inbox/`.
2. For each capture: move sources to `Raw/Sources/`, promote ideas that hold up to `Atlas/Notes/` or `Fleeting/`, turn tasks into task notes with *New task* (`Ctrl+Alt+T`), and link the people you mention.
3. Replace processed dumps with links to where they went.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
