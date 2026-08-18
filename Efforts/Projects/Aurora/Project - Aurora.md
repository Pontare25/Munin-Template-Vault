---
type: project
status: active
created-date: 2026-08-17T09:00
updated: 2026-08-19
up:
related:
  - "[[Product Development]]"
people:
  - "[[Erik Lund]]"
  - "[[Johan Nyberg]]"
  - "[[Mia Karlsson]]"
start-date: 2026-08-17
due-date: 2026-09-30
end-date:
aliases:
  - Aurora
summary: Rebuild of the customer portal. Worked example for the daily-note workflow test.
---
# Aurora

## Last update
```dataview
TABLE WITHOUT ID
file.link AS "Last touched in",
dateformat(file.day, "yyyy-MM-dd") + ": **" + round(T) + " days ago**" AS "Last update"
FROM [[]]
WHERE file.day
FLATTEN (date(today) - file.day).days as T
SORT file.day desc
LIMIT 1
```

## Tasks and Questions
> [!todo]+ Open
> ```dataview
> task
> WHERE contains(outlinks, [[]]) or contains(up, [[]]) or file.path = this.file.path
> WHERE contains(list(" ", "?", "!", "/", ">"), status)
> Group by file.name as Source
> SORT Source Desc 
> ```

> [!done]- Closed
> ```dataview
> task
> WHERE contains(outlinks, [[]]) or contains(up, [[]]) or file.path = this.file.path
> WHERE contains(list("x", "-"), status)
> Group by file.name as Source
> SORT Source Desc 
> ```
### Next actions
- [ ] #task Lock the portal information architecture [[Project - Aurora]] ➕ 2026-08-17 📅 2026-08-21
- [/] #task Stand up the staging environment [[Project - Aurora]] ➕ 2026-08-17

## Related
### Logs
```dataview
TASK
WHERE contains(outlinks, [[]]) or contains(up, [[]])
WHERE contains(list("b", "i", "p", "c", "*"), status)
GROUP BY file.name as Source
SORT Source DESC
```
### Meetings
![[Meetings.base#Project meetings]]
### Work sessions
![[Sessions.base#Project sessions]]
### Sub Projects
![[Projects.base#Sub projects]]

### Child Notes
![[Notes.base#Child notes]]

### Related Notes
![[Notes.base#Related notes]]

## Goal

Ship a rebuilt customer portal with a modern auth stack and a faster page load budget.
