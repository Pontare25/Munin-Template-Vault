# Guide: Working with AI

How the human-AI collaboration in this vault actually works, day to day.

## The loop

Four operations, endlessly repeated:

1. **Capture** (you): dump thoughts, links, and tasks into today's daily note or `Raw/Inbox/`. Zero filing effort; that is the AI's job.
2. **Ingest** (AI): "process this article" turns a capture into atomic notes, entity pages, and topic links in `Atlas/`. The [[ingest]] SOP defines every step.
3. **Query** (you ask, AI answers): "what do I know about X?" The AI reads the relevant Topic page, its backlinks, and the folder indexes, then synthesizes. **File good answers:** when an answer is worth keeping, say "file that" and the AI saves it as an Atlas note. Chat history evaporates; the vault compounds.
4. **Review and lint** (both): [[daily-review]] sweeps captures regularly; [[lint]] checks graph health occasionally.

## Why this works better than chat

A chat assistant starts every conversation knowing nothing about you. This vault is persistent memory: `Me.md` tells the AI who you are, `Atlas/` holds what you know, and the SOPs tell it how to behave. Any AI tool that reads files gets the same context; switch tools and nothing is lost.

## Trust, verification, and provenance

- Everything the AI writes is marked `%% #AI-Assisted %%` (invisible in reading mode, findable in search). You always know which notes to double-check.
- The AI logs every work session in [[log]]. Skim it now and then.
- The SOPs require the AI to ask before editing anything you wrote, and to report what it created after each ingest.
- AI-written notes are drafts of your knowledge, not truth. Correct them freely; corrections teach the AI what you actually think (and the vault keeps the corrected version, not the chat).

## What to ask for

Beyond the loop operations, useful requests:

- "What connects X and Y?" (the AI walks the link graph)
- "What in the vault contradicts this note?" (challenges hunting)
- "Summarize what changed in the vault this month" (reads [[log]])
- "Propose compass entries for topic X" (fills `up/related/down/challenges`)

## Privacy note

Everything an AI tool reads may be sent to the AI provider's servers for processing. Keep out of this vault anything you would not paste into a chat window: credentials, other people's confidential information, anything regulated. If a note must stay local-only, keep it in a folder your AI tool cannot see, or do not open that vault with AI tools at all. Check your AI provider's data retention and training policies; they differ.
