# Note Schema

The rules every note in this vault follows. Rule of thumb: **links for things, fields for kinds and structure.**

## Required on every note

```yaml
---
type: note
date_created: 2026-01-15T09:30
---
```

- **`type:`** identifies what kind of note this is. It is the single required attribute (OKF-compatible) and the field is the source of truth. Flat vocabulary, nothing else:

  | Value | Lives in | Meaning |
  |---|---|---|
  | `fleeting` | `Fleeting/` | Quick capture in transit, not yet filed. Promoted to another type or deleted |
  | `note` | `Atlas/Notes/` | Atomic note, one idea |
  | `topic` | `Atlas/Topics/` | Topic hub with full compass |
  | `moc` | `Atlas/MOCs/` | Curated map of content |
  | `source` | `Raw/Sources/` | Captured external material |
  | `person` | `Atlas/Entities/People/` | A person |
  | `organization` | `Atlas/Entities/Organizations/` | An organization |
  | `framework` | `Atlas/Frameworks/` | Named method or model |
  | `project` | `Efforts/Projects/` | Effort with an end |
  | `area` | `Efforts/Areas/` | Ongoing responsibility |
  | `daily` | `Calendar/Daily Notes/` | Daily note |
  | `weekly` | `Calendar/Weekly Notes/` | Weekly note |
  | `monthly` | `Calendar/Monthly Notes/` | Monthly note |
  | `quarterly` | `Calendar/Quarterly Notes/` | Quarterly note |
  | `yearly` | `Calendar/Yearly Notes/` | Yearly note |
  | `meeting` | `Calendar/Meetings/` | Meeting note |
  | `work-session` | `Calendar/Work Sessions/` | Focused work block on a project |
  | `dashboard` | `Dashboards/` | Read-only overview surface that queries other notes; owns no content of its own |

