# Guide: Working with Projects

A project is the hub that connects meetings, work sessions, people, tasks, logs, and decisions. You do not maintain those connections by hand: you link notes with a few frontmatter fields, and queries assemble the rest. This guide covers the project side; for how tasks and logs themselves work, see [[tasks-and-logs]].

## Create a project

The project template does not ask for a name; it takes the note's current name. So inserting it into a fresh, unnamed note gives you `Project - Untitled`. The route that works:

1. Press **`Ctrl+N`**. The new note lands in `Fleeting/` and asks for a name: type the project's name (for example `Website`). A note created by clicking a not-yet-existing `[[link]]` already has its name and skips this prompt.
2. Click the note's **Promote note** button (or run *Templater: Insert Commands/promote-note*) and choose **project**.
3. Answer the template's two questions: the parent project (or top-level) and, for a top-level project, its Area.

The template then moves the note into its own folder under `Efforts/Projects/`, renames it `Project - <title>` (here `Project - Website`), adds the plain title as an alias, and keeps anything you had already written in the note. Link the project by its full name, `[[Project - <title>]]`: the `up:` links that queries follow, and the links the pickers write, use that name. The alias only helps you find it in search and link suggestions.

The new project note starts with this frontmatter:

```yaml
---
type: project
status: active
up:            # parent: the Area (top-level project) or the parent project
related:       # client or organization
people:        # people on the project
date_start:
date_due:
date_end:
---
```

Fill in what you know; leave the rest empty. `status: active` while the project runs; `done` or `dropped` when it closes.

**Status selector.** The status selector at the top of a project or area note sets `status` from a dropdown, so you never hand-edit it: projects offer `backlog, active, waiting, done, dropped`; areas offer `active, simmering, dropped`. See [[note-schema]] for what each value means.

**Sub-projects.** When you create a project, the template asks for an optional parent. Pick one and the note is filed under that parent's folder (`Efforts/Projects/Parent Project/Child Project/…`) and its `up:` is filled with the parent link automatically; choose top-level and it asks which active Area the project belongs to, then fills `up:` with that Area (pick "(no Area)" to leave it empty). `up:` always points one level up: task to project, sub-project to project, project to Area, so everything rolls up to its Area. The folder nesting is cosmetic: the `up` link, not the folder, is what wires the rollup, so the parent note's **Sub Projects** board (a kanban with one column per status) lists it.

## Link meetings to the project

Make a meeting note from the **meeting template**. On creation it prompts for the meeting's date and time (pre-filled with now); it then prefixes the filename with the date (`2026-03-02 Kickoff`) and files it under `Calendar/Meetings/YYYY/wWW/` (year and ISO week, matching the weekly note). The full datetime is stored in `date_start:`, so the daily/weekly/monthly rollups pick the meeting up by day. If a meeting runs long, add `date_end:` by hand. Set three links:

```yaml
---
type: meeting
up:
  - "[[Project - Website]]"       # the project this meeting belongs to
people:
  - "[[Jane Doe]]"                # people who were there
related:
  - "[[Area name]]"               # area or context
summary: One line on what the meeting was about.
details:
  - Launch moved to Q3            # points worth keeping
actions:
  - Send the revised timeline     # follow-ups agreed
date_start: 2026-03-02T10:00
---
```

`up` is what pulls the meeting (and everything in it) onto the project. `people` does the same for each person. `summary` and `date_start` feed the rollup tables below.

The meeting note has **Agenda** and **Notes** sections for during the meeting, and a **Minutes** section for its close: a summary field and two lists, **Details** and **Actions**, that write `summary`, `details` and `actions`. A table at the top shows the three, and the **Copy meeting minutes** button copies title, summary, attendees, details and actions as markdown, ready to paste into an email or chat. Actions are plain follow-up lines, not task notes; capture a real task with `Ctrl+Alt+T`. Any log you write in the meeting reaches the project automatically. A task you capture there (`Ctrl+Alt+T`) is its own note: set its project in the create window, because the meeting's `up` does not pass on to it. See [[tasks-and-logs]] for both mechanisms.

## Log work with sessions

A meeting is a conversation; a **work session** is a block of focused work you do on the project yourself. Same wiring, different purpose. Make one from the **work-session template**: it prompts for a datetime, prefixes the filename with the date, and files under `Calendar/Work Sessions/YYYY/wWW/` alongside the meetings. Point `up:` at the project:

```yaml
---
type: work-session
up:
  - "[[Project - Website]]"  # the project you worked on
date_start: 2026-03-04T13:00
summary: One line on what you did.
---
```

