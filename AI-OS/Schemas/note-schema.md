# Note Schema

The core rules every note follows; read this before writing a note. Rule of thumb: **links for things, fields for kinds and structure.** Examples and detail (date fields, meetings, tasks, people, OKF mapping) live in [[note-schema-reference]].

## Required on every note

```yaml
---
type: note
date_created: 2026-01-15T09:30
---
```

- **`type:`** says what kind of note it is. Classification is this field alone, never a tag; the only tag in use is `#example`.

  | Value | Lives in | Meaning |
  |---|---|---|
  | `fleeting` | `Fleeting/` | Quick capture, not yet filed |
  | `note` | `Atlas/Notes/` | Atomic note, one idea |
  | `topic` | `Atlas/Topics/` | Topic hub with full compass |
  | `moc` | `Atlas/MOCs/` | Curated map of content |
  | `source` | `Raw/Sources/` | Captured external material |
  | `person` | `Atlas/Entities/People/` | A person |
  | `organization` | `Atlas/Entities/Organizations/` | An organization |
  | `framework` | `Atlas/Frameworks/` | Named method or model |
  | `project` | `Efforts/Projects/` | Effort with an end |
  | `area` | `Efforts/Areas/` | Ongoing responsibility |
  | `daily` to `yearly` | `Calendar/<Period> Notes/` | Journal notes: `daily`, `weekly`, `monthly`, `quarterly`, `yearly` |
  | `meeting` | `Calendar/Meetings/` | Meeting note |
  | `work-session` | `Calendar/Work Sessions/` | Focused work block on a project |
  | `task` | `Efforts/TaskNotes/Tasks/` | One task, written by the TaskNotes plugin |
  | `dashboard` | `Dashboards/` | Overview that queries other notes |
  | `sop` | `AI-OS/SOPs/` | A procedure the AI follows ([[sop-format]]) |

- **`date_created:`** ISO `YYYY-MM-DDTHH:mm`. Templates fill it.
- **`summary:`** strongly recommended outside `Calendar/`: one line on what the note holds. Indexes, Bases and retrieval use it.

## Dates

Journal notes carry `date`, the first day of their period. Every other date is `date_<what>` in snake_case: `date_start`, `date_end`, `date_due`, `date_scheduled`, `date_completed`, `date_modified`. The one exception is `birthday` on person notes. Set `date_modified` when you change a note's content.

## Links

- **`topics:`** links to Topic pages in `Atlas/Topics/`; there are no category tags. When an ingest needs a topic that does not exist, create a stub (one-line definition, empty compass).
- **`people:`** links to person notes, on any type.
- **The compass:** `up:` (the broader theme above it), `related:` (similar), `down:` (what follows from it), `opposes:` (what it is in tension with). Say why in one clause when a link is not self-explanatory.
- **Relationship fields are always YAML lists, even with one value:** `up`, `related`, `down`, `opposes`, `people`, `skills`, `interests`. An inline value breaks every Base filter on that field.

| Type | Required besides `type` and `date_created` |
|---|---|
| `topic` | all four compass keys |
| `source` | `up:` and `topics:` |
| `moc` | nothing (`up:` when it sits inside a larger map) |
| `sop` | nothing, not even `date_created:` |
| everything else | `up:` |

## Status on efforts

Projects, areas and tasks carry `status:` in single lowercase words: `backlog`, `active`, `waiting`, `done`, `dropped`. Areas use only `active`, `backlog` and `dropped`. `backlog`, `active` and `waiting` are open. Efforts change status, never folder. Set it with the note's status selector.

## Tasks

TaskNotes writes task notes and their keys (`Efforts/TaskNotes/Tasks/task - <title>.md`); never hand-add those keys to a template. `up:` links the task's project, or an Area for a task outside any project.

## AI provenance

Mark what the AI writes with `%% #AI-Assisted %%` at the top of the note or section.

## Left out on purpose

No tags beyond `#example`, no status outside Efforts, and no mandatory fields beyond `type:` and `date_created:`.
