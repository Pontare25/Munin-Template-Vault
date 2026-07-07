# Atlas

The permanent knowledge layer. Everything in Atlas is meant to last and to compound: new sources update existing notes instead of piling up next to them. The AI maintains this layer through the [[ingest]] SOP; you read, query, and correct it.

## Subfolders

| Folder | Holds | Index |
|---|---|---|
| `Notes/` | Atomic notes, one idea each | [Notes/README](Notes/README.md) |
| `Topics/` | Topic pages with a full idea compass | [Topics/README](Topics/README.md) |
| `MOCs/` | Maps of Content, curated by you | [MOCs/README](MOCs/README.md) |
| `Entities/` | People and organizations | [Entities/README](Entities/README.md) |
| `Frameworks/` | Named methods, models, and frameworks | [Frameworks/README](Frameworks/README.md) |

## What belongs here

- Distilled knowledge: ideas, concepts, topics, entities, frameworks.
- Notes promoted from `Raw/` after processing.
- Synthesis the AI produced that you want to keep (file good answers, do not let them die in chat history).

## What does not belong here

- Unprocessed captures (those live in `Raw/` until ingested).
- Time-bound notes like daily notes or meeting notes (those live in `Calendar/`).
- Project plans and task lists (those live in `Efforts/`).

## Governing SOPs

[[ingest]] creates and updates notes here. [[new-note]] covers manual creation. [[lint]] keeps the layer healthy.

## Index

Subfolder indexes track individual notes; this index tracks only notes placed directly in the Atlas root (normally none).

<!-- The ingest SOP appends one line per note: - [[Note Name]]: one-line summary -->
