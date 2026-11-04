# Efforts

The action layer: everything you are trying to do, as opposed to everything you know. Each effort is one note (or a small folder) with a `status:` field that tracks its energy level. Efforts move between statuses instead of moving between folders.

| Status | Meaning |
|---|---|
| `backlog` | Committed, not started (projects only) |
| `active` | Being worked now |
| `waiting` | Blocked on someone or something else (projects only) |
| `simmering` | Paused by choice, revisit later (areas only; a paused project goes back to `backlog`) |
| `done` | Finished (projects only) |
| `dropped` | Stopped, not finishing; kept for the record |

Set it with the status selector at the top of a project or area note. Areas use `active`, `simmering` and `dropped` only. Full rules in [[note-schema]].

## Subfolders

| Folder | Holds |
|---|---|
| `Projects/` | Efforts with an end: ship it, finish it, decide it (`type: project`) |
| `Areas/` | Ongoing responsibilities with no end date (`type: area`) |
| `Learning/` | Subjects you are deliberately studying |
| `TaskNotes/Tasks/` | Task notes, one per task (`type: task`), created by the TaskNotes plugin |
| `TaskNotes/Views/` | View Bases the TaskNotes plugin generates (task list, kanban, calendar, agenda and more) |
| `TaskNotes/Archive/` | Archived tasks; the plugin creates this folder the first time you archive a task |

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
