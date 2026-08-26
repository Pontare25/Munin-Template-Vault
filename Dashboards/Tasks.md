---
type: dashboard
created-date: 2026-08-26
summary: Vault-wide task dashboard — every open task across all notes, grouped by when it needs attention.
cssclasses:
  - callouts-outlined
---
# Tasks

Every open task in the vault, pulled together in one place. Tasks are collected from wherever you wrote them — daily notes, meetings, projects, work sessions. Nothing here is entered by hand; open a section and act on what's inside.

> [!info]- How this works
> These queries read every checkbox in the vault except the templates in `System/`. A task's *status symbol* sets its family (`/` in progress, `!` important, `>` handed to someone else, `?` open question); its *dates* (`📅` due, `⏳` scheduled, `🛫` start) set when it surfaces here. See [[tasks-and-logs]] for how to write them.

## Needs attention

> [!important]+ Important or in progress
> ```tasks
> path does not include System
> not done
> filter by function (["!", "/"].includes(task.status.symbol)) || ["High", "Highest"].includes(task.priorityName)
> sort by urgency
> group by function task.filename
> hide task count
> short
> ```

> [!failure]- Overdue
> ```tasks
> path does not include System
> not done
> happens before today
> sort by due
> group by function task.filename
> hide task count
> short
> ```

> [!success]- Due today
> ```tasks
> path does not include System
> not done
> happens today
> sort by due
> hide task count
> short
> ```

> [!todo]- This week
> ```tasks
> path does not include System
> not done
> happens after yesterday
> happens before in 1 week
> sort by happens
> group by happens
> hide task count
> short
> ```

> [!caution]- Next week
> ```tasks
> path does not include System
> not done
> happens next week
> sort by happens
> group by happens
> hide task count
> short
> ```

## Waiting & open loops

> [!example]- Handed to someone else
> ```tasks
> path does not include System
> filter by function task.status.symbol === '>'
> group by function task.filename
> hide task count
> short
> ```

> [!question]- Open questions
> ```tasks
> path does not include System
> filter by function task.status.symbol === '?'
> group by function task.filename
> hide task count
> short
> ```

> [!error]- Needs scheduling (no date)
> ```tasks
> path does not include System
> not done
> (no due date) AND (no scheduled date) AND (no start date)
> sort by path
> group by function task.filename
> hide task count
> short
> ```

## Everything open

> [!note]- All open tasks, by note
> ```tasks
> path does not include System
> not done
> group by function task.filename
> hide task count
> short
> ```

## Recently done

> [!done]- Last 20 completed
> ```tasks
> path does not include System
> done
> sort by done reverse
> limit 20
> hide task count
> hide tags
> short
> ```
