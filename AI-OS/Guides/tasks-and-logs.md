# Guide: Tasks & Logs

Checkbox items carry two different layers in this vault: **actions** (things to do) and **information** (things that happened or that you learned). Both use the same `- [ ]` checkbox syntax, separated by the marker inside the brackets. Keeping them in one syntax means a single query surface; keeping them in two families means your to-do list never fills up with notes.

## The two families

| Family | Markers | Purpose | Counts as a task? |
|---|---|---|---|
| **Tasks** | `[ ]` `[/]` `[x]` `[!]` `[-]` `[>]` `[?]` | Actionable work | Yes |
| **Logs** | `[b]` `[i]` `[p]` `[c]` `[*]` | Information, not action | No (`NON_TASK`) |

The log markers are registered as type `NON_TASK` in the Tasks plugin. They are invisible to task queries, never counted as "to-do", and never "complete" — clicking one cycles its marker rather than marking it done.

## Writing tasks

- **`Ctrl+L`** inserts an empty checkbox `- [ ]` (Obsidian default).
- **`Ctrl+Shift+L`** adds the `#task` tag to the line.

Only lines tagged `#task` are tracked by the Tasks plugin — this is the plugin's global filter. A checkbox **without** `#task` is ignored by every task query, which is useful for throwaway sub-steps you don't want cluttering rollups. The `#task` tag is hidden in rendered task queries, so it stays out of your way.

Task statuses:

| Marker | Meaning |
|---|---|
| `[ ]` | to-do |
| `[/]` | in progress |
| `[x]` | done |
| `[!]` | important |
| `[-]` | cancelled |
| `[>]` | deferred (scheduled or pushed later) |
| `[?]` | question (a loose end that may become a task) |

Dates use the Tasks plugin's emoji fields, added automatically per your settings: `➕` created, `📅` due, `⏳` scheduled, `🛫` start, `✅` done. Example:

```markdown
- [ ] #task Draft the integration spec 📅 2026-08-15
```

Write tasks wherever the work surfaces: a daily note, a meeting note, or directly in a project note.

## Writing logs

| Marker | Meaning |
|---|---|
| `[b]` | log / bookmark (a thing that happened, often a linked note) |
| `[i]` | information / fact |
| `[p]` | positive |
| `[c]` | negative |
| `[*]` | highlight |

Logs record what happened or what you learned, not what to do. They live mostly in daily and meeting notes. Decisions are usually logged as `[p]` / `[c]`. No `#task` tag — logs are not tasks.

```markdown
- [b] [[2026-08-11 Muninize kickoff]] — kickoff with [[Anna Berg]]
- [i] Client prefers a phased rollout [[Project Muninize]]
- [c] The legacy SOAP endpoint may block the timeline [[Project Muninize]]
```

## The linking rule (why any of this rolls up)

Name the entities an item touches with wikilinks. An item that names `[[Project Muninize]]` and `[[Anna Berg]]` surfaces on **both** of those notes. There are two ways an item reaches a note:

1. **The line links the note** — `[i] Prefers REST [[Project Muninize]]`.
2. **The item's note declares the note as its parent** — a meeting note with `up: [[Project Muninize]]` rolls *all* of its tasks and logs up to that project.

So a task written in a meeting note reaches the project through the meeting's `up`, without you having to link the project on every line.

## Querying

Two engines, deliberately split:

- **Dataview** handles the link-scoped rollups on project and person notes. The standard pattern is:

  ```dataview
  TASK
  WHERE contains(list("b", "i", "p", "c", "*"), status)
  WHERE contains(outlinks, [[]]) or contains(up, [[]])
  GROUP BY file.name as Source
  SORT Source DESC
  ```

  `contains(outlinks, [[]])` catches items whose line links this note; `contains(up, [[]])` catches items in notes parented to it. Logs are grouped by source note, and because daily and meeting notes are named with a date prefix, that grouping sorts chronologically for free. The task version swaps the status list for `" ", "/", "!", ">", "?"` and adds `WHERE contains(text, "#task")`.

- **The Tasks plugin** handles date-scoped global dashboards — today, overdue, deferred — across the whole vault, filtered to `#task`. It has no notion of "tasks in notes linking here", so it is the wrong tool for per-project rollups and the right tool for "what is due this week everywhere".

Rule of thumb: **Dataview for link-scoped rollups, the Tasks plugin for date-scoped global views.**

## See also

- [[working-with-projects]] — how projects, meetings, and people wire these items together.
