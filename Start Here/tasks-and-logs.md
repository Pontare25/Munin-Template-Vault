# Guide: Tasks & Logs

The vault keeps two different layers apart: **actions** (things to do) and **information** (things that happened or that you learned). Actions are **task notes**: each task is its own small note, managed by the TaskNotes plugin, with a status, dates, an owner and a parent. Information is **logs**: checkbox lines with a marker, written into daily, meeting and work-session notes. Keeping them apart means your to-do list never fills up with notes, and your log trail never fills up with chores.

## The two families

| Family | What it is | States | Purpose |
|---|---|---|---|
| **Tasks** | A task note in `Efforts/TaskNotes/Tasks/` | status `backlog`, `active`, `waiting`, `done`, `dropped` | Actionable work |
| **Logs** | A checkbox line in a daily, meeting or work-session note | markers `[b]` `[i]` `[p]` `[c]` `[*]` | Information, not action |

The two meet in one place: when you capture a task, the line you were on becomes a **task reference line** that links the new task note. That line stays in your daily or meeting note as a record of where the task came from.

A plain checkbox (`- [ ]`, which `Ctrl+L` inserts) is just a checklist line; no task view tracks it. It is handy inside a task note's body for sub-steps: the task's card shows their progress (for example 2/3).

## Capture a task: `Ctrl+Alt+T`

Write tasks wherever the work surfaces: a daily note, a meeting note, a work session.

1. Put the cursor on an empty bullet (a bare `-`) or a blank line, for example in the **Logs** section of today's daily note.
2. Press **`Ctrl+Alt+T`** (macOS: `Cmd+Option+T`). TaskNotes' create window opens.
3. The window opens compact: a title box and a row of icons (status, priority, due date, scheduled date, recurrence, reminders). Type the title. Set the **Due** date with the due-date icon. **Projects** (what the task belongs to) and **Assignees** sit under **Show detailed options**, or fill them from the title box with `+` (project) and `@` (assignee); see the shortcuts below. The scheduled date is already set to today. The title box's placeholder (`Buy groceries tomorrow at 3pm @home #errands`) is TaskNotes' generic example: in this vault `@` picks an assignee, not a place, and tags are not used on tasks.
4. Save.

Three things happen:

- A task note is created as `Efforts/TaskNotes/Tasks/task - <title>.md`. The clean title is kept in its `title:` property. A second task with the same title gets a `-2` suffix on the filename.
- Your line becomes a task reference line:

  ```markdown
  - [t] #task [[task - Draft the integration spec|Draft the integration spec]]
  ```

- The task's `origin:` property is set to the note you were in, so you can always trace where it was captured.

Where the line goes depends on where the cursor was:

- **Empty bullet or blank line:** the reference goes on that line.
- **Line with text:** the reference goes on a new line below, at the same indent. The text is not used as the title; type the title in the window.
- **Line that already links a task note:** no new task. `Ctrl+Alt+T` opens that task's edit window instead.

**Why `[t] #task`.** The reference line renders as checked so it never looks like an open to-do, and is tagged `#task` so log queries can tell it apart from other lines and show it in the log trail. It uses `t`, not `x`: TaskNotes puts a *Convert to TaskNote* button on every `[ ]` and `[x]` line, and a reference line already points to its task note. The box does **not** sync with the task: ticking or unticking it changes nothing. Complete tasks on the task itself (see below).

TaskNotes' own create command (`tasknotes:create-inline-task`, *TaskNotes: Create new inline task*) is explicitly unbound in this vault's hotkeys, so `Ctrl+Alt+T` is the only capture key and every capture gets a reference line and an `origin:`.

### Shortcuts in the create window

You can fill fields from the title box by typing a trigger character and picking from the suggestions:

