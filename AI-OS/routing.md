# Routing

How the AI decides what to do with a request, before doing any of it. Routing is the first move of every task: match the request to the right handler, then follow that handler. It governs which procedure runs; it is not itself one of the vault operations.

## The procedure

For every request, in order:

1. **Match a SOP.** Check the trigger index below. On a match, open that SOP in `AI-OS/SOPs/` and read it in full before touching the vault.
2. **Fall through to a skill.** If no SOP matches, look for a matching skill in `AI-OS/Skills/` (its README lists what is installed and how to load one). Load the skill and follow it.
3. **Consider a subagent.** If the request splits into two or more independent units of work, dispatch them to parallel subagents instead of doing them in sequence (the orchestration pattern is forthcoming, tracked under Agent patterns F3). A single, dependent task stays on the main thread.
4. **No match anywhere:** follow the No match section below. Never freestyle a vault operation.

## Declare before the first action

Before the first tool call on any task, state the routing decision in one line, so the human can catch a wrong turn early:

> **Routing:** [SOP name, skill, or none] because [which trigger matched]. **Plan:** [1 to 3 steps].

## Trigger index

Match the request's intent (its "smell") to a SOP, then read that SOP in full before acting.

| Request smells like | SOP |
|---|---|
| "ingest this", "process this", a pasted source or URL, a file dropped in `Raw/` | [[ingest]] |
| "make a note", "write this up as an atomic note", "capture this idea" | [[new-note]] |
| "what do I know about X", "what connects X and Y", "what contradicts X", "find that note" | [[query]] |
| "review my daily note", "sweep my captures", "process my inbox" | [[daily-review]] |
| "lint", "check the graph", "broken links", "orphans", "graph health" | [[lint]] |

The index maps intent, not exact words: a request that clearly means one of these routes there even when it is phrased differently or written in another language.

## No match

When nothing in the index fits and no skill applies:

1. **Say so.** Tell the human plainly that no procedure matches, rather than improvising a vault operation.
2. **Propose a procedure.** Offer to create a new SOP for this kind of request, or to adapt the closest existing one. A new SOP can start as a stub: a title, its trigger, and the steps you would have taken, saved to `AI-OS/SOPs/` and added to the index.
3. **Proceed only with the human's go-ahead** for anything that writes to the vault. Answering a plain question needs no SOP.

## Keeping the index current

The index only works while it tracks the SOPs.

- When a SOP is **created**, add its trigger row here in the same change.
- When a SOP's scope **changes**, update its row.
- When a SOP is **retired**, remove its row.

The AI proposes these edits and the human approves them, like any AI-OS change. Because `Me.md` is read at the start of every session and points here, the AI sees the current index every time it starts work.
