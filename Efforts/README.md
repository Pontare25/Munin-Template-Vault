# Efforts

The action layer: everything you are trying to do, as opposed to everything you know. Each effort is one note (or a small folder) with a `status:` field that tracks its energy level. Efforts move between statuses, not folders, while they are open; once `done` or `dropped`, the monthly review moves them to `Archive/`.

| Status | Meaning |
|---|---|
| `backlog` | Committed, not started; for an area, not in focus now |
| `active` | Being worked now |
| `waiting` | Blocked on someone or something else (projects only) |
| `done` | Finished (projects only) |
| `dropped` | Stopped, not finishing; kept for the record |

Set it with the status selector at the top of a project or area note. Areas use `active`, `backlog` and `dropped` only. Full rules in [[note-schema-reference]].

## Subfolders

| Folder | Holds |
|---|---|
| `Projects/` | Efforts with an end: ship it, finish it, decide it (`type: project`) |
| `Areas/` | Ongoing responsibilities with no end date (`type: area`) |
| `Learning/` | Learning projects, one folder per subject (`Learning/<Subject>/Project - <Subject>.md`, `type: project`, under the Learning Area) |
| `TaskNotes/Tasks/` | Task notes, one per task (`type: task`), created by the TaskNotes plugin |
| `TaskNotes/Views/` | View Bases the TaskNotes plugin generates (task list, kanban, calendar, agenda and more) |

## What belongs here

- Project and area notes with `type:`, `status:`, `up:`, `date_created:` frontmatter.
- Plans, task lists, and working notes that serve a specific effort.

## What does not belong here

- Reusable knowledge produced by a project (promote it to `Atlas/`, link it from the project).
- Time-bound records like meeting notes (those live in `Calendar/` and link here).

## Dashboard

![[Efforts.base]]

## Governing SOPs

[[new-note]] for creation. [[daily-review]] links daily captures to their efforts.

## Index

<!-- The ingest SOP appends one line per note: - [[Effort Name]]: status, one-line summary -->
