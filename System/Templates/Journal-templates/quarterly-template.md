---
type: quarterly
journal: quarterly
journal-date: <% moment(tp.file.title, "YYYY-[Q]Q").startOf("quarter").format("YYYY-MM-DD") %>
created-date: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date: <% moment(tp.file.title, "YYYY-[Q]Q").startOf("quarter").format("YYYY-MM-DD") %>
tags:
summary:
---
# <% moment(tp.file.title, "YYYY-[Q]Q").format("[Q]Q YYYY") %>
```calendar-nav 
```

## Quarterly Summary
`INPUT[textArea:summary]`
## Quarterly Review
**Wins**
- <% tp.file.cursor() %>

**Misses**
- 

**Decisions & themes**
- 

**Goals & bets for the quarter**
- 

---

## Quarterly Rollup
### Months this quarter
![[Journals.base#Quarterly-rollup]]

### Tasks

> [!done]- Completed this quarter
> ```tasks
> done on or after <% moment(tp.file.title, "YYYY-[Q]Q").startOf("quarter").format("YYYY-MM-DD") %>
> done on or before <% moment(tp.file.title, "YYYY-[Q]Q").endOf("quarter").format("YYYY-MM-DD") %>
> short
> hide tags
> ```

> [!todo]- Created this quarter
> ```tasks
> created on or after <% moment(tp.file.title, "YYYY-[Q]Q").startOf("quarter").format("YYYY-MM-DD") %>
> created on or before <% moment(tp.file.title, "YYYY-[Q]Q").endOf("quarter").format("YYYY-MM-DD") %>
> short
> hide tags
> ```

> [!todo]+ Still open (due by end of quarter)
> ```tasks
> not done
> happens on or before <% moment(tp.file.title, "YYYY-[Q]Q").endOf("quarter").format("YYYY-MM-DD") %>
> sort by urgency
> group by due
> short
> hide tags
> ```

### Logs & decisions this quarter
> [!note]- All logs this quarter (grouped by month)
> ```dataview
> TASK
> FROM "Calendar"
> WHERE file.day >= date("<% moment(tp.file.title, "YYYY-[Q]Q").startOf("quarter").format("YYYY-MM-DD") %>") AND file.day <= date("<% moment(tp.file.title, "YYYY-[Q]Q").endOf("quarter").format("YYYY-MM-DD") %>")
> WHERE contains(list("b", "i", "p", "c", "*"), status)
> GROUP BY dateformat(file.day, "yyyy-MM") AS "Month"
> SORT file.day ASC
> ```

**Decisions**
```dataview
TASK
FROM "Calendar"
WHERE file.day >= date("<% moment(tp.file.title, "YYYY-[Q]Q").startOf("quarter").format("YYYY-MM-DD") %>") AND file.day <= date("<% moment(tp.file.title, "YYYY-[Q]Q").endOf("quarter").format("YYYY-MM-DD") %>")
WHERE contains(text, "#log/decision")
SORT file.day ASC
```

### Meetings & sessions this quarter
![[Calendar.base#Quarterly rollup]]

---
## Next quarter
**Priorities**
1. 
2. 
3. 
