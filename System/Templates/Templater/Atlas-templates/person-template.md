<%* await tp.file.move("Atlas/Entities/" + tp.file.title) -%>
---
type: person
created-date: <% tp.date.now("YYYY-MM-DD[T]HH:mm:ss") %>
description:
up:
related:
---
# <% tp.file.title %>

## How we met

<% tp.file.cursor() %>

## Meetings

![[Meetings.base#Attendee meetings]]

## Tasks involving them

```dataview
TASK
WHERE contains(text, "#task")
WHERE contains(list(" ", "/", "!", ">", "?"), status)
WHERE contains(outlinks, [[]]) or contains(up, [[]])
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
