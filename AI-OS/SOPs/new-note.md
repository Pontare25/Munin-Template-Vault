# SOP: New Note

Create a single note by hand (as opposed to ingest, which creates notes in bulk from a source).

**Trigger:** the human asks for a new note, or another SOP needs one created.

## Steps

1. **Decide the destination** using the filing rules in [[Vault-Map]]. If two destinations seem plausible, say which you picked and why.
2. **Check it does not already exist, and check what it contradicts.** Search the target folder's README index and the vault for the title and obvious synonyms. If a close match exists, propose updating that note instead. If the new note would contradict an existing note, create it anyway and link the two via `challenges:`: contradictions are findings to surface, not errors to avoid.
3. **Pick the template** from the selection table in [[Vault-Map]]. People and organizations use the frontmatter pattern in [[note-schema]] instead of a template.
4. **Name the note well:** nouns over sentences, specific over generic, no dates in knowledge-note titles (dates belong to Calendar notes).
5. **Fill the minimum frontmatter** for the type (see the compass table in [[note-schema]]). At minimum: `type:`, `created-date:`, and `up:` for knowledge notes.
6. **Write the body.** One idea per atomic note. Start with `%% #AI-Assisted %%` if you wrote it.
7. **Link it in:** make sure at least one existing note links to the new note or is linked from it. Orphan notes are lint findings waiting to happen.
8. **Update the folder README index** with one line for the new note.
9. **Log it** in [[log]] if the note was created as part of a work session (a single quick note for the human does not need its own log entry).
