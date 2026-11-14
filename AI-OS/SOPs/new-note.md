---
type: sop
version: 2
summary: Create one note by hand in the right folder, with minimum frontmatter, links and an index line
---

# SOP: New Note

Create a single note by hand (as opposed to ingest, which creates notes in bulk from a source).

**Trigger:** the human asks for a new note, or another SOP needs one created.

## Steps

1. **Decide the destination** using the filing rules in [[Vault-Map]]. If two destinations seem plausible, say which you picked and why.
2. **Check it does not already exist, and check what it contradicts.** Search the target folder's index (its README, or `index.md` inside Atlas) and the vault for the title and obvious synonyms. If a close match exists, propose updating that note instead. If the new note would contradict an existing note, create it anyway and link the two via `opposes:`: contradictions are findings to surface, not errors to avoid.
3. **Pick the template** from the selection table in [[Vault-Map]]. People and organizations use the frontmatter pattern in [[note-schema-reference]] instead of a template.
4. **Name the note well:** nouns over sentences, specific over generic, no dates in knowledge-note titles (dates belong to Calendar notes).
5. **Fill the minimum frontmatter** for the type (see the compass table in [[note-schema]]). At minimum: `type:`, `date_created:`, and `up:` for knowledge notes, plus a one-line `summary:` so indexes and retrieval can pick the note without opening it.
6. **Write the body.** One idea per atomic note. Set `ai: pending` on notes you write; inside a note the user wrote, put `%% #AI-Assisted %%` above your section.
7. **Link it in:** make sure at least one existing note links to the new note or is linked from it. Orphan notes are lint findings waiting to happen.
8. **Update the folder `index.md`** with one line for the new note.
9. **Log it** in [[AI-OS/log|log]] if the note was created as part of a work session (a single quick note for the human does not need its own log entry).
10. **Record it in the bundle changelog.** If the note lives in `Atlas/`, append a `**Creation**` line under today's date in [[Atlas/log]] (OKF §7).

## Output

The new note, linked from at least one other note, with its index line; log entries where steps 9 and 10 apply.

## Manual checklist (without an AI)

1. Pick the folder with the filing rules in [[Vault-Map]] and search for an existing note first.
2. Create the note from the matching template in the Vault-Map template table.
3. Fill `type:`, `up:` and `summary:`, link it from at least one note, and add its line to the folder `index.md`.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
