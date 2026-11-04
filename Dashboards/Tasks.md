---
type: dashboard
date_created: 2026-08-26
summary: Vault-wide task dashboard. Every open task note, grouped by when it needs attention.
cssclasses:
  - callouts-outlined
---
# Tasks

Every open task in the vault, in one place. Each task is its own note in `Efforts/TaskNotes/Tasks`, wherever you created it (daily note, meeting, project). Nothing here is entered by hand; open a section and act on what's inside.

> [!info]- How this works
> Every section is a view in `System/Bases/Tasks.base`, so one change there updates every note that embeds it. A task's *status* sets its family (backlog, active, waiting, done, dropped); its *dates* (due, scheduled) set when it surfaces here. Overdue means a due date before today. Today means due today, or scheduled today or earlier. New tasks are scheduled for today by default, so "Needs a due date" lists open tasks without a due date. Handing a task to someone is status `waiting` plus an assignee. See [[tasks-and-logs]] for how to write them.

## Needs attention

> [!important]+ Active or high priority
> ![[Tasks.base#Needs attention]]

> [!failure]- Overdue
> ![[Tasks.base#Overdue]]

> [!success]- Today
> ![[Tasks.base#Today]]

> [!todo]- Next 7 days
> ![[Tasks.base#Next 7 days]]

## Waiting & open loops

> [!example]- Waiting on someone
> ![[Tasks.base#Waiting]]

> [!check]- Not blocked (free to start)
> ![[Tasks.base#Not blocked]]

> [!error]- Needs a due date
> ![[Tasks.base#No due date]]

> [!warning]- Open tasks in inactive projects
> ![[Tasks.base#Inactive project]]

## By area

> [!note]- Open tasks by area
> ![[Tasks.base#By area]]

## Recently closed

> [!done]- Last 20 completed
> ![[Tasks.base#Recently completed]]

> [!failure]- Last 20 dropped
> ![[Tasks.base#Recently dropped]]
