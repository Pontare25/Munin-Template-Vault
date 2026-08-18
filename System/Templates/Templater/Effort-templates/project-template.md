---
type: project
status: active
created-date: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
updated:
up:
related:
people:
start-date: <% tp.date.now("YYYY-MM-DD") %>
due-date:
end-date:
aliases:
  - <% tp.file.title %>
summary:
---
# <% tp.file.title %>
<%* await tp.file.move("Efforts/Projects/" + tp.file.title + "/" + tp.file.title) -%>
<%* await tp.file.rename("Project - "+ tp.file.title) -%>

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
- [ ] #task Kick-off the project

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

<% tp.file.cursor() %>