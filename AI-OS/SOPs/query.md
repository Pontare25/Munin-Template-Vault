# SOP: Query

Answer questions from the vault. Retrieval climbs a ladder from the cheapest lookup to the most expensive, so answers stay fast even when the vault is large. Never read the whole vault to answer a question.

**Trigger:** the human asks "what do I know about X?", "what connects X and Y?", "what contradicts X?", "where is that note about...", or any question the vault might answer.

## The retrieval ladder

Climb one rung at a time. Stop as soon as the question is answered.

1. **Topic page.** Read the Topic page in `Atlas/Topics/` closest to the question, including its compass keys.
2. **Backlinks.** Read the notes that link to that topic (via `topics:` or compass keys) and the notes its compass points at.
3. **Index or Base.** Scan the relevant folder README index, or the matching Base, for note titles that fit.
4. **Vault search.** Full-text search, last resort, for questions no index anticipated.

## Steps

1. **Name the target.** Say which topic, note, or pair of notes the question is about. If no topic fits, start at rung 3.
2. **Climb the ladder** and read only what each rung surfaces.
3. **Synthesize.** Answer in your own words, with wikilinks to every note the answer draws on.
4. **Say "not in the vault" when it is not.** If the ladder ends without an answer, say so plainly and offer to research or ingest. Never fill the gap from general knowledge without labeling it as outside the vault.
5. **Offer to file good answers.** A synthesis worth keeping becomes an Atlas note via [[new-note]]. Chat history evaporates; the vault compounds.
6. **Report retrieval failures.** If the answer existed but the ladder missed it (a missing index line, an unlinked topic, an orphan note), that is a [[lint]] finding: flag it or fix it on approval.

## Query shapes

| Question | Where to look |
|---|---|
| "What do I know about X?" | Rungs 1-2: topic page plus its backlinks |
| "What connects X and Y?" | Both compasses and backlink sets; the overlap is the answer |
| "What contradicts X?" | The note's `challenges:` links first, then `challenges:` entries across its topic's notes |
| A specific fact | Topic page if one fits, otherwise rung 3, then search |

## Judgment calls

- A confident answer from rung 4 alone is a hint the graph is missing structure; consider proposing a topic or compass links along with the answer.
- Plain queries need no [[log]] entry; filing an answer does (the [[new-note]] steps cover it).
