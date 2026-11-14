---
type: sop
version: 2
summary: Interview a new user, fill in Me.md, check settings and run a first ingest together
---

# SOP: Onboarding

Set up a fresh vault with its human: learn who they are, fill in their profile, check the one per-device setting, and run a first ingest together. Conversational, one phase at a time.

**Trigger:** the human says "set up my vault", "onboard me", "fill in my profile", or similar; or the boot check in `AGENTS.md` finds a `[placeholder]` list item still in `AI-OS/Me.md` and the human accepts the offer.

## Steps

1. **Orient.** Read `AI-OS/Me.md` and the trigger index in `AI-OS/routing.md`. Tell the human in two or three sentences what this vault is (a second brain the AI helps maintain: capture, ingest, query, review) and what your job in it will be. Probe read-only which tools work (can you run the Obsidian CLI, is git present, are hooks or MCP available) instead of asking the human, and report what you found in one line. Ask whether they want the full setup or only the profile; skip steps 4 and 5 on "only the profile".
2. **Interview.** First discover: read what the vault already holds (Areas in `Efforts/Areas/`, projects, person notes, `Me.md`) and match by subject, not filename. Then ask only about what is missing, to fill every `[placeholder]` list item in `Me.md`, at most three questions at a time. Follow up where an answer is vague. On a re-run, ask only about placeholders that remain.
3. **Fill `Me.md`.** Replace each placeholder with the answer, as short as the skeleton line. Delete roles or purposes the human does not have rather than leaving a placeholder. Remove the onboarding comment at the top. Leave My additions empty unless the human names a rule for you. Create an Area, project or person note only from real data: never an empty one, no empty sections, and a brain-dump answer becomes notes only where it holds real content. Show the result and revise until the human approves it.
4. **Check settings.** Ask the human to confirm steps 2 and 3 of [[first-hour]] are done (community plugins on, the per-device Templater setting); if one is not, walk them through it. Offer the starter skills in [[ai-setup#Skills]].
5. **Tutorial ingest.** Ask for one thing to feed the vault: a link, a pasted article, or an idea of theirs. Follow [[ingest]] end to end, explaining each step in one line as you do it.
6. **Close.** Append a [[AI-OS/log|log]] entry (`## [YYYY-MM-DD] setup | Onboarding`) listing what was filled and ingested. Remind the human of the one habit that matters: dump everything into today's daily note. Point them to [[first-hour]] for what to read next. Capture any feedback about this setup in the `memory.md` Inbox.

## Output

A `Me.md` the human approved, a first ingested source, and the step 6 `setup` log entry.

## Judgment calls

- The human may stop after any phase. Say what is left; the next boot offers onboarding again while placeholders remain.
- Never edit `AGENTS.md` during onboarding. A preference about how you work goes into My additions, in the human's words.
- Personal details stay in `Me.md`; never copy them into notes in `Atlas/`.

## Manual checklist (without an AI)

1. Open `AI-OS/Me.md` and replace every bracketed placeholder with your own short answer; delete lines that do not apply.
2. Follow [[first-hour]] from start to end.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
