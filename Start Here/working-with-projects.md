# Guide: Working with Projects

A project is the hub that connects meetings, people, tasks, logs, and decisions. You do not maintain those connections by hand: you link notes with a few frontmatter fields, and queries assemble the rest. This guide covers the project side; for how the checkbox items themselves work, see [[tasks-and-logs]].

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

## What the project note shows

The project template ships with four sections:

- **Next actions** — the project's own tasks, written directly here.
- **Meetings** — a Bases table (`![[Meetings.base#Project meetings]]`) listing every meeting whose `up` points at this project.
- **Tasks from meetings & logs** — a Dataview query pulling open tasks out of the linked meetings and dailies.
- **Log** — a Dataview query pulling information items (`[b] [i] [p] [c] [*]`) out of linked notes, newest source first.

A person note carries the same shape, scoped to that person instead of the project.

## The Bases model

The rule: **one base per note `type`**, and differentiate by adding views, not new files. `Meetings.base` filters `type == "meeting"` once, then offers views that differ by *relationship* to the note embedding it:

| View | Shows | Embed on |
|---|---|---|
| Project meetings | meetings linking the embedding project | a project note |
| People meetings | meetings linking the embedding person | a person note |
| Daily meeting rollup | meetings whose `date` matches the embedding daily | a daily note |

Embed a specific view with `![[Meetings.base#View Name]]`. When you need to roll up a different note type (projects under an area, say), create a new base for that type and follow the same pattern.

## Closing a project

1. Mark remaining tasks `[x]` done or `[-]` cancelled.
2. Capture the outcome and key decisions as logs (`[p]` / `[c]`) so they survive on the project and its people.
3. Set `status: done` (or `archived`) and fill `end-date`.

## See also

- [[tasks-and-logs]] — the status system, the `#task` convention, and how rollup queries work.
