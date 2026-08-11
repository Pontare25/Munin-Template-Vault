---
type: project
status: active
created-date: 2026-08-11
description: Example project, part of the logging-system worked example. Safe to delete.
up:
related: "[[Product Development]]"
members:
start-date:
due-date:
end-date:
---
# Project Muninize

## Goal

Ship the first Munin integration MVP.

## Next actions

- [ ] #task Define MVP scope ➕ 2026-08-11
- [/] #task Set up the repository ➕ 2026-08-11

## Meetings

![[Meetings.base#Project meetings]]

## Tasks from meetings & logs

```dataview
TASK
WHERE contains(text, "#task")
WHERE contains(list(" ", "/", "!", ">", "?"), status)
WHERE contains(this.file.inlinks, file.link)
SORT file.mtime DESC
```

## Log

```dataview
TASK
WHERE contains(list("b", "i", "p", "c", "*"), status)
WHERE contains(outlinks, [[]]) or contains(up, [[]])
GROUP BY file.name as Source
SORT Source DESC
```
