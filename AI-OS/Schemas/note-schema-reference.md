# Note Schema Reference

Detail behind [[note-schema]], the core every note follows. Read the core first; open this file when a note needs a field, example or rule the core only names.

## Date properties

**`date:`** on journal notes (daily through yearly) marks the period the note covers, as a `YYYY-MM-DD` date (the period's first day). **Meeting and work-session notes carry `date_start:` instead**, a full ISO `YYYY-MM-DDTHH:mm` datetime (their templates prompt for it), and the filename is prefixed with the date. A daily note's meeting rollup matches a meeting's `date_start` day against the daily note's own `date` (`dateformat(date_start, "yyyy-MM-dd") = dateformat(this.date, "yyyy-MM-dd")`); the Calendar base's period rollups do the same through a per-type anchor formula.

Every date in frontmatter follows one naming rule, so date fields are predictable, sit together in the properties panel, and never leave a query guessing between near-synonyms:

- A journal note's own anchor date is a bare **`date`** (daily, weekly, monthly, quarterly, yearly). The Journals plugin and the Calendar rollups read it. The plugin also reads **`journal:`** (`daily` to `yearly`) to know which journal a note belongs to; keep it.
- Every other date property is **`date_<what>`**, in snake_case. Snake_case names work unbracketed in Bases, Dataview, and scripts (`note.date_due`); a hyphenated name would be read as subtraction.
- **One exception: `birthday`** on person notes keeps its everyday name.

| Property | Type | Used on | Meaning |
|---|---|---|---|
| `date` | date | daily, weekly, monthly, quarterly, yearly | First day of the period the note covers |
| `date_created` | datetime | every note | When the note was created. Templates fill it |
| `date_modified` | datetime | every note made from a template | When the note's content last changed. Templates leave it empty; whoever edits the note (an AI edit, or you) fills it |
| `date_start` | datetime | meetings, work sessions, projects | When it starts or started. Meeting and session templates prompt for it; the project template seeds today's date |
| `date_end` | datetime | meetings, work sessions, projects | When it ended. Add it by hand when an event runs longer; fill it when a project closes |
| `date_due` | datetime | projects, tasks | Target date |
| `date_scheduled` | datetime | tasks | The day you plan to work on the task. TaskNotes sets today on every new task |
| `date_completed` | date | tasks | Set by TaskNotes when the task reaches `done` or `dropped` |
| `birthday` | date | person | The documented exception to the naming rule |

Property types are vault-wide (`.obsidian/types.json`), one type per property. The rule is datetime wherever a time may matter. A date-only value such as `2026-01-15` is still valid in a datetime property, so projects can keep writing plain dates.

## Topics

- **`topics:`** is a list of wikilinks to Topic pages in `Atlas/Topics/`:

  ```yaml
  topics:
    - "[[Active Recall]]"
    - "[[Learning]]"
  ```

- Topics replace category tags completely. There is no `#on/...` namespace, no keyword tags. If a note is "about" something, that something is a Topic page and the note links to it.
- **First reference rule:** when an ingest assigns a topic that does not exist yet, the AI creates a stub Topic page (one-line definition plus an empty compass skeleton) in `Atlas/Topics/` and links to it. Stubs grow into real pages as more notes reference them.

## People on notes

- **`people:`** is a list of wikilinks to person notes (`Atlas/Entities/People/`) tied to this note: meeting participants, project members, anyone involved in the effort or event.

  ```yaml
  people:
    - "[[Jane Doe]]"
  ```

- One field across every type. Meetings, projects, and anything else use `people:` rather than per-type fields; it replaces the earlier `attendees:` (meetings) and `members:` (projects). The `Meetings.base` "People meetings" view keys off it to surface every meeting a person was in.

## Meeting minutes

Meeting notes carry their minutes in three fields, filled from the **Minutes** section of the meeting template (Meta Bind inputs):

- **`summary:`** one line on what the meeting was about, the same high-level field every note has.
- **`details:`** a list of the points worth keeping: what was discussed, decided or learned.
- **`actions:`** a list of follow-ups agreed in the meeting. Plain text, not task notes; capture a real task with *New task* (`Ctrl+Alt+T`).

  ```yaml
  summary: Kickoff with the client; scope agreed
  details:
    - Launch moved to Q3
    - Jane owns the content inventory
  actions:
    - Send the revised timeline to Jane
  ```

The `Meetings.base` high-level views (*Project meetings*, *People meetings*) show `summary`; the detailed views (*Project meetings detailed*, *People meetings detailed*) add `details` and `actions`. The meeting's **Copy meeting minutes** button copies title, summary, attendees, details and actions as markdown.

## The idea compass

Four frontmatter keys place a note in the landscape of ideas, like compass directions:

| Key | Direction | Ask yourself |
|---|---|---|
| `up:` | North | Where does this come from? What broader theme or principle sits above it? |
| `related:` | West | What is similar? What reinforces or parallels this? |
| `down:` | South | What follows from this? Where could it lead or apply? |
| `opposes:` | East | What competes with this? What tension or opposite does it face? |

All four take lists of wikilinks. When a compass link is not self-explanatory, say why it is there in one clause in the note body; a link whose reason is forgotten is half a link.

> [!warning] Relationship fields are always lists, even with one value
> `up`, `related`, `down`, `opposes`, `people`, `skills`, and `interests` must be written as a YAML **list**, even for a single link:
> ```yaml
> up:
>   - "[[Parent]]"
> ```
> A single value written inline (`up: "[[Parent]]"`) is read by Bases as a scalar `Link`, not a list, so every `.contains(...)` / `.filter(...)` view filter silently returns nothing (the parent's Sub projects table, a meeting's Project/People rollups, Child/Related notes, all go blank). Obsidian's property editor writes the list form automatically; only hand-edited or imported notes get this wrong.

How much compass a note needs depends on its type:

| Type | Required | Encouraged |
|---|---|---|
| `topic` | All four compass keys | |
| `note` | `up:` + `date_created:` | `topics:`, `related:`, `down:`, `opposes:` |
| `source` | `up:` + `topics:` | `related:` |
| `moc` | `date_created:` | `up:` when the map sits inside a larger map (top-level maps have no up) |
| everything else | `up:` + `date_created:` | whatever earns its place |

A complete topic frontmatter looks like this:

```yaml
---
type: topic
date_created: 2026-01-15T09:30
up:
  - "[[Learning]]"
related:
  - "[[Active Recall]]"
down:
  - "[[Flashcard Practice]]"
opposes:
  - "[[Massed Practice]]"
---
```

## Status on efforts

Notes with `type: project` or `type: area` carry a `status:` field. One ordered vocabulary serves both: read left to right it gives the kanban columns, and it still answers "is this alive?". Tasks (TaskNotes) share the same words.

```yaml
status: active   # backlog | active | waiting | done | dropped
```

| Value | Meaning | Projects | Areas | Tasks (TaskNotes) | Open? |
|---|---|---|---|---|---|
| `backlog` | Committed, not started; for an area, not in focus now | yes | yes | yes | yes |
| `active` | Being worked now | yes | yes | yes | yes |
| `waiting` | Blocked on someone or something else | yes | | yes | yes |
| `done` | Finished | yes | | yes (completed) | no |
| `dropped` | Stopped, not finishing | yes | yes | yes (completed) | no |

- **Per type:** projects use `backlog | active | waiting | done | dropped`; a paused project goes back to `backlog`. Areas are ongoing responsibilities, so they use `active | backlog | dropped` only; an area you are not focusing on now goes to `backlog`.
- **Open and closed:** `backlog`, `active` and `waiting` are open; `done` and `dropped` are closed. AoR Review lists only `active` areas, and its `active_projects` counts projects that are `active` or `waiting`; the Efforts *Active* view reads `active` and `waiting`.
- **Single lowercase words.** Values with spaces break the TaskNotes status trigger and invite filter typos. Write `dropped`, never `cancelled`; `open`, `in progress` and `test` are retired.
- **Set it with the selector.** Project and area notes carry a status selector near the top of the body (a Meta Bind field bound to `status`) that offers only the values sanctioned for that type.

Status is the truth; the folder follows it. At the monthly review, projects, learning projects and Areas that are `done` or `dropped` move to a mirrored folder under `Archive/` (`Archive/Projects/`, `Archive/Learning/`, `Archive/Areas/`), always through Obsidian so links survive. Calendar, Atlas, fleeting and source notes never move there. `Archive/` is in Obsidian's Excluded files, so it leaves search, graph and quick switcher while links and the Archive views still work. There is no `#archived` tag: status already says it.

Projects also carry three optional date fields (see [Date properties](#date-properties)): **`date_start:`** when work began, **`date_due:`** the target date, and **`date_end:`** when the project actually closed. A plain `YYYY-MM-DD` is enough; add a time only when it matters. Fill what you know; the project template seeds `date_start` with today.

## Tasks

A task is a note with `type: task`, created and written by the TaskNotes plugin and filed as `Efforts/TaskNotes/Tasks/task - <title>.md`. TaskNotes writes these keys itself; do not add them to templates (its body template is body only, because TaskNotes merges template frontmatter into the task):

```yaml
type: task
title: Send revised drawings
status: backlog            # backlog | active | waiting | done | dropped
priority: normal           # none | low | normal | high
date_due: 2026-11-07
date_scheduled: 2026-11-04 # TaskNotes sets today on every new task
date_completed: 2026-11-07 # set when the task reaches done or dropped
up:                        # what the task belongs to, set by hand: its project,
  - "[[Project name]]"     # or an Area for a task outside any project
assignees:                 # people or AI agents, from Atlas/Entities
  - "[[Person name]]"
origin: "[[Note the task was captured in]]"
date_created: 2026-11-03T15:14:02.118+01:00
date_modified: 2026-11-03T15:15:40.530+01:00
```

- **`title:`** the task's clean title. The filename adds a prefix (`task - <title>.md`), so the clean title lives here.
- **`date_created:` and `date_modified:`** are filled and kept current by TaskNotes, as full ISO timestamps with seconds and time zone.
- **Area:** `up:` always points one level up (task to project, sub-project to project, top-level project to its Area); a task outside any project points `up:` straight at an Area. **`area:`** names the top-level Area (Work, Personal, Learning) directly, as a one-item list; *New task* copies it from the project you pick, and templates copy it from the parent. Bases read `area:` and fall back to walking `up:` for notes without it, so tasks made another way still group correctly. Lint flags an `area:` that disagrees with the `up:` chain. TaskNotes' `contexts` field says `personal` or `work`; *New task* asks for it.
- **`origin:`** the note the task was created in (a daily, meeting or work-session note), as a single link. Written by the *New task* command; tasks made another way have none. It records where the task came from; `up:` records what it belongs to.
- **`archived` tag:** archiving a task (a TaskNotes action, separate from `done`) adds the plugin's `archived` tag and moves the note to `Archive/Tasks/<year>/`. It is a plugin convention, not a vault tag namespace.

## People and organizations

People use the person template, which files them in `Atlas/Entities/People/`. Organizations have no template yet; use this pattern directly and file them in `Atlas/Entities/Organizations/`:

```yaml
---
type: person
date_created: 2026-01-15T09:30
summary: Who they are, in one line
up:
  - "[[Topic they matter to]]"
related:
  - "[[Their Organization]]"
skills:
  - "[[Python]]"
interests:
  - "[[Photography]]"
---
```

```yaml
---
type: organization
date_created: 2026-01-15T09:30
summary: What they are, in one line
up:
  - "[[Industry or Topic]]"
related:
  - "[[Person you know there]]"
---
```

Person notes may also carry **`skills:`** and **`interests:`**: lists of wikilinks to Topic notes (`Atlas/Topics/`) for professional competencies and hobbies. The targets are Topics, not new entities: `[[Python]]`, `[[Photography]]`. Dedicated fields (rather than `related:`) keep them queryable: a base or Dataview answers "who knows Python" with `skills.contains(link("Python"))`, and each Topic's backlinks list everyone who has it.

## AI provenance

A note the AI writes carries **`ai:`**, its review state, set with the selector on note, topic and framework notes:

- `pending`: the AI wrote it and nobody has looked yet (what the AI sets).
- `approved`: the AI wrote it and you approved it.
- `collaborative`: written together.
- `checked`: you wrote it and the AI checked it.

`ai:` is the one status-like field outside Efforts. When the AI adds a section inside a note you wrote, it puts `%% #AI-Assisted %%` above that section instead of setting the field. Vaults before 3.2.0 marked whole notes with that comment; the upgrade turns a comment on a note's first body line into `ai: pending` (`/Drafted` becomes `approved`, `/Collaborative` becomes `collaborative`, `/Reviewed` becomes `checked`).

## OKF alignment

This vault targets [Open Knowledge Format (OKF) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) conformance for the `Atlas/` bundle, natively on disk. Full details and the native-vs-export split live in [[okf-conformance]].

Frontmatter maps to OKF's canonical fields:

| OKF field | OKF status | In this vault |
|---|---|---|
| `type` | REQUIRED | `type` (already required on every note) |
| `title` | recommended | the filename; add an explicit `title:` only when the display name must differ |
| `description` | recommended | `summary:` (native); maps to OKF `description` |
| `resource` | recommended | `resource:` holds the canonical URI of the underlying asset (source URL, entity homepage). Replaces the old `url:` field |
| `tags` | optional | `tags` |
| `timestamp` | optional | authored as `date_created:` (creation); maps to OKF `timestamp` |

Compass keys (`up`, `related`, `down`, `opposes`), `topics`, and `status` are Munin extensions. OKF consumers preserve unknown keys, so they travel with the note unchanged.

Reserved filenames follow OKF: folder listings are `index.md` (§6), the Atlas changelog is `Atlas/log.md` (§7). Wikilinks stay native on disk; in an exported bundle they become bundle-relative `/path.md` links.

### Citations

When a note makes claims backed by external sources, list them under a `# Citations` heading at the foot of the body (OKF §8): a numbered list of absolute URLs or bundle-relative paths. Use this for source-backed notes instead of an ad-hoc Sources section.

## What the schema deliberately leaves out

- No tags beyond `#example`, which marks worked-example notes in the examples repo and never appears in the template itself. Classification is the `type:` field, never a tag.
- No status fields outside Efforts, except `ai:`.
- No mandatory fields beyond `type:`, `date_created:` and the `up:` rules in [[note-schema]]. Everything else, `summary:` included, earns its place by being useful.

## Field registry

Every frontmatter field the template uses. **Type** is the Obsidian property type set in `.obsidian/types.json`; **Written by** says who fills it. A field not in this table is not part of the schema: adding one follows the rule below.

| Field | Type | On | Meaning | Written by |
|---|---|---|---|---|
| `type` | text | every note | What kind of note it is ([[note-schema]] type table) | template |
| `date_created` | datetime | every note | When the note was made | template, TaskNotes |
| `date_modified` | datetime | every note | Last content change | AI on edit, TaskNotes |
| `summary` | text | every note outside `Calendar/` (recommended) | One line on what the note holds; OKF `description` | you, AI |
| `aliases` | aliases | person, project, any | Other names the note answers to | template, you |
| `cssclasses` | multitext | dashboards | Obsidian layout classes | shipped notes |
| `tags` | tags | none by default | Only `#example`, in the examples repo | you |
| `journal` | text | journal notes | Which Journals plugin journal owns the note (`daily` to `yearly`); the plugin finds its notes by it | Journals template |
| `date` | date | journal notes | First day of the period the note covers | Journals template |
| `date_start` | datetime | project, meeting, work session | When it started or starts | template |
| `date_end` | datetime | project | When it closed | you, AI at close |
| `date_due` | datetime | project, task | Deadline; on a waiting task, the chase date | you, TaskNotes |
| `date_scheduled` | datetime | task | Day you plan to work on it | TaskNotes |
| `date_completed` | date | task | Day it reached done or dropped | TaskNotes |
| `date_published` | date | source | When the source was published | you, AI at ingest |
| `birthday` | date | person | Birthday | you |
| `up` | multitext | every note except fleeting, journal, dashboard, sop | The broader thing above it ([[note-schema]] compass) | template prompt, you |
| `related` | multitext | any | Similar notes | you, AI |
| `down` | multitext | topic | What follows from it | you, AI |
| `opposes` | multitext | topic | What it is in tension with | you, AI |
| `topics` | multitext | note, source | Topic pages it is about | you, AI |
| `people` | multitext | any | Person notes involved | you |
| `skills` | multitext | person | Topic links for competencies | you |
| `interests` | multitext | person | Topic links for hobbies | you |
| `location` | text | person | Where they are based | you |
| `resource` | text | source, entity | Canonical URL of the thing; OKF `resource` | template prompt, AI |
| `author` | text | source | Who wrote or said it | you, AI at ingest |
| `status` | text | project, area, task | `backlog`, `active`, `waiting`, `done`, `dropped` | selector, TaskNotes |
| `area` | multitext | project, task, meeting, work session | The top-level Area (Work, Personal or Learning), one link in a list | copied from the parent at creation |
| `ai` | text | notes the AI wrote | Review state: `pending`, `approved`, `collaborative`, `checked` | AI sets, you change |
| `details` | multitext | meeting | Meeting minutes points | you, AI |
| `actions` | multitext | meeting | Actions agreed | you, AI |
| `version` | number | sop | SOP version | maintainer |
| `title` | text | task | Clean task title | TaskNotes |
| `priority` | text | task | Manual flag: `none`, `low`, `normal`, `high` | TaskNotes |
| `assignees` | multitext | task | People or AI agents doing it | TaskNotes |
| `contexts` | multitext | task | `personal` or `work` | New task, TaskNotes |
| `origin` | text | task | Note the task was captured in | New task |

TaskNotes also writes its own bookkeeping keys on task notes (recurrence, time tracking, `blockedBy`, `archived` tag); they belong to the plugin and are not listed here.

**Changing the schema.** A new field or a new `type:` value needs the user's sign-off, and the same change updates this registry, [[note-schema]] when the rule is core, and `.obsidian/types.json`. The AI proposes; it never adds a field on its own. The maintainer check `.github/scripts/check-templates.mjs` fails when a shipped template writes a field missing here or in `types.json`.
