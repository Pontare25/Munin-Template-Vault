# Guide: Working with Projects

A project is the hub that connects meetings, work sessions, people, tasks, logs, and decisions. You do not maintain those connections by hand: you link notes with a few frontmatter fields, and queries assemble the rest. This guide covers the project side; for how the checkbox items themselves work, see [[tasks-and-logs]].

## Create a project

Make a new note from the **project template**. It moves itself into `Efforts/Projects/` and starts with this frontmatter:

```yaml
---
type: project
status: active
up:            # parent, e.g. a broader area
related:       # area, client, or organization
people:        # people on the project
start-date:
due-date:
end-date:
---
```

Fill in what you know; leave the rest empty. `status: active` while the project runs; `done` or `archived` when it closes.

## Link meetings to the project

Make a meeting note from the **meeting template**. On creation it prompts for the meeting's date and time (pre-filled with now); it then prefixes the filename with the date (`2026-08-11 Kickoff`) and files it under `Calendar/Meetings/YYYY/wWW/` (year and ISO week, matching the weekly note). The full datetime is stored in `date:`, so the daily/weekly/monthly rollups pick the meeting up by day. Set three links:

```yaml
---
type: meeting
up: "[[Project Muninize]]"        # the project this meeting belongs to
people:
  - "[[Anna Berg]]"               # people who were there
related: "[[Product Development]]"  # area or context
summary: One line on what the meeting was about.
date: 2026-08-11
---
```

`up` is what pulls the meeting (and everything in it) onto the project. `people` does the same for each person. `summary` and `date` feed the rollup tables below. Any task or log you write in the meeting reaches the project automatically — see [[tasks-and-logs]] for the mechanism.

## Log work with sessions

A meeting is a conversation; a **work session** is a block of focused work you do on the project yourself. Same wiring, different purpose. Make one from the **work-session template**: it prompts for a datetime, prefixes the filename with the date, and files under `Calendar/Work Sessions/YYYY/wWW/` alongside the meetings. Point `up:` at the project:

```yaml
---
type: work-session
up: "[[Project Muninize]]"   # the project you worked on
date: 2026-08-18
summary: One line on what you did.
---
```

The template gives you a **Focus** line (what the session is for), a **Notes** area, and **Log** and **Tasks** sections that behave exactly like the ones in a meeting. Write what you did as logs (`[b] [i] [p] [c]`), link the entities you touched, and it all rolls up to the project and to today's daily note. Use sessions to answer "what did I actually work on, and when" without holding a meeting for it.

## What the project note shows

The project template assembles itself from the linked notes:

- **Last update** — a one-line Dataview that finds the most recent dated note linking this project (a meeting, work session, daily, or dated note) and shows how many days ago it was. Your at-a-glance "is this project still moving." It mirrors the **Last contact** line on a person note.
- **Next actions** — the project's own tasks, written directly here.
- **Tasks from meetings & logs** — open tasks pulled out of every linked meeting, session, and daily.
- **Log** — information items (`[b] [i] [p] [c] [*]`) pulled out of linked notes, newest source first.
- **Meetings** — a Bases table (`![[Meetings.base#Project meetings]]`) of every meeting whose `up` points here.
- **Work sessions** — a separate Bases table (`![[Sessions.base#Project sessions]]`) of every work session for this project.

A person note carries the same shape, scoped to that person instead of the project.

## The Bases model

Two rules explain where every table comes from.

**One base per note `type`, differentiated by view — not by new files.** `Meetings.base` filters `type == "meeting"` once, then offers views that differ by *relationship* to the note embedding it. `Sessions.base` does the same for work sessions.

| View | Shows | Embed on |
|---|---|---|
| `Meetings.base#Project meetings` | meetings linking the embedding project | a project note |
| `Meetings.base#People meetings` | meetings linking the embedding person | a person note |
| `Sessions.base#Project sessions` | work sessions linking the embedding project | a project note |

This is why meetings and sessions stay in **separate** tables on a project note: they are separate types, each with its own base.

**Time rollups that span types live in one combined base.** The daily, weekly, and monthly notes do not care whether something was a meeting or a session — they want everything that happened in the period. A per-type base cannot do that: a base's top-level filter gates every view, and a view can only narrow it, never broaden it. So `Calendar.base` scopes its top filter to the whole `Calendar` folder, and each view — `Daily rollup`, `Weekly rollup`, `Monthly rollup` — does the narrowing: filter to meetings and work sessions, then to its date range. A **Type** column keeps the two distinguishable.

| View | Shows | Embed on |
|---|---|---|
| `Calendar.base#Daily rollup` | meetings + sessions dated that day | a daily note |
| `Calendar.base#Weekly rollup` | meetings + sessions in that week | a weekly note |
| `Calendar.base#Monthly rollup` | meetings + sessions in that month | a monthly note |

Embed any view with `![[BaseName.base#View Name]]`. When you add a new note `type`, give it its own base for entity/project views; if it should also appear in the time rollups, add its type to the rollup views' filters in `Calendar.base`.

## Closing a project

1. Mark remaining tasks `[x]` done or `[-]` cancelled.
2. Capture the outcome and key decisions as logs (`[p]` / `[c]`) so they survive on the project and its people.
3. Set `status: done` (or `archived`) and fill `end-date`.

## See also

- [[tasks-and-logs]] — the status system, the `#task` convention, and how rollup queries work.
- [[Guide to writing daily notes]] — the capture surface that feeds these rollups.
