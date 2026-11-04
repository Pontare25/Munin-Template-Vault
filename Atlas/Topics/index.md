# Atlas/Topics

Topic pages: one page per subject you think about. Topics are the hubs of the wiki. Every note declares which topics it belongs to via the `topics:` frontmatter field, so a Topic page plus its backlinks gives you everything the vault knows about a subject.

Topics carry the **full idea compass** in frontmatter:

- `up:` origins, upstream themes, underlying principles
- `related:` similar concepts, parallels, reinforcing ideas
- `down:` downstream consequences, applications, implications
- `opposes:` competing ideas, opposites, tensions

## What belongs here

- One page per subject, named as a noun phrase (for example `Spaced Repetition`, not `thoughts on remembering things`).
- Stub topics the AI created during ingest: a one-line definition plus a compass skeleton, waiting to grow.
- Frontmatter: `type: topic`, all four compass keys, `date_created:`.

## What does not belong here

- Individual ideas about a topic (those are atomic notes in `Atlas/Notes/` that link back via `topics:`).
- Curated reading paths across many topics (that is a MOC).

## Topics index

![[Topics.base]]

## Governing SOPs

[[ingest]] creates topic stubs on first reference. Schema details in [[note-schema]].

## Index

<!-- The ingest SOP appends one line per note: - [[Topic Name]]: one-line summary -->
