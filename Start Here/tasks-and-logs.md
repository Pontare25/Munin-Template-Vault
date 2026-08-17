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
- **`Ctrl+Shift+T`** opens the Tasks create/edit window and tags the line `#task`.

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

Logs record what happened or what is true, not what to do. They live mostly in daily and meeting notes, and carry no `#task` tag.

**`Ctrl+Shift+L`** inserts a `- [b]` log bullet; press it again on the same line to cycle the marker `[b] → [i] → [p] → [c]`. The five markers split into two groups:

**Record** — the factual layer:

| Marker | Meaning | Feeds |
|---|---|---|
| `[i]` | information / state (a standing fact, present tense) | the knowledge graph — what is true |
| `[b]` | log / event (something that happened, past tense) | the timeline — what happened |

```markdown
- [i] [[Application A]] uses a REST API
- [i] [[Anna Berg]] plays [[Golf]]
- [b] Decided to use REST for [[Application A]]
- [b] Played [[Golf]] with [[Anna Berg]]
```

**Sentiment / emphasis** — how you read something:

| Marker | Meaning |
|---|---|
| `[p]` | positive |
| `[c]` | negative |
| `[*]` | highlight |

## Typed logs: the `#log/*` taxonomy

Some log kinds are worth querying as a class across the whole vault. Give those a nested tag under `#log/`, in addition to their marker. The tag is **opt-in** — an ordinary log needs only its marker; add a tag only when the kind forms a class you want to pull together.

| Kind | Marker + tag | Why that marker |
|---|---|---|
| Decision | `- [b] #log/decision Go REST-first [[Project Muninize]]` | a decision is an event |
| Risk | `- [c] #log/risk Legacy SOAP endpoint may block the timeline [[Project Muninize]]` | a risk is a flagged concern |

The marker and the tag do different jobs: the **marker** sets the family, behavior (`NON_TASK`), and visual; the **tag** sets the semantic class for cross-cutting queries. They are orthogonal, which is why decision and risk draw from different markers but share the `#log/` namespace. Query all decisions with `#log/decision`, everything typed with `#log/*`.

Major decisions can be promoted to their own `type: decision` note (context, rationale, date), ADR-style — the same capture-cheap, promote-what-matters move as the rest of the vault.

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
