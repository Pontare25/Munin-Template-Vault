---
type: monthly
journal: monthly
journal-date: <% moment(tp.file.title, "YYYY-MM").startOf("month").format("YYYY-MM-DD") %>
created-date: <% tp.date.now("YYYY-MM-DD HH:mm") %>
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
![[Journals.base#Monthly-rollup]]


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
> [!note]- Log & decision rollup
> *Placeholder — month-scoped log/decision rollup TODO. See the weekly template for the daily-grained Dataview pattern to adapt.*

---
## Next month
**Priorities**
1. 
2. 
3. 
