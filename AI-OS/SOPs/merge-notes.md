---
type: sop
version: 1
summary: Merge two or more notes that say the same thing into one survivor, keeping links and citations intact
---

# SOP: Merge notes

Two notes that say the same thing split your links and hide what you know. This procedure folds them into one without breaking a link. It never runs without your approval.

**Trigger:** the human says "merge these notes", "these are duplicates", or [[ingest]] or [[lint]] finds two notes on one idea.

## Steps

1. **Read every candidate in full** and list what each holds that the others lack. Check backlinks and `index.md` lines for each.
2. **Propose the survivor.** Prefer the older note or the one with more inbound links. Ask the human to confirm, and show the plan: what moves in, what the loser leaves behind, and how many links change. Wait for approval before step 3.
3. **Merge the content into the survivor.** Move in the loser's unique text, marked `%% #AI-Assisted %%` if the survivor is a human note. Keep both notes' `# Citations`, renumbered and without repeats. Add the loser's title to the survivor's `aliases:`. Where the notes disagree, record it under `## Tensions` (see [[note-schema-reference]]). Set `date_modified`.
4. **Repoint the links through Obsidian, never the file system.** Obsidian rewrites links on rename. Use the core Note Composer command "Merge current file with another file" if it is enabled; otherwise rename the loser through Obsidian and fix the remaining links by hand. Check that no wikilink still points at the loser.
5. **Retire the loser.** Delete it through Obsidian so it goes to Obsidian's trash, never a hard delete.
6. **Update the folder `index.md`:** remove the loser's line and refresh the survivor's summary if it changed.
7. **Log it.** Append a `**Removal**` line for the loser (naming the survivor) and an `**Update**` line for the survivor under today's date in [[Atlas/log]]. Add a `merge` entry to [[AI-OS/log|log]].

## Output

One merged note, no broken links, the loser in the trash, updated index lines and both log entries.

## Judgment calls

- Two notes that overlap only in part are not duplicates. Link them with `related:` instead.
- When neither note is clearly better, keep the one that is linked from a topic page.

## Manual checklist (without an AI)

1. Open both notes side by side and copy the unique text into the one you keep.
2. Merge the `# Citations` lists and add the other title to `aliases:`.
3. Rename or merge through Obsidian so links update, then check the backlinks panel is empty for the old note.
4. Delete the old note (it goes to Obsidian's trash) and fix the folder `index.md`.
5. Add the removal to `Atlas/log.md`.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
