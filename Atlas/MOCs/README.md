# Atlas/MOCs

Maps of Content: curated navigation pages that arrange links to notes the way a book's table of contents arranges chapters. Where Topics grow bottom-up from ingested notes, MOCs are top-down: you (the human) decide what the map covers and how it is ordered.

## What belongs here

- Curated link collections with your own structure and commentary.
- Frontmatter: `type: moc` and `created-date:`. Add `up:` only when the map nests inside a larger map; top-level maps have no `up:` (see [[note-schema]]).

## What does not belong here

- Auto-generated lists (use a Base or a Topic's backlinks instead).
- The subject page itself (that is a Topic; a MOC points at topics and notes).

The AI may **add** links to a MOC during ingest but should not restructure one without asking. MOCs are the most human-owned part of Atlas.

## Example

[[Learning MOC]] is a worked example, tagged `#example`: a topic, two notes in tension, and a project, arranged with editorial intent.

## Governing SOPs

[[new-note]] for creation, [[ingest]] for link additions.

## Index

<!-- The ingest SOP appends one line per note: - [[MOC Name]]: one-line summary -->
- [[Learning MOC]]: example map of the learning-to-learn cluster (`#example`, delete freely)
