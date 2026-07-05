# SOP: Daily Review

Sweep the daily note and the inbox so capture stays effortless. The human's only job is to dump things into today's daily note; this SOP is where those dumps get sorted.

**Trigger:** the human says "review my day", "sweep the daily note", "process my inbox", or similar. Works on any day's note, defaulting to today.

## Steps

1. **Open the daily note** (`Calendar/Daily Notes/YYYY-MM-DD.md`). If it does not exist, say so and stop.
2. **Also list `Raw/Inbox/`** for captures that arrived outside the daily note.
3. **Walk every item** in the note's capture section and the inbox. For each one, classify:
   - **Source material** (link, article, quote worth keeping): move it to `Raw/Sources/` as a `type: source` note, then run [[ingest]] on it (ask first if there are more than a couple).
   - **Fleeting idea:** promote to an atomic note in `Atlas/Notes/` via [[new-note]] if it holds up; otherwise move to `Raw/Ideas/` to mature, or drop it with the human's blessing.
   - **Task:** add it to the relevant effort note in `Efforts/`, or leave it as a checkbox in the daily note if it is same-day trivia.
   - **Mention of a person, organization, or meeting:** link the existing entity page, or create one if they matter (pattern in [[note-schema]]).
4. **Leave the daily note readable:** replace processed dumps with wikilinks to where the content went, so the day still tells its story.
5. **Log it:** one [[log]] entry (`## [YYYY-MM-DD] daily-review | YYYY-MM-DD`) with bullets for what was promoted, filed, or dropped.
6. **Report** anything you were unsure about instead of guessing.

## Judgment calls

- Not everything deserves promotion. A capture that means nothing a day later can be dropped; ask when unsure.
- If the capture section is empty, say so and stop. No busywork.
