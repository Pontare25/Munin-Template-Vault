# Atlas/Entities

Pages for people and organizations. When a source mentions a person or organization that matters to you, the ingest SOP creates or updates their page here, so context accumulates: who they are, how you know them, what they have said or done across every source that mentions them.

## What belongs here

- One page per person (`type: person`) or organization (`type: organization`).
- Relationship links: people link to their organizations via `related:`, organizations link upward to industries or topics via `up:`.

## What does not belong here

- Ideas a person had (atomic note in `Atlas/Notes/`, linked to the person).
- Meeting notes with a person (those live in `Calendar/Meetings/` and link here).

There is no template for entities; the frontmatter pattern is documented in [[note-schema]].

## Example

Entity pages appear as you ingest sources that mention people or organizations.

## Governing SOPs

[[ingest]] creates and updates entity pages. Schema details in [[note-schema]].

## Index

<!-- The ingest SOP appends one line per note: - [[Entity Name]]: one-line summary -->