The template gives you a **Focus** line (what the session is for), a **Notes** area, and **Log** and **Tasks** sections. Write what you did as logs (`[b] [i] [p] [c]`), link the entities you touched, and it all rolls up to the project and to today's daily note. Use sessions to answer "what did I actually work on, and when" without holding a meeting for it.

## What the project note shows

The project template assembles itself from the linked notes:

- **Last update**: a one-line Dataview that finds the most recent dated note linking this project (a meeting, work session, daily, or dated note) and shows how many days ago it was. Your at-a-glance "is this project still moving." It mirrors the **Last contact** line on a person note.
- **Tasks**: a board of the project's task notes (every task whose `up:` is this project), one column per status (`![[Tasks.base#Project open]]`). Its **New** button creates a task with `up:` already set to this project. Below it, two folded views: **Closed tasks** (`done` and `dropped`, newest first) and **Sub-project tasks** (the tasks of the direct sub-projects, one row per sub-project).
- **Logs**: information items (`[b] [i] [p] [c] [*]`) and task reference lines (`[t] #task`) pulled out of linked notes, newest source first, with the collapsible **Advanced log** below for filtering and export. A line shows here when it links the project itself, or when it sits in a note whose `up:` is the project (a meeting or work session). A task reference line links the task, not the project, so it shows here only when it was captured in such a note; reference lines captured in a daily note do not reach the project's Logs (the task itself is on the **Tasks** board).
- **Meetings**: a Bases table (`![[Meetings.base#Project meetings]]`) of every meeting whose `up` points here, one line each with its summary. Switch the table to **Project meetings detailed** (the view menu at the top of the table) to add each meeting's details and actions.
- **Work sessions**: a separate Bases table (`![[Sessions.base#Project sessions]]`) of every work session for this project.

A person note carries the same shape, scoped to that person instead of the project: its Tasks board shows the tasks assigned to them (`assignees:`), and its New button pre-fills the assignee.

## The Bases model

Two rules explain where every table comes from.

**One base per note `type`, differentiated by view — not by new files.** `Meetings.base` filters `type == "meeting"` once, then offers views that differ by *relationship* to the note embedding it. `Sessions.base` does the same for work sessions.

| View | Shows | Embed on |
|---|---|---|
| `Meetings.base#Project meetings` | meetings linking the embedding project | a project note |
| `Meetings.base#Project meetings detailed` | the same meetings with their details and actions | a project note (switch views) |
| `Meetings.base#People meetings` | meetings linking the embedding person | a person note |
| `Meetings.base#People meetings detailed` | the same meetings with their details and actions | a person note (switch views) |
| `Sessions.base#Project sessions` | work sessions linking the embedding project | a project note |

This is why meetings and sessions stay in **separate** tables on a project note: they are separate types, each with its own base.

**Time rollups that span types live in one combined base.** The daily, weekly, and monthly notes do not care whether something was a meeting or a session — they want everything that happened in the period. A per-type base cannot do that: a base's top-level filter gates every view, and a view can only narrow it, never broaden it. So `Calendar.base` scopes its top filter to the whole `Calendar` folder, and each view — `Daily rollup`, `Weekly rollup`, `Monthly rollup` — does the narrowing: filter to meetings and work sessions, then to its date range. The range compares each row's `anchor` formula (a meeting's or session's `date_start`) with the embedding journal note's own `date`. A **Type** column keeps the two distinguishable.

| View | Shows | Embed on |
|---|---|---|
| `Calendar.base#Daily rollup` | meetings + sessions dated that day | a daily note |
| `Calendar.base#Weekly rollup` | meetings + sessions in that week | a weekly note |
| `Calendar.base#Monthly rollup` | meetings + sessions in that month | a monthly note |

Embed any view with `![[BaseName.base#View Name]]`. When you add a new note `type`, give it its own base for entity/project views; if it should also appear in the time rollups, add its type to the rollup views' filters and to the `anchor` formula in `Calendar.base`.

## Closing a project

1. Close the open tasks on the project's **Tasks** board: set each to `done` or `dropped`, or move it to another project or Area by changing its `up:`. Open tasks left behind show on the [[Tasks]] dashboard under **Open tasks in inactive projects**.
2. Capture the outcome and key decisions as logs (`[p]` / `[c]`) so they survive on the project and its people.
3. Set `status: done` (or `dropped` if it stopped short) and fill `date_end`.

## See also

- [[tasks-and-logs]]: task notes, statuses, capture, and how the rollup queries work.
- [[Guide to writing daily notes]]: the capture surface that feeds these rollups.