| Trigger | Fills | Suggests |
|---|---|---|
| `@` | Assignees | people notes in `Atlas/Entities/People` |
| `+` | Projects (the task's `up:`) | projects and Areas with status `backlog`, `active` or `waiting` |
| `*` | Status | the five statuses |

The window also shows **Contexts** and **Tags** fields. This vault does not use them: leave them empty. Typing `$` in the title box still opens a contexts suggester (TaskNotes keeps that shortcut on); ignore it. A task's Area comes from its project (see below), not from a context or a tag.

## What a task note holds

TaskNotes writes the task's properties itself; you change them in the task's edit window (click a task card) or in the note's Properties. The full list is in [[note-schema]]. The ones you work with:

| Property | Holds |
|---|---|
| `status` | `backlog`, `active`, `waiting`, `done` or `dropped` |
| `up` | what the task belongs to: a project, or an Area |
| `assignees` | the people it is handed to |
| `date_scheduled` | when you plan to work on it (today by default) |
| `date_due` | the deadline |
| `date_completed` | set when the task reaches `done` or `dropped` |
| `priority` | `none`, `low`, `normal` (default) or `high` |
| `origin` | the note it was captured in |
| `blockedBy` | tasks that must finish first (set it in the edit window's **Blocked by** field) |

TaskNotes stores each `blockedBy` entry as a small object (the blocking task's link plus a dependency type). Obsidian's Properties panel cannot display objects, so it marks the property as invalid. The data is fine and the **Not blocked** view reads it; edit dependencies in the TaskNotes edit window, not in Properties.

The body has three sections: **Sub Tasks** (tasks whose `up:` is this task), **Notes** (free text: context, links, findings) and **Log** (every checkbox line in the vault that links this task, such as its reference line and any log about it, grouped by source note).

## Statuses

| Status | Meaning |
|---|---|
| `backlog` | captured, not started. Every new task starts here. |
| `active` | you are working on it now |
| `waiting` | handed to someone, or blocked by something outside your control |
| `done` | finished |
| `dropped` | will not be done |

Change a status in any of these ways:

- Click a task card to open its edit window and pick the status.
- Click the status icon on a card to step to the next status (Shift+click steps back).
- On a board (kanban), drag the card to another column.
- Type `*` in the create window's title box.

`done` and `dropped` both close the task and set `date_completed`.

## Link a task to a project or Area: `up:`

A task's `up:` says what it belongs to. The **Projects** field in the create window (or `+`) writes it. `up:` always points one level up: a task points at its project, a sub-project at its project, a top-level project at its Area. A task that belongs to no project points `up:` straight at an Area.

The picker lists notes in `Efforts/Projects` and `Efforts/Areas` whose status is `backlog`, `active` or `waiting`, so paused and closed projects are not offered.

`up:` is **never** filled in for you on capture. Most tasks start in daily and meeting notes, and the note you are in says nothing reliable about what the task belongs to, so set it yourself in the window. A meeting's own `up:` does not pass on to the task notes captured in it. The exception: the **New** button on a project's task board creates a task with `up:` already set to that project.

You never set an Area on a task. The vault finds a task's Area by following `up:` (task, project, parent project, Area), so a task under a sub-project still lands on its Area's board, and on the task boards, the [[Tasks]] dashboard and the [[AoR Review]] dashboard a sub-Area rolls up to its root Area.

## Assign a task

Fill **Assignees** in the create window (or type `@`), picking from your people notes. The task then shows on that person's note. Handing a task to someone is status `waiting` plus an assignee. The **New** button on a person's task board creates a task with `assignees:` already set to that person.

## Schedule and set due dates

- **Scheduled** (`date_scheduled`) is when you plan to work on the task. Every new task is scheduled for today by default, so it shows on today's daily note. Move the date if today is not the day.
- **Due** (`date_due`) is the deadline. Only a due date makes a task **overdue**. Because the scheduled date is always set, the dashboard's **Needs a due date** section lists the open tasks that still lack a deadline.

Set both in the create or edit window.

## Complete, drop and archive

To finish a task, set its status to `done` (or `dropped` if it will not happen) in one of the ways above. The task's reference line in your daily or meeting note stays as it is.

**Done is not archived.** A done task stays in `Efforts/TaskNotes/Tasks/` and keeps showing in the closed-task views. Archiving is a separate, optional clean-up step: right-click a task card and choose **Archive**. TaskNotes adds its `archived` tag to the task and moves the note to `Efforts/TaskNotes/Archive/<year>/<month>/`. The same menu unarchives it. Nothing is archived automatically.

## Where tasks live

| Path | Holds |
|---|---|
| `Efforts/TaskNotes/Tasks/` | every task note |
| `Efforts/TaskNotes/Archive/<year>/<month>/` | archived tasks (created on the first archive) |
| `System/Bases/Tasks.base` | the vault's task views, embedded by the dashboard and the templates |
| `Efforts/TaskNotes/Views/` | TaskNotes' own view files, opened by its commands (task list, kanban, calendar, agenda) |

> [!warning] Do not regenerate TaskNotes' default views
> TaskNotes can create its default view files again from its settings ("Create Default Files"). Recreating them overwrites the view Bases in `Efforts/TaskNotes/Views/` with the plugin's versions and loses the vault's fixes: for example, the **All Tasks** view in `tasks-default.base` sorts by `date_due` only because it was fixed by hand. The vault's own views in `System/Bases/Tasks.base` are not affected.

## Where tasks show up

Every task view is a view in `System/Bases/Tasks.base`, embedded where it is useful. Change a view there and every note that embeds it changes with it.

**The [[Tasks]] dashboard** (`Dashboards/Tasks.md`), vault-wide:

| Section | Shows |
|---|---|
| Needs attention | **Active or high priority**, **Overdue** (due date before today), **Today** (due today, or scheduled today or earlier), **Next 7 days** |
| Waiting & open loops | **Waiting on someone**, **Not blocked (free to start)**, **Needs a due date**, **Open tasks in inactive projects** (open tasks whose project is not `active`) |
| By area | **Open tasks by area**: a board with one column per Area; tasks with no Area land in "None" |
| Recently closed | **Last 20 completed**, **Last 20 dropped** |

**Project notes** have a **Tasks** section: a board of the project's tasks with one column per status, then folded **Closed tasks** and **Sub-project tasks** (a board with one row per sub-project). **New** on the board pre-fills `up:` with the project.

**Area notes** have a **Tasks** board: every task with that Area anywhere up its `up:` chain (its own tasks and those of its projects, sub-projects and sub-Areas), one row per direct parent. Only rows whose parent is `active` are shown, so a paused project drops off the board. **New** on this board does not pre-fill `up:`; set it in the window.

**Person notes** have a **Tasks** section: a board of the open tasks assigned to that person, then folded **Closed tasks**. **New** pre-fills `assignees:` with the person.

**Journal notes** show the tasks of their period. The daily note's **Tasks** section lists tasks created today, completed today, **Due** (open tasks due or scheduled by the end of today, overdue ones included) and **Upcoming 2 weeks**. The weekly, monthly, quarterly and yearly notes show tasks completed, created, and still open (due or scheduled by the end of the period).

**The [[AoR Review]] dashboard** has a **Task loops** strip: per Area, the number of open tasks that are overdue and that need a due date. It uses the same rule as the task boards: a task counts toward the top Area on its first `up:` chain, so subtasks, sub-project tasks and a sub-Area's tasks all count, and a task with several `up:` values counts once.

Board tips: hide the **Done** and **Dropped** columns from the board's own column controls to keep it short, and use the search box at the top of any view to filter it.

## Writing logs

Logs record what happened or what is true, not what to do. They live mostly in daily and meeting notes.

**`Ctrl+Alt+L`** inserts a `- [b]` log bullet; press it again on the same line to cycle the marker `[b] → [i] → [p] → [c] → [*]`. Change a marker that way (or by editing the character), not by clicking the box. The five markers split into two groups:

**Record**, the factual layer:

| Marker | Meaning | Feeds |
|---|---|---|
| `[i]` | information / state (a standing fact, present tense) | the knowledge graph: what is true |
| `[b]` | log / event (something that happened, past tense) | the timeline: what happened |

```markdown
- [i] [[Application A]] uses a REST API
- [i] [[Jane Doe]] plays [[Tennis]]
- [b] Decided to use REST for [[Application A]]
- [b] Played [[Tennis]] with [[Jane Doe]]
```

**Sentiment / emphasis**, how you read something:

| Marker | Meaning |
|---|---|
| `[p]` | positive |
| `[c]` | negative |
| `[*]` | highlight |

Logs are never "done" and never show on a task view: they are information, not work.

## Typed logs: the `#log/*` taxonomy

Some log kinds are worth querying as a class across the whole vault. Give those a nested tag under `#log/`, in addition to their marker. The tag is **opt-in**: an ordinary log needs only its marker; add a tag only when the kind forms a class you want to pull together.

| Kind | Marker + tag | Why that marker |
|---|---|---|
| Decision | `- [b] #log/decision Go REST-first [[Project - Website]]` | a decision is an event |
| Risk | `- [c] #log/risk Legacy SOAP endpoint may block the timeline [[Project - Website]]` | a risk is a flagged concern |

The marker and the tag do different jobs: the **marker** sets the family and the icon; the **tag** sets the semantic class for cross-cutting queries. They are orthogonal, which is why decision and risk draw from different markers but share the `#log/` namespace. Query all decisions with `#log/decision`, everything typed with `#log/*`.

To keep these cheap to write, two commands insert the whole prefix for you: **Log decision** drops `- [b] #log/decision` on the line, **Log risk** drops `- [c] #log/risk`, cursor left ready for the text. See [[Hotkeys]].

Major decisions can be promoted to their own `type: decision` note (context, rationale, date), ADR-style: the same capture-cheap, promote-what-matters move as the rest of the vault.

## The linking rule (why any of this rolls up)

Name the entities an item touches with wikilinks. A log that names `[[Project - Website]]` and `[[Jane Doe]]` surfaces on **both** of those notes. There are two ways a log reaches a note:

1. **The line links the note**: `[i] Prefers REST [[Project - Website]]`.
2. **The log's note declares the note as its parent**: a meeting note with `up: [[Project - Website]]` rolls *all* of its logs up to that project.

So a log written in a meeting note reaches the project through the meeting's `up`, without you having to link the project on every line. The task reference lines in that meeting travel the same way, so the project's log trail shows which tasks came out of the meeting.

Task notes follow their own properties instead: a task reaches a project or Area through its `up:` and a person through its `assignees:`, wherever it was captured.

## Querying

Two engines, split by what they query:

- **Bases** (`System/Bases/Tasks.base`) handles every task view: the dashboard, the project, Area and person boards, and the journal sections. Task notes are notes with properties, which is exactly what Bases queries.

- **Dataview** handles the log rollups on project, person and journal notes. The standard pattern is:

  ```dataview
  TASK
  WHERE contains(list("b", "i", "p", "c", "*"), status) OR (status = "t" AND contains(tags, "#task"))
  WHERE contains(outlinks, [[]]) or contains(up, [[]])
  GROUP BY file.name as Source
  SORT Source DESC
  ```

  The first `WHERE` keeps the five log markers plus task reference lines (`t` lines tagged `#task`); other checked lines are left out. `contains(outlinks, [[]])` catches lines that link this note; `contains(up, [[]])` catches lines in notes parented to it. Logs are grouped by source note, and because daily and meeting notes are named with a date prefix, that grouping sorts chronologically for free.

  Dataview treats every marker other than a space as *checked*, but only `x` as *completed*. When you write your own query, filter on an explicit list of markers, as above, rather than on "completed".

## The Advanced log widget

The project and person templates show the plain log rollup above (always visible), and below it a collapsible **Advanced log** browser (a `dataviewjs` widget) for when you need to filter or export. It is collapsed by default; click *Advanced log* to open it. The open/closed state is remembered per note. It shows the same lines that reach the host note (link-scoped by outlink or `up`) and adds live controls on top:

- **Marker toggles**: show or hide each log marker (`[b]` `[i]` `[p]` `[c]` `[*]`), plus an `x` toggle for task reference lines. The `x` toggle is off by default; turn it on to see the tasks captured about this note in the timeline.
- **Text search**: matches the whole line, including any `#log/` tag, so typing `decision` pulls up every `#log/decision` item.
- **Date range**, a **Limited folder search** switch (only `Calendar/` notes), sort order, **Reset filters**, and a **Copy results** button (Markdown to clipboard; task reference lines are copied as `#task <title>`). All settings persist per note.

The weekly note keeps its own date-scoped decisions query for the "what got decided this week" view.

The widget lives at `System/Templates/Templater/Sub-templates/Dataview queries/Advanced log template.md` and is pulled into the project and person templates with `tp.file.include`.

## See also

- [[working-with-projects]]: how projects, meetings, and people wire these items together.
- [[Hotkeys]]: the capture and log keys.
