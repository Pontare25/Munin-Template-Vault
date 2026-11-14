---
type: sop
version: 2
summary: Answer a question from the vault by climbing the navigation ladder, cheapest lookup first
---

# SOP: Query

Answer questions from the vault. Retrieval climbs a ladder from the cheapest lookup to the most expensive, so answers stay fast even when the vault is large. Never read the whole vault to answer a question.

**Trigger:** the human asks "what do I know about X?", "what connects X and Y?", "what contradicts X?", "where is that note about...", or any question the vault might answer.

## The navigation ladder

Climb one rung at a time. Stop as soon as the question is answered.

1. **Topic page.** Read the Topic page in `Atlas/Topics/` closest to the question, including its compass keys.
2. **Backlinks.** Read the notes that link to that topic (via `topics:` or compass keys) and the notes its compass points at.
3. **Map of content.** If a map in `Atlas/MOCs/` covers the area (its `index.md` lists them), read it for the notes it gathers.
4. **Index or Base.** Inside `Atlas/`, scan the folder's `index.md` (`Atlas/index.md` lists the folders); elsewhere, the matching Base from the catalogue in [[Vault-Map]]. Pick by the one-line `summary:`.
5. **Vault search.** Full-text search, last resort, for questions no map or index anticipated.

## Steps

1. **Name the target.** Say which topic, note, or pair of notes the question is about. If no topic fits, start at rung 3.
2. **Climb the ladder** and read only what each rung surfaces.
3. **Synthesize.** Answer in your own words, with wikilinks to every note the answer draws on.
4. **Say "not in the vault" when it is not.** If the ladder ends without an answer, say so plainly and offer to research or ingest. Never fill the gap from general knowledge without labeling it as outside the vault.
5. **Offer to file good answers.** A synthesis worth keeping becomes a `type: note` in `Atlas/Notes/` via [[new-note]], with `up:` a topic, `ai: pending`, a `# Citations` list linking the notes it draws on, and a line in the folder `index.md`. Chat history evaporates; the vault compounds.
6. **Report retrieval misses.** If a rung should have found the answer but did not (a missing index line, an unlinked topic, an orphan note), append a line to [[AI-OS/log|log]] naming the rung and the note. It is also a [[lint]] finding: flag it or fix it on approval.

## Output

An answer with wikilinks to every note it draws on, or a plain "not in the vault", plus an offer to file a good answer. A log entry only when a note is filed or a retrieval miss is found.

## Query shapes

| Question | Where to look |
|---|---|
| "What do I know about X?" | Rungs 1-2: topic page plus its backlinks |
| "What connects X and Y?" | Both compasses and backlink sets; the overlap is the answer |
| "What contradicts X?" | The note's `opposes:` links first, then `opposes:` entries across its topic's notes |
| A specific fact | Topic page if one fits, otherwise rungs 3 and 4, then search |
| A meeting or a day | `Calendar/`: a meeting by its `people:` or date (Meetings Base), a daily note by its date |
| "What am I working on?" | Frontmatter, never a copied list: the current-work query in `AGENTS.md`, or the Efforts and Tasks Bases |

## Judgment calls

- A confident answer from rung 5 alone is a hint the graph is missing structure; consider proposing a topic or compass links along with the answer.
- Plain queries need no [[log]] entry; filing an answer or a retrieval miss does.

## Manual checklist (without an AI)

1. Open the topic page closest to the question and follow its backlinks and compass.
2. Check `Atlas/MOCs/` and the folder `index.md`, then a Base, before full-text search.
3. Save an answer worth keeping as a note in `Atlas/Notes/`.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
