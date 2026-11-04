# Guide: Hotkeys

Custom keyboard shortcuts in this vault. Rebind any of them in **Settings → Hotkeys** (search the command name).

## Templates

- **`Alt+E`**: open Templater's template picker and insert the chosen template at the cursor. Bound in this vault because Templater 2.26 no longer ships it as a default.

## Tasks

- **`Ctrl+Alt+T`** (*Templater: Insert Commands/new-task*): new task. Opens TaskNotes' create window; after you save, a task note is created in `Efforts/TaskNotes/Tasks/`, the line becomes a reference to it (`- [t] #task [[task - <title>|<title>]]`) and the task's `origin:` is set to this note. Use it on an empty bullet or blank line; on a text line the reference goes on a new line below. On a line that already links a task, it opens that task instead. (macOS: `Cmd+Option+T`.)
- In the create window's title box: `@` assigns a person, `+` sets the project or Area (`up:`), `*` sets the status.
- TaskNotes' own create command (*TaskNotes: Create new inline task*, `tasknotes:create-inline-task`) is explicitly unbound in this vault's hotkeys, so `Ctrl+Alt+T` has one owner and every task gets its reference line.

Statuses, dates, boards and archiving: [[tasks-and-logs]].

## Logs

- **`Ctrl+Alt+L`** — insert a `- [b]` log bullet. Press again on the same line to cycle the marker: `[b] → [i] → [p] → [c] → [*]`. (macOS: `Cmd+Option+L`.)
- **Log decision** (*Templater: Insert Commands/log-decision*): insert a ready-to-write decision log: `- [b] #log/decision`. On a line that already has a log bullet, it just adds the tag.
- **Log risk** (*Templater: Insert Commands/log-risk*): insert a ready-to-write risk log: `- [c] #log/risk`.

Marker meanings: `[b]` log / event · `[i]` fact · `[p]` positive · `[c]` negative · `[*]` highlight. Full system in [[tasks-and-logs]].

*Log decision* and *Log risk* have no key bound by default: run them from the command palette (`Ctrl+P`, type `log-decision` or `log-risk`), or bind a key in **Settings → Hotkeys** if you log these often.

## Capture

- **Promote note** (*Templater: Insert Commands/promote-note*): turns the open note into a real type: pick `note`, `topic`, `person`, `meeting`, `work-session`, `project` or `source`, and the note gets that type's frontmatter and sections and moves to that type's folder. What you already wrote is kept.
- Fleeting notes carry a **Promote note** button at the top; click it. Anywhere else, run *Templater: Insert Commands/promote-note* from the command palette (`Ctrl+P`, type `promote-note`). No key is bound by default; bind one in **Settings → Hotkeys** if you promote often.
- Works on a note that already has a type too, when you want to change it.

## Search

- **`Ctrl+Alt+F`** — Omnisearch (vault-wide search). (macOS: `Cmd+Option+F`.)
