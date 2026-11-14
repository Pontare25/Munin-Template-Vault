# Note Schema

Core rules; read this before writing a note. **Links for things, fields for kinds and structure.** Detail, examples and the field registry live in [[note-schema-reference]].

## Required on every note

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
  | `ai-agent` | `Atlas/Entities/Agents/` | AI agent you assign tasks to |
  | `framework` | `Atlas/Frameworks/` | Named method or model |
  | `project` | `Efforts/Projects/`, `Efforts/Learning/` | Effort with an end |
  | `area` | `Efforts/Areas/` | Ongoing responsibility |
  | `daily` to `yearly` | `Calendar/<Period> Notes/` | Journal notes: `daily`, `weekly`, `monthly`, `quarterly`, `yearly` |
  | `meeting` | `Calendar/Meetings/` | Meeting note |
  | `work-session` | `Calendar/Work Sessions/` | Focused work block |
  | `task` | `Efforts/TaskNotes/Tasks/` | One task; TaskNotes writes its keys, never a template |
  | `dashboard` | `Dashboards/` | Overview querying other notes |
  | `sop` | `AI-OS/SOPs/` | A procedure the AI follows ([[sop-format]]) |

- **`date_created:`** ISO `YYYY-MM-DDTHH:mm`. Templates fill it.
- **`summary:`** recommended outside `Calendar/`: one line on what the note holds; indexes and Bases use it.

## Dates

Journal notes carry `date`, the first day of their period. Every other date is `date_<what>` in snake_case: `date_start`, `date_end`, `date_due`, `date_scheduled`, `date_completed`, `date_modified`. Exception: `birthday` on person notes. Set `date_modified` when you change a note's content.

## Links

- **`topics:`** links to Topic pages in `Atlas/Topics/`. When an ingest needs a topic that does not exist, create a stub (one-line definition, empty compass).
- **`people:`** links to person notes, on any type.
- **The compass:** `up:` (the broader theme above it), `related:` (similar), `down:` (what follows from it), `opposes:` (what it is in tension with). Say why when a link is not obvious.
- **`area:`** on projects, tasks, meetings and work sessions: the top-level Area (Work, Personal, Learning). New task and the project template copy it from the parent; lint proposes it elsewhere.
- **Relationship fields are always YAML lists, even with one value:** `up`, `related`, `down`, `opposes`, `people`, `skills`, `interests`, `area`. An inline value breaks every Base filter on that field.

| Type | `up:` points at |
|---|---|
| `note`, `framework` | a topic (required) |
| `source` | the topic it informs (required), plus `topics:` |
| `person`, `organization` | an Area or the organization (required) |
| `project`, `task` | its project, or its Area |
| `topic`, `moc`, `area` | a broader one, when there is one |
| everything else | nothing required |

## Status on efforts

Projects, areas and tasks carry `status:`: `backlog`, `active`, `waiting`, `done`, `dropped`. Areas use only `active`, `backlog` and `dropped`. `backlog`, `active` and `waiting` are open. Closed efforts move to `Archive/` at the monthly review, through Obsidian.

## AI provenance

Set `ai: pending` on a note you write; the user changes it to `approved`, `collaborative` or `checked`. For a section inside a human note, put `%% #AI-Assisted %%` above it instead.

## Changing the schema

A new field or `type:` value needs the user's sign-off and the [[note-schema-reference#Field registry|field registry]] updated in the same change.
