---
type: sop
version: 1
summary: Turn a meeting note's action items into task notes, record decisions with their reason, and link the people
---

# SOP: Meeting Close

Close a meeting note so nothing agreed in the room stays as loose text. Each item in `actions:` becomes a task note or moves to `details:`, and each decision is written down with its reason and its trade-off.

**Trigger:** "close the meeting", "turn the actions into tasks".

## Steps

1. **Read the meeting note.** Read `up:`, `area:`, `people:`, `summary:`, `details:` and `actions:`, and the Notes section. If `actions:` is empty or every item is a link to a task note, skip steps 2 to 4 and go to the decisions (step 5); if the decisions are also recorded, the meeting is already closed: say so and stop.
2. **Sort the actions.** For each plain-text item in `actions:`, ask the human: is this a task? Batch the questions in one round, recommended answer first. Use Notes and `details:` to suggest who owns it and any due date.
3. **Create a task note for each yes.** File it as `Efforts/TaskNotes/Tasks/task - <title>.md`, the way the New task command does (keys in [[note-schema-reference]], Tasks section):
   - `type: task`, `title:`, `status: backlog`, `priority: normal`
   - `contexts:` personal or work; take it from the project's `area:`, or ask
   - `up:` the project the meeting links in its `up:` (ask if the meeting has none)
   - `origin:` the meeting note
   - `area:` copied from that project (if it has none, the top-level Area its `up:` chain reaches)
   - `assignees:` the person, only when someone other than the human owns it
   - `date_due:` only when the meeting stated a date
   If more than ten tasks result, ask for one batch approval first.
4. **Rewrite `actions:`.** Replace each line that became a task with the quoted task wikilink, for example `"[[task - Send the timeline|Send the timeline]]"`. Move each line that is not a task into `details:`. Edit only the `actions:` and `details:` lines of the meeting note, with the human's approval, because the human wrote them.
5. **Record the decisions.** List each decision the meeting made (look in Notes and `details:`). For each, write one line in `details:`: `Decision: X. Why: Y. Trade-off: Z.` If the reason or trade-off is missing, ask the human; do not guess. Then offer a line in the meeting day's daily note under Logs: `- [b] #log/decision <the decision> [[meeting note]]`. Add it only on a yes. The convention is in [[tasks-and-logs]].
6. **Link the people.** Make sure each person named in the notes is in `people:` and linked in `details:`. Create no new person note without asking; offer [[new-note]] for a person who matters.
7. **Log it** in [[AI-OS/log|log]]: `## [YYYY-MM-DD] meeting-close | <meeting note>`, with one bullet per task, decision and moved item.

## Output

A meeting note whose `actions:` holds only task links, whose `details:` holds the decisions and the non-task items, and whose people are linked; the new task notes with `origin:` pointing back at the meeting; optional decision lines in the daily note.

## Judgment calls

- An action with no owner and no clear next step is usually a `details:` item, not a task. Say so when you recommend.
- A decision the human wants to keep for years is worth an Atlas note ([[new-note]]); a `details:` line and a daily log line are enough for the rest. No `type: decision` exists.
- When the meeting has no project, create the tasks with `up:` set to an Area and tell the human.

## Manual checklist (without an AI)

1. Open the meeting note and read `actions:`. If it holds only task links, stop.
2. For each action that is a task, put the cursor on an empty line in the note and press `Ctrl+Alt+T`. Pick the project and, if someone else owns it, the assignee. Set the due date if one was stated.
3. In the frontmatter, replace each converted action with its task link and move the rest into `details:`.
4. For each decision, add `Decision: X. Why: Y. Trade-off: Z.` to `details:`, and log it in the daily note with `Ctrl+Alt+L` and the tag `#log/decision`.
5. Check `people:` and link the people named.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
