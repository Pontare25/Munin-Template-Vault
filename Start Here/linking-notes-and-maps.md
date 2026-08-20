# Guide: Linking Notes and Maps

In this vault, links do the organizing, not folders. A note's folder is just where the file sits; what a note *means* and what it *connects to* live in its links. There are four ways to connect notes, and they are not interchangeable. This guide is the decision rule for which to use when, plus when a subject has grown enough to deserve its own map.

If you are brand new to Obsidian links (wikilinks, backlinks, aliases), read [[obsidian-basics]] first; this guide is about *which* link to reach for, not the mechanics of typing one.

## The four mechanisms

**1. Inline wikilink** `[[Like this]]`, written in the body while you type.
This is the default and should be the majority of links in your vault. Whenever you mention or lean on another note's idea in a sentence, link it right there. It serves the reading experience: someone (including future you) reading this note can jump straight to what it references.

**2. The idea compass** (`up:` / `related:` / `down:` / `opposes:` in frontmatter).
Four link fields that place a note among *other single ideas*: where it comes from (`up`), what reinforces it (`related`), what follows from it (`down`), and what pushes against it (`opposes`). Use these to declare a note's *argumentative position*, not for casual mentions. They belong on atomic `note` and `topic` pages. See [[note-schema]] for the full compass.

**3. The `topics:` field** (frontmatter list of links to `Atlas/Topics/` pages).
This replaces category tags. Every note should carry at least one `topics:` link so it is discoverable from its Topic hub. `topics:` answers "what broad subject is this about," which is classification, not argument.

**4. Maps of Content (MOCs)** (`type: moc` notes in `Atlas/MOCs/`).
A curated, opinionated arrangement of notes for a purpose or question. A MOC is not a folder and not a complete index: it is a hand-picked map that says "here is how I see these notes fitting together." You do not need one for every subject, and you do not build one until a subject earns it (see below).

## Which mechanism, when

| Mechanism | What it answers | When to use | When *not* to use |
|---|---|---|---|
| Inline wikilink | "This sentence references that note" | Any time you mention another idea in prose. The default. | Never off-limits; this is always fine |
| Compass (`up`/`related`/`down`/`opposes`) | "What is this idea's position relative to other ideas?" | On atomic `note`/`topic` pages, to place it in a lineage of broader, similar, derived, or opposing ideas | Casual mentions; entity notes with no real "argument position" |
| `topics:` | "What subject does this belong to?" | Every note, at least one, for discoverability via its Topic hub | Argument structure (that is the compass's job) |
| MOC | "Here is a curated map of notes for a purpose" | Only once scattered notes on a live concern start to overwhelm you | Speculatively, just because a subject exists |

Two things to keep straight:

- **Compass and `topics:` are not redundant with inline links.** The same note can appear in the body prose *and* in a compass field. The inline link is for reading; the compass link is structural metadata a query can use. Both are cheap because they usually point at the same few notes.
- **`topics:` is not the same as a MOC.** `topics:` is a note declaring its own subject (cheap, one-directional, bottom-up). A MOC is you actively deciding what belongs together for a purpose (curated, has upkeep cost). A note can be correctly filed under `topics: [[Habits]]` and never appear in any MOC.

## When to make a MOC

The signal is not a note count. Do not make a map "after five notes on a topic." The real trigger is what Nick Milo calls the **Mental Squeeze Point**: the moment your scattered notes on a subject start to produce a feeling of *overwhelm*, when you catch yourself re-deriving the same list of related notes from memory, or losing track of what you already have. That friction is the signal. Not before.

Until then, a `topic` page (with its own compass) is a perfectly good hub for a subject. Promote to an actual `moc` note only when a single hub page can no longer hold the material, or when a cross-cutting project needs its own view spanning several topics.

Two rules once you do make one:

- **A note can live in several MOCs at once.** That is a feature, not clutter: the same note gives different context in each map. Do not try to give a note one "home" map; that is folder thinking.
- **Connect each MOC up to a home map.** Point a new MOC's `up:` at a broader MOC or your top-level map, so it is reachable by breadcrumb and does not become an orphan island.

## Two habits worth keeping

- **Make at least one real link when you create a note**, not "later, during cleanup." Forcing one genuine connection at creation is the small friction that keeps the vault connected. If you genuinely cannot find anything to link, the idea may not be ready to promote yet.
- **Fill the compass while you write, not after.** Hunting for what an idea relates to, follows from, or opposes is itself the thinking step. It is not a metadata chore to do once the note is "done."

## See also

- [[note-schema]] — the compass fields, `topics:`, and every frontmatter rule.
- [[obsidian-basics]] — wikilinks, backlinks, aliases, the mechanics of linking.
- [[working-with-ai]] — asking the AI to propose links and compass entries for you.
