# Guide: Obsidian Basics

Just enough Obsidian to operate this vault. Obsidian can do far more; none of it is required here.

## Notes and folders

Every note is a plain text file (`.md`, markdown) on your computer. Obsidian is a viewer and editor for that folder. This matters: your notes are yours, readable by any program, not locked in an app. It is also why an AI assistant can maintain the vault, since it just reads and writes files.

## Links (the core mechanic)

Type `[[` and start typing a note's name to link to it: `[[Spaced Repetition]]`. If the note does not exist yet, the link is grayed out; clicking it creates the note. Links are what turn a pile of files into a wiki: every note's **backlinks pane** (right sidebar) shows every other note that links to it.

## Frontmatter (properties)

The block between `---` lines at the top of a note holds structured fields:

```yaml
---
type: note
created-date: 2026-01-15
up:
  - "[[Learning]]"
---
```

Obsidian shows these as "properties" above the note. This vault leans on frontmatter heavily; the fields and what they mean are defined in [[note-schema]]. When a field holds a wikilink, quote it as above.

## Daily notes

Open today's daily note with the calendar icon in the left ribbon or the "Open today's daily note" command (Ctrl/Cmd-P opens the command palette). This vault's core habit: dump everything into today's daily note; the [[daily-review]] SOP sorts it later. Daily-note settings (folder and template) are preconfigured; the onboarding session verifies them.

## Tags

A word with `#` in front (`#example`) is a tag; the tag pane lists all of them. This vault uses tags sparingly: `#example` marks deletable example content, and an optional `#type/...` mirror exists for browsing. Subjects are handled by `topics:` links instead, because links carry more information than tags.

## The graph

Ctrl/Cmd-G opens the graph view: every note a dot, every link a line. Pretty, occasionally useful for spotting orphan notes (dots with no lines). The [[lint]] SOP finds those more reliably.

## Templates (Templater)

Templater is the one community plugin this vault requires. When you create a note from a template (via the Templater icon or hotkey), it fills in dates and prompts for values automatically. Template selection table lives in [[Vault-Map]].

## Search

Ctrl/Cmd-Shift-F searches all note text. Before searching, though, check the folder README indexes: every folder lists its notes with one-line summaries, which is usually faster.
