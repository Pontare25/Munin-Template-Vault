---
type: person
created-date: 2026-08-17T09:00
birthday:
up:
related:
  - "[[Project - Borealis]]"
skills:
interests:
summary: Borealis data platform lead.
aliases:
location: Stockholm
tags:
---
# Sofia Marklund

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

## Tasks involving them
>
> [!todo]+ Open
> ```dataview
> TASK
> WHERE contains(outlinks, [[]]) or contains(up, [[]])
> WHERE contains(text, "#task")
> WHERE contains(list(" ", "/", "!", ">", "?"), status)
> Group by file.name as Source
> Sort Source desc
> ```

> [!Done]- Closed
> ```dataview
> TASK
> WHERE contains(outlinks, [[]]) or contains(up, [[]])
> WHERE contains(text, "#task")
> WHERE contains(list("x", "-"), status)
> Group by file.name as Source
> Sort Source desc
> ```
>
## Log

```dataview
TASK
WHERE contains(list("b", "i", "p", "c", "*"), status)
WHERE contains(outlinks, [[]]) or contains(up, [[]])
GROUP BY file.name as Source
SORT Source DESC
```

## Meetings

![[Meetings.base#People meetings]]

## Related notes

![[Notes.base#Related notes]]

## About

Leads the Borealis data platform migration and the ETL pipeline rebuild.
