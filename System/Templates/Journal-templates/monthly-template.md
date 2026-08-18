---
type: monthly
journal: monthly
journal-date: <% moment(tp.file.title, "YYYY-MM").startOf("month").format("YYYY-MM-DD") %>
created-date: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date: <% moment(tp.file.title, "YYYY-MM").startOf("month").format("YYYY-MM-DD") %>
tags:
summary:
---
# <% moment(tp.file.title, "YYYY-MM").format("MMMM YYYY") %>
```calendar-nav 
```

## Monthly Summary
`INPUT[textArea:summary]`
## Monthly Review
**Wins**
- <% tp.file.cursor() %>

**Misses**
- 

**Decisions & themes**
- 

---

## Monthly Rollup
### Weeks this month
![[Journals.base#Monthly-rollup]]

### Days this month
![[Journals.base#Monthly-daily-rollup]]

### Tasks

> [!done]- Completed this month
> ```tasks
> done on or after <% moment(tp.file.title, "YYYY-MM").startOf("month").format("YYYY-MM-DD") %>
> done on or before <% moment(tp.file.title, "YYYY-MM").endOf("month").format("YYYY-MM-DD") %>
> short
> hide tags
> ```

> [!todo]- Created this month
> ```tasks
> created on or after <% moment(tp.file.title, "YYYY-MM").startOf("month").format("YYYY-MM-DD") %>
> created on or before <% moment(tp.file.title, "YYYY-MM").endOf("month").format("YYYY-MM-DD") %>
> short
> hide tags
> ```

> [!todo]+ Still open (due by end of month)
> ```tasks
> not done
> happens on or before <% moment(tp.file.title, "YYYY-MM").endOf("month").format("YYYY-MM-DD") %>
> sort by urgency
> group by due
> short
> hide tags
> ```

### Logs & decisions this month
> [!note]- All logs this month (grouped by week)
> ```dataview
> TASK
> FROM "Calendar"
> WHERE file.day >= date("<% moment(tp.file.title, "YYYY-MM").startOf("month").format("YYYY-MM-DD") %>") AND file.day <= date("<% moment(tp.file.title, "YYYY-MM").endOf("month").format("YYYY-MM-DD") %>")
> WHERE contains(list("b", "i", "p", "c", "*"), status)
> GROUP BY dateformat(file.day, "'W'WW") AS "Week"
> SORT file.day ASC
> ```

**Decisions**
```dataview
TASK
FROM "Calendar"
WHERE file.day >= date("<% moment(tp.file.title, "YYYY-MM").startOf("month").format("YYYY-MM-DD") %>") AND file.day <= date("<% moment(tp.file.title, "YYYY-MM").endOf("month").format("YYYY-MM-DD") %>")
WHERE contains(text, "#log/decision")
SORT file.day ASC
```

### Meetings & sessions this month
![[Calendar.base#Monthly rollup]]

---
## Next month
**Priorities**
1. 
2. 
3. 
