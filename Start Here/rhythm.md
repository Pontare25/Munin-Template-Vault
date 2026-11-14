# Guide: Your Rhythm

The vault stays useful when a few short routines run on a schedule: a daily sweep, a weekly review, a monthly review. Each routine is a SOP the AI follows when you ask ("do my weekly review"), and each SOP ends with a checklist you can follow by hand. This guide shows the rhythm and embeds those checklists, so there is one copy of each.

| When | Routine | Ask the AI | Time |
|---|---|---|---|
| Every day | Write into the daily note; sweep captures | "review my daily note" | 5 to 10 minutes |
| Every week | Weekly review | "do my weekly review" | 30 minutes |
| Every month | Monthly review, Areas, archive | "do my monthly review" | 45 minutes |
| When it happens | Start or close a project; close a meeting; ingest a source; merge notes | "start a project", "close the meeting", "ingest this", "merge these notes" | minutes |

## Daily: write into the day

The daily note is where the day is captured as it happens. You write into it; the reviews sort it out afterward. You never decide where a thought belongs while you are having it. Old daily notes stay as they were written: the daily note is a log, not a status page.

| Section | What goes here |
|---|---|
| **Due** | Shows only on today's note, and only when something needs you: no weekly note last week, waiting tasks past their chase date. |
| **Daily Summary** | One or two lines on what the day was about, written at the end of the day. It fills `summary:`, which the weekly and monthly rollups show for this day. |
| **Brain dump** | Unsorted thoughts, half-tasks, things to remember. Nothing queries it; the daily review sweeps it. |
| **Today's top 3** | The three things that matter most today. A focus anchor, not a task list. |
| **Logs** | What happened and what you learned, split into Morning, Afternoon and Evening. This is what feeds projects, people and rollups. |
| **Tasks** | Views that fill themselves: tasks created and completed today, **Next actions** (open tasks due by today, earliest first, overdue included) and the next two weeks. |
| **Meetings & sessions** | Every meeting and work-session note whose `date_start` is today, with their logs and tasks. |

Two habits make the logs work:

1. **Pick the right marker.** `[b]` for something that happened, `[i]` for a standing fact, `[p]` or `[c]` for a plus or a concern. Insert a log bullet with `Ctrl+Alt+L` and press it again to cycle the marker. For something to do, press `Ctrl+Alt+T` instead: it makes a task note. A decision is a log line tagged `#log/decision` that says what, why and the trade-off. The full system is in [[tasks-and-logs]].
2. **Link what the log is about.** `[b] Kickoff with [[Jane Doe]] [[Project - Website]]`. A linked log shows up on that project and that person; an unlinked log stays in the daily note and rolls up nowhere.

![[daily-review#Manual checklist (without an AI)]]

## Weekly

The weekly review clears what slipped through the week: overdue and waiting tasks, people to follow up, five AI notes waiting for your review, a quick lint of the notes that changed, and lessons worth keeping. Write what annoyed you about the system on the weekly note's **System friction** line: the AI reads it and adjusts.

![[weekly-review#Manual checklist (without an AI)]]

![[lint#Manual checklist (without an AI)]]

## Monthly

The monthly review looks one level up: is every active Area moving, are your priorities drifting, and which closed projects move to `Archive/`. The [[AoR Review]] dashboard is embedded in the monthly note.

![[monthly-review#Manual checklist (without an AI)]]

## When it happens

**Projects:**

![[project-lifecycle#Manual checklist (without an AI)]]

**Meetings:**

![[meeting-close#Manual checklist (without an AI)]]

**Sources:**

![[ingest#Manual checklist (without an AI)]]

**A new note by hand:**

![[new-note#Manual checklist (without an AI)]]

**Questions to the vault:**

![[query#Manual checklist (without an AI)]]

**Two notes that say the same thing:**

![[merge-notes#Manual checklist (without an AI)]]

## See also

- [[first-hour]]: the first daily note, task and source.
- [[tasks-and-logs]]: task notes, log markers and the rollups.
- [[working-with-projects]]: how projects, meetings and people connect.
- [[ai-setup]]: how the AI finds and follows these routines.
