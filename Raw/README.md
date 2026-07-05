# Raw

The capture inbox. Material lands here on its way into the vault: articles, videos, quotes, half-formed ideas. Raw is **in transit, not an archive**: the [[ingest]] SOP reads each capture, extracts what matters into `Atlas/`, enriches the capture with links, and marks it processed. Knowledge compounds in Atlas, never in Raw.

## Subfolders

| Folder | Holds |
|---|---|
| `Inbox/` | Anything unsorted; the default landing zone |
| `Sources/` | Captured external material: articles, videos, papers (`type: source`) |
| `Ideas/` | Your own fleeting ideas awaiting processing |

## What belongs here

- Unprocessed and recently processed captures.
- Source notes with minimum frontmatter: `type: source`, `up:`, `topics:`.

## What does not belong here

- Distilled ideas (those become atomic notes in `Atlas/Notes/` during ingest).
- Anything you expect to find again in six months: if it matters, ingest it.

## Example

[[How spaced repetition works]] is a worked example of a **processed** source, tagged `#example`: capture at the top, links to the extracted Atlas notes below.

## Inbox view

![[Inbox.base]]

## Governing SOPs

[[ingest]] processes captures. [[daily-review]] sweeps `Inbox/`.

## Index

<!-- The ingest SOP appends one line per processed source: - [[Source Name]]: one-line summary -->
- [[How spaced repetition works]]: example article on review intervals and the forgetting curve (`#example`, delete freely)
