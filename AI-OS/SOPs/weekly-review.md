---
type: sop
version: 1
summary: Weekly clearing of overdue and waiting tasks, people follow-ups, AI notes, a scoped lint and lessons, then fill the week's wins, misses and top 3
---

# SOP: Weekly Review

Clear what slipped through the week and set up the next one. Run it once a week, ideally Friday afternoon or Monday morning.

**Trigger:** the human says "weekly review", "review my week", or on the weekly cadence.

## Steps

1. **Open the weekly note of the week under review** (on a Monday, the week that just ended; otherwise this week) in `Calendar/Weekly Notes/YYYY/`, filed by the Journals plugin as `YYYY-Www`. Create it from the weekly template if it does not exist.
2. **List task loops.** Read them from frontmatter, as in the Tasks.base views. Show overdue tasks (`date_due` before today, `status` not `done` or `dropped`), waiting tasks (a waiting task's `date_due` is its chase date; flag those due or past due) and the Tasks.base view "Stale 14 days". Do not change them.
3. **People follow-up.** List the person notes named in `assignees:` of, or linked from, open or waiting tasks. One line each: the person, the task, what to ask.
4. **Drain AI notes.** Open the Notes.base view "AI notes awaiting review". Take five notes with `ai: pending`, oldest first. Show each (summary and body). The human picks approved, fix or leave. Set `ai: approved` only on an approve, apply a fix when asked, and leave the rest untouched.
5. **Run a scoped lint** on the notes changed this week via [[lint]] (scoped mode). Write one summary line to the [[AI-OS/log|log]].
6. **Retro to Atlas.** Read the weekly note's Wins and Misses, the week's `#log/decision` lines and `[i]` lines. Propose Atlas notes for lessons worth keeping; create only the approved ones via [[new-note]].
7. **Stale-claim check.** Compare `AI-OS/state.md` (Open threads, Pending decisions) and the Lessons in `AI-OS/memory.md` against the week's daily and meeting notes. Report claims that look superseded. Never edit without approval.
8. **Goal drift.** Report active Areas with no active project (the red flag in [[AoR Review]]). Set the free-text priorities in the latest quarterly note and last week's Top 3 against what the week's notes show.
9. **Capture system friction.** Read the **System friction** line in the weekly note. For each item add one Inbox line to `AI-OS/memory.md`: `YYYY-MM-DD | neg | weekly friction | text`. The next fold routes it.
10. **Fill the note with the human.** Wins, Misses, a "Carries forward" list (open items that move into next week) and next week's Top 3 priorities. Write what the human says; suggest, never invent.
11. **Log it:** one entry `## [YYYY-MM-DD] weekly-review | YYYY-Www` with bullets for notes approved, notes created, friction lines captured and claims flagged.

## Output

A filled weekly note (Wins, Misses, Carries forward, Top 3), up to five AI notes resolved, lessons filed in Atlas, friction in the memory Inbox, and the step 11 log entry.

## Judgment calls

- Overdue is information, not guilt. Ask whether each task should be done, moved or dropped; change only on a yes.
- A quiet week is fine. Skip a step that has nothing to show and say so in one line.
- Goal drift is a question to the human, not a verdict.

## Manual checklist (without an AI)

1. Open this week's weekly note.
2. In Tasks.base read "Overdue", "Waiting" and "Stale 14 days"; decide each: do, move, chase or drop.
3. Message the people your open tasks wait on.
4. In Notes.base open "AI notes awaiting review"; read five and set `ai:` to `approved` or fix them.
5. Look through the week's changed notes for broken links and missing `up:`.
6. Turn lessons from Wins, Misses and `#log/decision` lines into Atlas notes.
7. Check Areas with no active project against your priorities.
8. Fill Wins, Misses, Carries forward and next week's Top 3.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
