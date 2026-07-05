# Note Schema

The rules every note in this vault follows. Rule of thumb: **links for things, tags for kinds (optional), fields for structure.**

## Required on every note

```yaml
---
type: note
created-date: 2026-01-15
---
```

- **`type:`** identifies what kind of note this is. It is the single required attribute (OKF-compatible) and the field is the source of truth. Flat vocabulary, nothing else:

  | Value | Lives in | Meaning |
  |---|---|---|
  | `note` | `Atlas/Notes/` | Atomic note, one idea |
  | `topic` | `Atlas/Topics/` | Topic hub with full compass |
  | `moc` | `Atlas/MOCs/` | Curated map of content |
  | `source` | `Raw/Sources/` | Captured external material |
  | `person` | `Atlas/Entities/` | A person |
  | `organization` | `Atlas/Entities/` | An organization |
  | `framework` | `Atlas/Frameworks/` | Named method or model |
  | `project` | `Efforts/Projects/` | Effort with an end |
  | `area` | `Efforts/Areas/` | Ongoing responsibility |
  | `daily` | `Calendar/Daily Notes/` | Daily note |
  | `weekly` | `Calendar/Weekly Notes/` | Weekly note |
  | `meeting` | `Calendar/Meetings/` | Meeting note |

- **`created-date:`** in `YYYY-MM-DD` format. Templates fill it automatically.

Optionally, a note may mirror its type as a tag (`#type/note`) for tag-pane browsing. The field stays canonical: if tag and field ever disagree, the field wins and the tag should be fixed. If you do not care about the tag pane, skip the mirror entirely.

## Topics

- **`topics:`** is a list of wikilinks to Topic pages in `Atlas/Topics/`:

  ```yaml
  topics:
    - "[[Spaced Repetition]]"
    - "[[Learning]]"
  ```

- Topics replace category tags completely. There is no `#on/...` namespace, no keyword tags. If a note is "about" something, that something is a Topic page and the note links to it.
- **First reference rule:** when an ingest assigns a topic that does not exist yet, the AI creates a stub Topic page (one-line definition plus an empty compass skeleton) in `Atlas/Topics/` and links to it. Stubs grow into real pages as more notes reference them.

## The idea compass

Four frontmatter keys place a note in the landscape of ideas, like compass directions:

| Key | Direction | Ask yourself |
|---|---|---|
| `up:` | North | Where does this come from? What broader theme or principle sits above it? |
| `related:` | West | What is similar? What reinforces or parallels this? |
| `down:` | South | What follows from this? Where could it lead or apply? |
| `challenges:` | East | What competes with this? What tension or opposite does it face? |

All four take lists of wikilinks. How much compass a note needs depends on its type:

| Type | Required | Encouraged |
|---|---|---|
| `topic` | All four compass keys | |
| `note` | `up:` + `created-date:` | `topics:`, `related:`, `down:`, `challenges:` |
| `source` | `up:` + `topics:` | `related:` |
| `moc` | `created-date:` | `up:` when the map sits inside a larger map (top-level maps have no up) |
| everything else | `up:` + `created-date:` | whatever earns its place |

A complete topic frontmatter looks like this:

```yaml
---
type: topic
created-date: 2026-01-15
up:
  - "[[Learning]]"
related:
  - "[[Active Recall]]"
down:
  - "[[Flashcard Practice]]"
challenges:
  - "[[Massed Practice]]"
---
```

## Status on efforts

Notes with `type: project` or `type: area` carry a `status:` field:

```yaml
status: active   # active | simmering | done | dropped
```

Efforts change status, not folder. `done` and `dropped` notes stay where they are as the record of what happened.

## People and organizations

Entities have no template; use this pattern directly:

```yaml
---
type: person
created-date: 2026-01-15
up:
  - "[[Topic they matter to]]"
related:
  - "[[Their Organization]]"
---
```

```yaml
---
type: organization
created-date: 2026-01-15
up:
  - "[[Industry or Topic]]"
related:
  - "[[Person you know there]]"
---
```

## AI provenance

When the AI writes a note or a section, it marks the top of what it wrote with an Obsidian comment, invisible in reading mode:

```markdown
%% #AI-Assisted %%
```

Optional refinement if you want more nuance: `%% #AI-Assisted/Drafted %%` (AI wrote, human approved), `%% #AI-Assisted/Collaborative %%` (written together), `%% #AI-Assisted/Reviewed %%` (human wrote, AI checked). The plain marker is enough for most vaults.

## What this schema deliberately leaves out

- No tag namespaces beyond the optional `#type/` mirror. The `#example` tag exists only on the deletable worked-example notes.
- No status fields outside Efforts.
- No mandatory fields beyond `type:` and `created-date:`. Everything else earns its place by being useful.
