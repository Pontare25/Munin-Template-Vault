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

Open today's note from the **Calendar** panel (right sidebar, opens on startup) or the "Open today's note" command (Ctrl/Cmd-P opens the command palette). The Journals plugin creates it under `Calendar/Daily Notes/YYYY/MM-MMM/` from the daily template, building the folders as needed. This vault's core habit: dump everything into today's daily note; the [[daily-review]] SOP sorts it later. The summary box at the top is a Meta Bind field that writes straight to the note's `summary:` property. Journals and Meta Bind are preconfigured; the onboarding session verifies them.

## Weekly notes

Open the week's note via the **Calendar** panel or the "Open weekly note" command. Journals files it under `Calendar/Weekly Notes/YYYY/` from the weekly template. The weekly note is a review surface, not a capture surface: it rolls up the week automatically and gives you room to close the week out.

- **Rollup** pulls the week together with no manual work: the week's daily notes (the Journals base's "Weekly-rollup" view — the day-into-week hierarchy); tasks completed and created this week, tasks still open by week's end (Tasks plugin, date-scoped); the week's logs and any `#log/decision` items grouped by day (Dataview over the week's daily and meeting notes); and every meeting held that week (the Meetings base's "Weekly meeting rollup" view). The date range comes from the note title.
- **Weekly Review** — prompts for wins, misses, and decisions worth promoting to a `type: decision` note.
- **Next week** — a top-3 priorities block, so planning flows forward.

The rollups only surface what you linked and tagged during the week (see [[tasks-and-logs]]); an empty section usually means nothing was captured, not a broken query.

## Monthly notes

Open the month's note via the **Calendar** panel or the "Open monthly note" command. Journals files it under `Calendar/Monthly Notes/YYYY/` from the monthly template. Same idea as the weekly note, one altitude up: it rolls up the month's weekly notes (the Journals base's "Monthly-rollup" view — the week-into-month hierarchy) and the month's tasks (completed, created, still open by month's end), and gives you a review surface for wins, misses, decisions, and themes plus next-month priorities.

The rollup follows the journal hierarchy — days roll into the week note, weeks roll into the month note — so the monthly note is where you step back and summarize the weeks rather than re-reading every day. The month-scoped log and decision rollup is a placeholder for now.

## Tags

A word with `#` in front (`#example`) is a tag; the tag pane lists all of them. This vault uses tags sparingly: `#example` marks deletable example content, and an optional `#type/...` mirror exists for browsing. Subjects are handled by `topics:` links instead, because links carry more information than tags.

## The graph

Ctrl/Cmd-G opens the graph view: every note a dot, every link a line. Pretty, occasionally useful for spotting orphan notes (dots with no lines). The [[lint]] SOP finds those more reliably.

## Templates (Templater)

Templater powers the note templates and is the one plugin the vault truly needs. When you create a note from a template (via the Templater icon or hotkey), it fills in dates and prompts for values automatically. Template selection table lives in [[Vault-Map]]. The vault also bundles two optional helpers, already installed: Omnisearch (fast full-text search) and Text Extractor (OCR and text extraction from PDFs and images).

## Search

Ctrl/Cmd-Shift-F searches all note text. Before searching, though, check the folder README indexes: every folder lists its notes with one-line summaries, which is usually faster. The bundled Omnisearch plugin adds a faster, fuzzy search with its own command and ribbon icon.

## Text extraction and OCR languages

Text Extractor pulls text out of PDFs and images, including scanned pages, via OCR. It ships configured for English and Swedish (`eng`, `swe`); Swedish is included because the template's author works in a Swedish context, and it is harmless to keep even if you never scan Swedish. To change the languages, open Settings, Text Extractor, and edit the OCR languages. Each entry is a Tesseract language code (for example `deu` for German, `fra` for French). Removing `swe` is fine if you do not need it.
