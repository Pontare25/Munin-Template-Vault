---
type: project
status: active
created-date: <% tp.date.now("YYYY-MM-DD[T]HH:mm:ss") %>
description:
up:
related:
members:
start-date:
due-date:
end-date:
---
# <% tp.file.title %>
<%* await tp.file.move("Efforts/Projects/" + tp.file.title) -%>

## Goal

<% tp.file.cursor() %>

## Next actions

- [ ] #task 

### Tasks from meetings & logs

```dataview
TASK
WHERE contains(text, "#task")
WHERE contains(list(" ", "/", "!", ">", "?"), status)
WHERE contains(outlinks, [[]]) or contains(up, [[]])
SORT file.mtime DESC
```

## Meetings

![[Meetings.base#Project meetings]]

## Log

```dataview
TASK
WHERE contains(list("b", "i", "p", "c", "*"), status)
WHERE contains(outlinks, [[]]) or contains(up, [[]])
GROUP BY file.name as Source
SORT Source DESC
```
