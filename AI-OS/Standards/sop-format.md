# Standard: SOP Format

How every SOP in `AI-OS/SOPs/` is written, the shipped ones and your own. Read it before creating or editing a SOP.

## Shape

```markdown
---
version: 1
summary: One line on what the SOP does
---

# SOP: Name

One short paragraph: what this procedure achieves and when it is worth running.

**Trigger:** the phrases or situations that route here (the same ones as its row in `routing.md`).

## Steps

1. **Imperative verb first.** One action per step, with the files it reads or writes.

## Output

What the human gets at the end, and the log entry format.

## Judgment calls

- Optional: the decisions the steps cannot settle.

## Manual checklist (without an AI)

1. The same work as a short list a human can do alone.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
```

## Rules

- **Frontmatter:** `version:` (a whole number) and `summary:` only. SOPs are system files, not notes, so they carry no `type:`.
- **Version:** raise it by one when a change alters what the procedure does; wording fixes keep it.
- **Length:** 800 words at most, frontmatter included. Past that, split the SOP or move reference detail into another file.
- **Steps:** reading and previewing come before writing; a step that changes the vault says when it needs the human's approval. Every SOP that creates, renames or retires a note in `Atlas/` updates the folder's `index.md` in the same step.
- **Every SOP has a routing row:** shipped SOPs in the trigger index, your own under My SOPs in `routing.md`, added in the same change as the SOP.
- **Manual checklist:** every SOP has one, so the vault works without an AI.
- **Your lessons stay in your files.** Shipped SOPs are replaced on upgrade, so notes from your own use go in `memory.md`, never in the SOP.
- **Writing:** plain words, no em-dashes, links as wikilinks to the SOP or note they name.
