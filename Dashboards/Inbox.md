---
type: dashboard
created-date: 2026-09-05
summary: Capture dashboard — everything captured but not yet processed, across both capture lanes.
cssclasses:
  - callouts-outlined
---
# Inbox

Everything you have captured but not yet processed, in one place. Two lanes feed it, and each empties a different way: your own notes leave `Fleeting/` by being promoted to a real type, and material you want analyzed leaves `Raw/Inbox/` by being ingested into `Atlas/`.

Nothing here is filed by hand. A note disappearing from this dashboard is the signal that it found a home.

> [!info]- How this works
> Both tables read folder membership, not a status field: a note is unprocessed for exactly as long as it sits in its capture folder. Oldest captures sort to the top, so anything you have been avoiding surfaces first.
>
> **Days alive** and **Days waiting** count from the `created-date` stamped into the note when it was captured, so the number survives sync, backup, and a fresh clone. Files with no frontmatter to stamp — a dropped PDF, a slide deck, an image — fall back to the file's own creation time.

## Fleeting — your own capture

Quick notes you wrote without deciding where they belong. Promote the keepers to their real type; delete the rest without guilt. The **Stale** view is the nagging half: anything over a week old is either worth promoting or worth losing.

![[Fleeting.base]]

## Raw Inbox — awaiting analysis

Originals you want the AI to read, in whatever form they arrived: a PDF, a slide deck, a saved web page, a clipping, or your own long-form writing worth keeping verbatim. Dump the file, keep moving. These are never rewritten. Ingest extracts what matters into `Atlas/` and moves the original to `Raw/Sources/`, which is what takes it off this list.

![[Inbox.base]]
