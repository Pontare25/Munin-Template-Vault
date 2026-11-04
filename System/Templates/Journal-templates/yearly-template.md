---
type: yearly
journal: yearly
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
date: <% moment(tp.file.title, "YYYY").startOf("year").format("YYYY-MM-DD") %>
tags:
summary:
---
# <% moment(tp.file.title, "YYYY").format("YYYY") %>
```calendar-nav 
```

## Yearly Summary
`INPUT[textArea:summary]`
## Yearly Review
**Wins**
- <% tp.file.cursor() %>

**Misses**
- 

**Decisions & themes**
- 

**Goals for next year**
- 

---

## Yearly Rollup
### Quarters this year
![[Journals.base#Yearly-rollup]]

### Months this year
![[Journals.base#Yearly-months-rollup]]

### Tasks

> [!done]- Completed this year
> ![[Tasks.base#Period completed]]

> [!todo]- Created this year
> ![[Tasks.base#Period created]]

> [!todo]+ Still open (due by end of year)
> ![[Tasks.base#Period due]]

### Logs & decisions this year
> [!note]- All logs this year (grouped by month)
> ```dataview
> TASK
> FROM "Calendar"
> WHERE file.day >= date("<% moment(tp.file.title, "YYYY").startOf("year").format("YYYY-MM-DD") %>") AND file.day <= date("<% moment(tp.file.title, "YYYY").endOf("year").format("YYYY-MM-DD") %>")
> WHERE contains(list("b", "i", "p", "c", "*"), status) OR (status = "t" AND contains(tags, "#task"))
> GROUP BY dateformat(file.day, "yyyy-MM") AS "Month"
> SORT file.day ASC
> ```

**Decisions**
```dataview
TASK
FROM "Calendar"
WHERE file.day >= date("<% moment(tp.file.title, "YYYY").startOf("year").format("YYYY-MM-DD") %>") AND file.day <= date("<% moment(tp.file.title, "YYYY").endOf("year").format("YYYY-MM-DD") %>")
WHERE contains(text, "#log/decision")
SORT file.day ASC
```

### Meetings & sessions this year
![[Calendar.base#Yearly rollup]]

---
## Next year
**Priorities**
1. 
2. 
3. 
