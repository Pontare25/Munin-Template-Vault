---
type: sop
version: 3
summary: Turn one capture in Raw into atomic notes, entity pages and topic links in Atlas
---

# SOP: Ingest

Turn a capture in `Raw/` into compounding knowledge in `Atlas/`. This is the core operation of the wiki. One source should typically touch several notes: that is the point.

**Trigger:** the human says "ingest this", "process this", points at a file in `Raw/`, or [[daily-review]] hands over a capture.

## Steps

1. **Read the capture in full.** A bare URL: fetch it if your tool can, otherwise ask the human to paste it. Content pasted into chat with no file in `Raw/`: create a source note in `Raw/Sources/` first, so the capture has a home. A PDF or other binary: follow "PDFs and other binaries" in [[note-schema-reference]]; the extracted text is what you ingest.
2. **Extract candidates.** List what the source contains: ideas worth keeping (future atomic notes), people and organizations, named frameworks, and which subjects it touches (future `topics:` assignments).
3. **Check what already exists.** For every candidate, search `Atlas/` before creating anything: folder `index.md` listings, `aliases:`, the topic's backlinks, and two synonyms of the idea. **Update beats duplicate:** if a note says the same thing, add to it and cite the new source. If two notes already say it, hand them to [[merge-notes]].
4. **Create or update atomic notes** in `Atlas/Notes/`, one idea per note, following [[note-schema]] minimums (`type: note`, `up:`, `date_created:`) plus a one-line `summary:`. Set `ai: pending` on notes you write; inside a note the user wrote, put `%% #AI-Assisted %%` above your section. End each note with a `# Citations` list that links the source note. A claim that conflicts with an existing note goes under `## Tensions`, each claim with its source (see [[note-schema-reference]]).
5. **Create or update entity pages** in `Atlas/Entities/` for people and organizations that matter to the human. For cited authors and researchers whose work the source leans on, create a stub entity page (one line plus the [[note-schema-reference]] entity pattern) rather than skipping them: stubs grow the same way topic stubs do. Skip only names that are true passing mentions.
6. **Assign `topics:`.** For each topic that does not exist yet, create a stub in `Atlas/Topics/`: one-line definition plus an empty compass skeleton (`up:`, `related:`, `down:`, `opposes:`).
7. **Fill compass keys where you can.** On new notes, at least `up:`. On touched topics, add obvious compass entries; leave uncertain directions empty rather than guessing.
8. **Enrich the capture itself.** Add a short summary and links to the notes you created to the source note, so the source records where its content went. Move it from `Inbox/` to `Sources/` if needed, through Obsidian only.
9. **Update indexes and maps.** Append one line per new note to the `index.md` of the folder it landed in. If the new notes or topics belong to an existing MOC in `Atlas/MOCs/`, add links to that map too (add only; do not restructure a MOC without asking).
10. **Log it.** Append an entry to [[AI-OS/log|log]] (`## [YYYY-MM-DD] ingest | Source title`, with bullets for notes created or updated). Also append `**Creation**`/`**Update**` lines to [[Atlas/log]] for the Atlas concepts you created or changed (OKF §7 bundle changelog).
11. **Report.** Tell the human what was created, what was updated, and anything you chose not to extract and why.

## Output

A report of the notes created and updated, the enriched source note, and the step 10 entries in [[AI-OS/log|log]] and [[Atlas/log]].

## Judgment calls

- Fewer, better notes beat exhaustive extraction. If in doubt whether an idea earns a note, ask or leave it in the source summary.
- Contradictions are findings, not errors: record them under `## Tensions`, link both notes via `opposes:` and flag the tension to the human.

## Manual checklist (without an AI)

1. Read the source in `Raw/Sources/` and list its ideas, people and subjects.
2. Search `Atlas/` (titles, aliases, synonyms) before creating anything: update an existing note rather than duplicating it.
3. Write one atomic note per idea in `Atlas/Notes/` with `up:` and `topics:`; create a stub topic page when one is missing.
4. Add a summary and links to the source note, a `# Citations` list on each new note, and one line per new note to the folder `index.md`.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
