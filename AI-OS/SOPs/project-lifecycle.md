---
type: sop
version: 1
summary: Start a project with a goal and a first next action, check that no project is stuck, and close it with a retro
---

# SOP: Project Lifecycle

Three moments in a project's life: start, the next action check and close. Run the one that matches. The aim is that every project has a goal while it runs, always has a next action, and leaves its lessons behind when it ends.

**Trigger:** "start a project", "close this project", "project retro", or a project with no open task.

## Start

1. **Create the note from the project template.** The template asks Work and personal or Learning, then the parent project or Area. Ask the human to run it (`Ctrl+N`, name the note, click **Promote note**, choose project), or create the note through Obsidian with that template. Do not write the project note by hand: the template files it in the right folder.
2. **Confirm `up:` and `area:`.** `up:` is the parent project or the Area; `area:` is the top-level Area as a one-item list. Fix a missing one with the human's say-so, using [[note-schema]].
3. **Set a Goal.** Ask the human for one or two sentences on what done looks like, and write them under `## Goal`. If the human wrote text there already, leave it.
4. **Create the first next-action task.** Ask for the one concrete step that starts the work. Create a task note as the New task command does: `type: task`, `title`, `status: backlog`, `contexts` (ask: personal or work), `up:` the project, `origin:` the project, and `area:` copied from the project. Field rules are in [[note-schema-reference]]. File it as `Efforts/TaskNotes/Tasks/task - <title>.md`.

## Next action check

Run this any time, and from [[weekly-review]]. A project that is `active` or `waiting` with no open task is stuck.

1. **List the stuck projects.** Use the **No open task** view in `System/Bases/Projects.base`, or find projects whose tasks are all `done` or `dropped`.
2. **Offer one fix per project:** a new next-action task (as in Start, step 4), or a status change (`backlog` if paused, `done` or `dropped` if over). The human picks. Changing a status the human set needs their approval.

## Close

1. **Close the project.** Ask the human to run the **Close project** command on the project note. It asks Done or Dropped, sets `status:` and `date_end:` to today, and jumps to `## Retro`. If you cannot run it, set the same two fields yourself, with the human's approval.
2. **Fill the Retro.** Ask what worked and what to change, and write both under `## Retro`. Mark your section `%% #AI-Assisted %%` if the human wrote text there.
3. **Propose lessons for the Atlas.** Read the Retro and the project's `## Log` for lessons that outlast the project: a method that worked, a decision with its reason, a mistake not to repeat. Show the list. For each one the human approves, create the note by [[new-note]].
4. **Settle the open tasks.** List the project's open tasks and ask per batch: drop, move to another project (change `up:` and `area:`), or keep as they are. Closing a project does not touch its tasks without this answer.
5. **Leave the note where it is.** It moves to `Archive/` at the next [[monthly-review]], through Obsidian, with a batch approval.
6. **Log it** in [[AI-OS/log|log]].

## Output

A started project with a goal and a first task; a list of stuck projects each with a fix; or a closed project with a filled Retro, proposed Atlas notes and its tasks settled. Log entry: `## [YYYY-MM-DD] project | <start, check or close> <project>`, with one bullet per task or lesson created.

## Judgment calls

- A project with no goal the human can state is probably an Area task or a single task. Say so before creating it.
- A small project may have no lessons worth an Atlas note. Skip step 3 then; do not invent any.
- `waiting` with an open task assigned to someone else is not stuck.

## Manual checklist (without an AI)

1. Start: promote a fleeting note to a project, check `up:` and `area:`, write the Goal, add the first task with `Ctrl+Alt+T` and pick the project.
2. Check: open `System/Bases/Projects.base`, view **No open task**, add a task or change the status of each project listed.
3. Close: run **Close project** on the note, write the Retro, copy lasting lessons into Atlas notes, then drop, move or keep each open task.
4. The note stays in place until the monthly review moves it to `Archive/`.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
