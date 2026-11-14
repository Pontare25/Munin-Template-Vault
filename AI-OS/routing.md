# Routing

How the AI picks the handler for a request before acting. Routing is the first move of every task.

## The procedure

For every request, in order:

1. **Match a SOP.** Check the trigger index below, including My SOPs. On a match, open that SOP in `AI-OS/SOPs/` and read it in full before touching the vault.
2. **Fall through to a skill.** If no SOP matches, look for a matching skill in `AI-OS/Skills/` (its README lists what is installed and how to load one). Load the skill and follow it.
3. **Consider a subagent.** Split independent work across parallel subagents when your tool supports it; the main session owns shared files. A single, dependent task stays on the main thread.
4. **No match anywhere:** follow the No match section below. Never freestyle a vault operation.

## Declare before the first action

Before the first tool call on any task, state the routing decision in one line, so the human can catch a wrong turn early:

> **Routing:** [SOP name, skill, or none] because [which trigger matched]. **Plan:** [1 to 3 steps].

## Trigger index

| Request smells like | SOP |
|---|---|
| "ingest this", "process this", a pasted source or URL, a file dropped in `Raw/` | [[ingest]] |
| "make a note", "write this up as an atomic note", "capture this idea" | [[new-note]] |
| "what do I know about X", "what connects X and Y", "what contradicts X", "find that note" | [[query]] |
| "review my daily note", "sweep my captures", "process my inbox", "develop my fleeting notes" | [[daily-review]] |
| "weekly review", "review my week" | [[weekly-review]] |
| "monthly review", "review my month", "review my Areas" | [[monthly-review]] |
| "start a project", "close this project", "project retro" | [[project-lifecycle]] |
| "close the meeting", "turn the actions into tasks" | [[meeting-close]] |
| "merge these notes", "these notes say the same thing" | [[merge-notes]] |
| "lint", "check the graph", "broken links", "orphans", "graph health" | [[lint]] |
| "upgrade the vault", "update to the new template version", "install the new release" | [[upgrade-vault]] |
| "set up my vault", "onboard me", "fill in my profile" | [[onboarding]] |

The index maps intent, not exact words: a paraphrase or another language routes the same.

## My SOPs

<!-- Rows for SOPs you add yourself, same format as the table above. Upgrades keep this section. -->

| Request smells like | SOP |
|---|---|

## No match

When nothing in the index fits and no skill applies:

1. **Say so.** Tell the human no procedure matches; never improvise a vault operation.
2. **Propose a procedure.** Offer a new SOP (it can start as a stub: title, trigger, the steps you would have taken) under My SOPs, or adapt the closest one.
3. **Proceed only with the human's go-ahead** for anything that writes to the vault. Answering a plain question needs no SOP.

## Keeping the index current

A SOP and its row change together: add, update or remove the row in the same change as the SOP ([[sop-format]]).
