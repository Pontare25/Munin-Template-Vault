# Guide: Daily Notes

The daily note is the vault's front door. It is where the day is captured as it happens — what you did, what you learned, what you need to do — before any of it is filed anywhere permanent. You write into the day; the vault sorts it out afterward.

That is the whole idea: **capture is cheap, structure is automatic**. You do not decide where a thought belongs while you are having it. You drop it in today's note, name the people and projects it touches with `[[wikilinks]]`, and the queries on those notes pull it in for free. A log written in today's daily note surfaces on the project it names, on the person it names, and in this week's rollup — without you filing it anywhere.

## Creating a daily note

Start by either clicking `Ctrl+P` to open the `Command palette` and search for `Journals: Open today's note`, or the easier option is to simply use the calendar widget and click on today's date to create the note.

The note is created from the daily template, pre-filled with the date, a quote, and the empty sections below. One note per day, named `YYYY-MM-DD`, filed automatically under `Calendar/Daily Notes/YYYY/MM-Mon/`.

## Breaking down the daily note

The template ships with these sections, top to bottom. Use the ones that serve you and ignore the rest — an empty section costs nothing.

| Section | What goes here |
|---|---|
| **Daily Summary** | One or two lines on what the day was about. Fills the `summary:` field, which is what the weekly and monthly rollups display for this day. Write it at the end of the day. |
| **Brain dump** | A scratch area. Unsorted thoughts, half-tasks, things to remember. Nothing here is queried — it is a holding pen you promote out of, not a record. |
| **Today's top 3** | The three things that matter most today. A focus anchor, not a task list. |
| **Logs** | The heart of the note. Timestamped record of what happened and what you learned, split into **Morning / Afternoon / Evening** as a light time-box. This is the section that feeds the knowledge graph — see below. |
| **Tasks** | Auto-generated dashboards: tasks created today, completed today, due today, and upcoming. You rarely write here directly; you write tasks inside logs or meeting notes and they appear here. |
| **Meetings** | A rollup of every meeting note dated today, with its tasks and logs pulled in. Populated automatically from the meeting notes' `date:`. |

## The logging discipline

Logs are where the daily note earns its place. Two rules make everything downstream work:

1. **Pick the right marker.** `[b]` for something that happened, `[i]` for a standing fact, `[p]`/`[c]` for sentiment. A checkbox `[ ]` with `#task` for something to do. The full marker system lives in [[tasks-and-logs]]
2. **Name the entities.** Every log that touches a project or a person should link it: `[b] Kickoff with [[Anna Berg]] [[Project Muninize]]`. The link is what makes the item traceable.

> [!tip]
> See [[Recommended Obsidian Tutorials#Construct By Dee]] for more details on how the logging system works.

Insert a log bullet with **`Ctrl+Alt+L`** and cycle the marker by pressing it again. See [[Hotkeys]] for the full set.

An unlinked log is a private diary entry: fine, but it stays in the daily note and rolls up nowhere. A linked log is a piece of the graph.

## Why links matter (the whole trick)

The daily note is deliberately disposable. You are not meant to go back and read old dailies — you read the **project** and the **person**, and those notes assemble themselves from every daily and meeting that linked them. The daily is the capture surface; the entity notes are the memory.

So the one habit worth building: **when you write a log, link what it is about.** Everything else — the rollups, the timelines, the "what did I do on this project" views — falls out of that single move.

## See also

- [[tasks-and-logs]] — the marker system, the `#task` convention, and how the rollup queries work.
- [[working-with-projects]] — how projects, meetings, and people wire these items together.
- [[Hotkeys]] — the shortcuts for inserting tasks and logs.
