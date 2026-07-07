# SOP: Ingest

Turn a capture in `Raw/` into compounding knowledge in `Atlas/`. This is the core operation of the wiki. One source should typically touch several notes: that is the point.

**Trigger:** the human says "ingest this", "process this", points at a file in `Raw/`, or [[daily-review]] hands over a capture.

## Steps

1. **Read the capture in full.** If it is a bare URL, fetch the content first if your tool can; otherwise ask the human to paste it. If the content was pasted straight into chat and no file exists in `Raw/` yet, create a source note in `Raw/Sources/` first (source-capture pattern), so the capture has a home before processing starts.
2. **Extract candidates.** List what the source contains: ideas worth keeping (future atomic notes), people and organizations, named frameworks, and which subjects it touches (future `topics:` assignments).
3. **Check what already exists.** For every candidate, search `Atlas/` (start with the folder `index.md` listings) before creating anything. **Update beats duplicate:** if a note on the idea exists, add to it and note the new source; do not create a parallel note.
4. **Create or update atomic notes** in `Atlas/Notes/`, one idea per note, following [[note-schema]] minimums (`type: note`, `up:`, `created-date:`) plus a one-line `description:`. Start each AI-written note with `%% #AI-Assisted %%`.
5. **Create or update entity pages** in `Atlas/Entities/` for people and organizations that matter to the human. For cited authors and researchers whose work the source leans on, create a stub entity page (one line plus the [[note-schema]] entity pattern) rather than skipping them: stubs grow the same way topic stubs do. Skip only names that are true passing mentions.
6. **Assign `topics:`.** For each topic that does not exist yet, create a stub in `Atlas/Topics/`: one-line definition plus an empty compass skeleton (`up:`, `related:`, `down:`, `challenges:`).
7. **Fill compass keys where you can.** On new notes, at least `up:`. On touched topics, add obvious compass entries; leave uncertain directions empty rather than guessing.
8. **Enrich the capture itself.** Add a short summary and links to the notes you created to the source note in `Raw/Sources/`, so the source records where its content went. Move it from `Inbox/` to `Sources/` if needed.
9. **Update indexes and maps.** Append one line per new note to the `index.md` of the folder it landed in. If the new notes or topics belong to an existing MOC in `Atlas/MOCs/`, add links to that map too (add only; do not restructure a MOC without asking).
10. **Log it.** Append an entry to [[AI-OS/log|log]] (`## [YYYY-MM-DD] ingest | Source title`, with bullets for notes created or updated). Also append `**Creation**`/`**Update**` lines to [[Atlas/log]] for the Atlas concepts you created or changed (OKF §7 bundle changelog).
11. **Report.** Tell the human what was created, what was updated, and anything you chose not to extract and why.

## Judgment calls

- Fewer, better notes beat exhaustive extraction. If in doubt whether an idea earns a note, ask or leave it in the source summary.
- Contradictions with existing notes are findings, not errors: link both notes via `challenges:` and flag the tension to the human.
