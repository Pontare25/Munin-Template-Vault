# Vault-Map

The navigation manual: what goes where, and how to file things. Read together with [[note-schema]], which defines what goes inside each note.

## The three layers

| Layer | Folder | Role | Who maintains it |
|---|---|---|---|
| Capture | `Raw/` | Inbox for sources and fleeting ideas, in transit | Human captures, AI processes |
| Knowledge | `Atlas/` | Permanent notes, compounding over time | AI maintains, human corrects |
| Schema | `AI-OS/` | How the system works | Co-evolved, human approves changes |

`Calendar/` (time-bound notes) and `Efforts/` (projects and areas) orbit these three.

Knowledge flows one way: captured in `Raw/` or a daily note, processed by [[ingest]] or [[daily-review]], compounded in `Atlas/`. Nothing valuable should live permanently in `Raw/`.

## Filing rules

Ask these questions in order:

1. **Is it a date-bound record** (something that happened, was said, was thought on a day)? Then `Calendar/`: daily note, weekly note, or meeting note.
2. **Is it something to do** (a goal, a plan, a responsibility)? Then `Efforts/`: `Projects/` if it ends, `Areas/` if it does not, `Learning/` if it is a study subject.
3. **Is it unprocessed outside material or a fleeting idea?** Then `Raw/`: `Sources/` for external material, `Ideas/` for your own sparks, `Inbox/` when unsure.
4. **Is it distilled knowledge?** Then `Atlas/`: one idea is a `note`, a subject hub is a `topic`, a curated overview is a `moc`, a person or organization is an entity, a named method is a `framework`.
5. **Is it about how the vault works?** Then `AI-OS/`.
6. **Is it a template or attachment?** Then `System/`.

When two destinations seem right, prefer the one the note's `type:` implies (see the table in [[note-schema]]), and say what you chose and why.

## Template selection

Templates live in `System/Templates/`. Pick by destination:

| Creating | Template | Lands in |
|---|---|---|
| Daily note | `daily` | `Calendar/Daily Notes/` |
| Weekly note | `weekly` | `Calendar/Weekly Notes/` |
| Meeting note | `meeting` | `Calendar/Meetings/` |
| Atomic note | `atomic-note` | `Atlas/Notes/` |
| Topic page | `topic` | `Atlas/Topics/` |
| Map of Content | `moc` | `Atlas/MOCs/` |
| Source capture | `source-capture` | `Raw/Sources/` |
| Project | `project` | `Efforts/Projects/` |

People and organizations have no template; use the frontmatter pattern in [[note-schema]].

## Folder indexes

Every top folder (and each Atlas subfolder) has a `README.md` stating its purpose and holding an index: one line per note, appended by the SOPs. When looking for something, read the relevant README index first; fall back to search only when the index does not answer.

## Dashboards (Bases)

Three Obsidian Bases ship embedded in folder READMEs:

| Base | Lives in | Shows |
|---|---|---|
| Efforts dashboard | `Efforts/README.md` | All efforts grouped by `status` |
| Topics index | `Atlas/Topics/README.md` | All topic pages |
| Inbox view | `Raw/README.md` | Unprocessed captures |

Bases read frontmatter fields, which is one more reason the schema matters: notes with correct `type:` and `status:` fields appear in the right dashboards automatically.

## The operations loop

- **Capture** (human): dump into today's daily note or `Raw/Inbox/`. No filing decisions at capture time.
- **Ingest** (AI, [[ingest]]): process a capture into Atlas.
- **Review** (both, [[daily-review]]): sweep the daily note and inbox.
- **Query** (human asks, AI searches Atlas and synthesizes; good answers get filed back).
- **Lint** (AI, [[lint]]): periodic health check of the knowledge graph.