- **`date_created:`** in ISO `YYYY-MM-DDTHH:mm` datetime format. Templates fill it automatically.
- **`date:`** on journal notes (daily through yearly) marks the period the note covers, as a `YYYY-MM-DD` date (the period's first day). **Meeting and work-session notes carry `date_start:` instead**, a full ISO `YYYY-MM-DDTHH:mm` datetime (their templates prompt for it), and the filename is prefixed with the date. A daily note's meeting rollup matches a meeting's `date_start` day against the daily note's own `date` (`dateformat(date_start, "yyyy-MM-dd") = dateformat(this.date, "yyyy-MM-dd")`); the Calendar base's period rollups do the same through a per-type anchor formula. See [Date properties](#date-properties).

Classification is the `type:` field alone. Notes do not mirror their type as a tag; the only tag in use is `#example`, which marks worked-example notes so they are easy to find and delete.

Strongly recommended on knowledge notes (everything outside `Calendar/`):

- **`summary:`** one line stating what the note holds. Indexes, Bases, and retrieval use it to pick the right note without opening it, which matters more the larger the vault grows. This is the vault-native field; it maps to OKF's recommended `description` field. Templates include it empty; fill it as soon as the note's point is clear.

## Date properties

Every date in frontmatter follows one naming rule, so date fields are predictable, sit together in the properties panel, and never leave a query guessing between near-synonyms:

- A journal note's own anchor date is a bare **`date`** (daily, weekly, monthly, quarterly, yearly). The Journals plugin and the Calendar rollups read it.
- Every other date property is **`date_<what>`**, in snake_case. Snake_case names work unbracketed in Bases, Dataview, and scripts (`note.date_due`); a hyphenated name would be read as subtraction.
- **One exception: `birthday`** on person notes keeps its everyday name.

| Property | Type | Used on | Meaning |
|---|---|---|---|
| `date` | date | daily, weekly, monthly, quarterly, yearly | First day of the period the note covers |
| `date_created` | datetime | every note | When the note was created. Templates fill it |
| `date_modified` | datetime | every note made from a template | When the note's content last changed. Templates leave it empty; whoever edits the note (an AI edit, or you) fills it |
| `date_start` | datetime | meetings, work sessions, projects | When it starts or started. Meeting and session templates prompt for it; the project template seeds today's date |
| `date_end` | datetime | meetings, work sessions, projects | When it ended. Add it by hand when an event runs longer; fill it when a project closes |
| `date_due` | datetime | projects | Target date |
| `birthday` | date | person | The documented exception to the naming rule |

Property types are vault-wide (`.obsidian/types.json`), one type per property. The rule is datetime wherever a time may matter. A date-only value such as `2026-01-15` is still valid in a datetime property, so projects can keep writing plain dates.

## Topics

- **`topics:`** is a list of wikilinks to Topic pages in `Atlas/Topics/`:

  ```yaml
  topics:
    - "[[Spaced Repetition]]"
    - "[[Learning]]"
  ```

- Topics replace category tags completely. There is no `#on/...` namespace, no keyword tags. If a note is "about" something, that something is a Topic page and the note links to it.
- **First reference rule:** when an ingest assigns a topic that does not exist yet, the AI creates a stub Topic page (one-line definition plus an empty compass skeleton) in `Atlas/Topics/` and links to it. Stubs grow into real pages as more notes reference them.

## People on notes

- **`people:`** is a list of wikilinks to person notes (`Atlas/Entities/People/`) tied to this note: meeting participants, project members, anyone involved in the effort or event.

  ```yaml
  people:
    - "[[Anna Berg]]"
  ```

- One field across every type. Meetings, projects, and anything else use `people:` rather than per-type fields; it replaces the earlier `attendees:` (meetings) and `members:` (projects). The `Meetings.base` "People meetings" view keys off it to surface every meeting a person was in.

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

Notes with `type: project` or `type: area` carry a `status:` field:

```yaml
status: active   # active | simmering | done | dropped
```

Efforts change status, not folder. `done` and `dropped` notes stay where they are as the record of what happened.

Projects also carry three optional date fields (see [Date properties](#date-properties)): **`date_start:`** when work began, **`date_due:`** the target date, and **`date_end:`** when the project actually closed. A plain `YYYY-MM-DD` is enough; add a time only when it matters. Fill what you know; the project template seeds `date_start` with today.

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
  - "[[Golf]]"
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

Person notes may also carry **`skills:`** and **`interests:`** — lists of wikilinks to Topic notes (`Atlas/Topics/`) for professional competencies and hobbies. The targets are Topics, not new entities: `[[Python]]`, `[[Golf]]`. Dedicated fields (rather than `related:`) keep them queryable — a base or Dataview answers "who knows Python" with `skills.contains(link("Python"))`, and each Topic's backlinks list everyone who has it.

## AI provenance

When the AI writes a note or a section, it marks the top of what it wrote with an Obsidian comment, invisible in reading mode:

```markdown
%% #AI-Assisted %%
```

Optional refinement if you want more nuance: `%% #AI-Assisted/Drafted %%` (AI wrote, human approved), `%% #AI-Assisted/Collaborative %%` (written together), `%% #AI-Assisted/Reviewed %%` (human wrote, AI checked). The plain marker is enough for most vaults.

## OKF alignment

This vault targets [Open Knowledge Format (OKF) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) conformance for the `Atlas/` bundle, natively on disk. Full details and the native-vs-export split live in [[okf-conformance]].

Frontmatter maps to OKF's canonical fields:

| OKF field | OKF status | In this vault |
|---|---|---|
| `type` | REQUIRED | `type` (already required on every note) |
| `title` | recommended | the filename; add an explicit `title:` only when the display name must differ |
| `description` | recommended | `summary:` (native); maps to OKF `description` |
| `resource` | recommended | `resource:` — canonical URI of the underlying asset (source URL, entity homepage). Replaces the old `url:` field |
| `tags` | optional | `tags` |
| `timestamp` | optional | authored as `date_created:` (creation); maps to OKF `timestamp` |

Compass keys (`up`, `related`, `down`, `opposes`), `topics`, and `status` are Munin extensions. OKF consumers preserve unknown keys, so they travel with the note unchanged.

Reserved filenames follow OKF: folder listings are `index.md` (§6), the Atlas changelog is `Atlas/log.md` (§7). Wikilinks stay native on disk; in an exported bundle they become bundle-relative `/path.md` links.

### Citations

When a note makes claims backed by external sources, list them under a `# Citations` heading at the foot of the body (OKF §8): a numbered list of absolute URLs or bundle-relative paths. Use this for source-backed notes instead of an ad-hoc Sources section.

## What this schema deliberately leaves out

- No tags beyond `#example`, which exists only on deletable worked-example notes. Classification is the `type:` field, never a tag.
- No status fields outside Efforts.
- No mandatory fields beyond `type:` and `date_created:`. Everything else, `summary:` included, earns its place by being useful.
