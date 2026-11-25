---
type: sop
version: 3
summary: Start a project with a goal and a first next action, check that no project is stuck, and close it with a retro
---

# SOP: Project Lifecycle

Three moments in a project's life: start, the next action check and close. Run the one that matches. The aim is that every project has a goal while it runs, always has a next action, and leaves its lessons behind when it ends.

**Trigger:** "start a project", "close this project", "project retro", or a project with no open task.

## Start

1. **Create the note from the project template.** The template asks Work, Personal or Learning, then where the project sits. Ask the human to run it (`Ctrl+N`, name the note, click **Promote note**, choose project), or create the note through Obsidian with that template. Do not write the project note by hand: the template files it in the right folder. A command such as **Promote note** acts on the active note, so before you run one, open the new note and confirm it is the active file (`obsidian eval` on `app.workspace.getActiveFile().path`). Never run an active-file command blind. If the human already gave the name, kind or placement in chat, tell them which answers the pop-ups will ask for so they can click through.
2. **Confirm `up:`.** It is the parent project or the Area. Fix a missing one with the human's say-so, using [[note-schema]].
3. **Set a Goal and a summary.** Ask the human for one or two sentences on what done looks like, and write them under `## Goal`. If the human wrote text there already, leave it. Fill `summary:` with one line drawn from the Goal (no colons, per [[note-schema]]).
4. **Create the first next-action task.** Ask for the one concrete step that starts the work. Create a task note as the New task command does: `type: task`, `title`, `status: backlog`, `contexts` (the project's top-level Area, lowercase), `up:` the project, and `origin:` the note the task was created in, the daily, meeting or work-session note where the human started the project (the note step 5 logs in), never the project itself. Field rules are in [[note-schema-reference]]. File it as `Efforts/TaskNotes/Tasks/task - <title>.md`.
5. **Log the start** in that same daily, meeting or work-session note: a `- [b]` line naming the project as a wikilink, with the first task on its own tab-indented sub-bullet beneath it, `- [t] [[task - <title>|<title>]]`. Never write the task into the `[b]` line itself. Set `date_modified` on the note.

## Next action check

Run this any time, and from [[weekly-review]]. A project that is `active` or `waiting` with no open task is stuck.

1. **List the stuck projects.** Use the **No open task** view in `System/Bases/Projects.base`, or find projects whose tasks are all `done` or `dropped`.
2. **Offer one fix per project:** a new next-action task (as in Start, step 4), or a status change (`backlog` if paused, `done` or `dropped` if over). The human picks. Changing a status the human set needs their approval.

## Close

1. **Close the project.** Ask the human to set Status to done or dropped at the top of the note and the end date under `## Retro`. If they cannot, set `status:` and `date_end:` yourself, with their approval.
2. **Fill the Retro.** Ask what worked, what to change and which lessons to keep; add them to the Retro lists `retro_worked:`, `retro_change:` and `retro_lessons:`. Set `date_modified` on the project note.
3. **Propose lessons for the Atlas.** Read the Retro and the project's `## Log` for lessons that outlast the project: a method that worked, a decision with its reason, a mistake not to repeat. Show the list. For each one the human approves, create the note by [[new-note]].
4. **Settle the open tasks.** List the project's open tasks and ask per batch: drop, move to another project (change `up:`), or keep as they are. Closing a project does not touch its tasks without this answer.
5. **Leave the note where it is.** It moves to `Archive/` at the next [[monthly-review]], through Obsidian, with a batch approval.
6. **Log it** in [[AI-OS/log|log]].

## Output

A started project with a goal and a first task; a list of stuck projects each with a fix; or a closed project with a filled Retro, proposed Atlas notes and its tasks settled. Log entry: `## [YYYY-MM-DD] project | <start, check or close> <project>`, with one bullet per task or lesson created.

## Judgment calls

- A project with no goal the human can state is probably an Area task or a single task. Say so before creating it.
- A small project may have no lessons worth an Atlas note. Skip step 3 then; do not invent any.
- `waiting` with an open task assigned to someone else is not stuck.

## Manual checklist (without an AI)

1. Start: promote a fleeting note to a project, check `up:`, write the Goal and a one-line summary. In today's daily note (or the meeting or work-session note you are in), write a `- [b]` line with the project link, then on a tab-indented line below it add the first task with `Ctrl+Alt+T` and pick the project. The task's `origin:` becomes that note.
2. Check: open `System/Bases/Projects.base`, view **No open task**, add a task or change the status of each project listed.
3. Close: set Status and the end date, fill the Retro lists, copy lasting lessons into Atlas notes, then drop, move or keep each open task.
4. The note stays in place until the monthly review moves it to `Archive/`.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
