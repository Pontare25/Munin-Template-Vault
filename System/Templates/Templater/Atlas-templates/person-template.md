---
type: person
date_created: <% tp.date.now("YYYY-MM-DD[T]HH:mm") %>
date_modified:
birthday:
up:
related:
skills:
interests:
summary:
aliases:
location:
tags:
---
# <% tp.file.title %>
<%* await tp.file.move("Atlas/Entities/People/" + tp.file.title) -%>

## Last contact
```dataview
TABLE WITHOUT ID
file.link AS "Contact note",
dateformat(file.day, "yyyy-MM-dd") + ": **" + round(T) + " days**" AS "Last contact"
FROM [[]]
FLATTEN (date(today) - file.day).days as T
SORT file.day desc
LIMIT 1
```
## Tasks
![[Tasks.base#Person open]]

> [!done]- Closed tasks
> ![[Tasks.base#Person closed]]
## Log
```dataview
TASK
WHERE contains(list("b", "i", "p", "c", "*"), status) OR (status = "t" AND contains(tags, "#task"))
WHERE contains(outlinks, [[]]) or contains(up, [[]])
GROUP BY file.name as Source
SORT Source DESC
```
<% tp.file.include("[[Advanced log template]]") %>
## Meetings
![[Meetings.base#People meetings]]

## Related notes
![[Notes.base#Related notes]]

## About
`INPUT[textArea:summary]`

<% tp.file.cursor() %>