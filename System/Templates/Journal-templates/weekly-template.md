---
type: weekly
journal: weekly
journal-date: <% moment(tp.file.title, "GGGG-[W]WW").startOf("isoWeek").format("YYYY-MM-DD") %>
created-date: <% tp.date.now("YYYY-MM-DD HH:mm") %>
date: <% moment(tp.file.title, "GGGG-[W]WW").startOf("isoWeek").format("YYYY-MM-DD") %>
tags:
summary:
---
# Week <% moment(tp.file.title, "GGGG-[W]WW").format("W, GGGG") %>
```calendar-nav 
```

## Weekly Summary
`INPUT[textArea:summary]`

---
## Rollup
Week <% moment(tp.file.title, "GGGG-[W]WW").startOf("isoWeek").format("MMM D") %> – <% moment(tp.file.title, "GGGG-[W]WW").endOf("isoWeek").format("MMM D") %>

### Tasks

> [!done]- Completed this week
> ```tasks
> done on or after <% moment(tp.file.title, "GGGG-[W]WW").startOf("isoWeek").format("YYYY-MM-DD") %>
> done on or before <% moment(tp.file.title, "GGGG-[W]WW").endOf("isoWeek").format("YYYY-MM-DD") %>
> short
> hide tags
> ```

> [!todo]- Created this week
> ```tasks
> created on or after <% moment(tp.file.title, "GGGG-[W]WW").startOf("isoWeek").format("YYYY-MM-DD") %>
> created on or before <% moment(tp.file.title, "GGGG-[W]WW").endOf("isoWeek").format("YYYY-MM-DD") %>
> short
> hide tags
> ```

> [!todo]+ Still open (due by end of week)
> ```tasks
> not done
> happens on or before <% moment(tp.file.title, "GGGG-[W]WW").endOf("isoWeek").format("YYYY-MM-DD") %>
> sort by urgency
> group by due
> short
> hide tags
> ```

### Logs & decisions this week
> [!note]- All logs this week (grouped by day)
> ```dataview
> TASK
> FROM "Calendar"
> WHERE file.day >= date("<% moment(tp.file.title, "GGGG-[W]WW").startOf("isoWeek").format("YYYY-MM-DD") %>") AND file.day <= date("<% moment(tp.file.title, "GGGG-[W]WW").endOf("isoWeek").format("YYYY-MM-DD") %>")
> WHERE contains(list("b", "i", "p", "c", "*"), status)
> GROUP BY file.link AS "Source"
> SORT file.name ASC
> ```

**Decisions**
```dataview
TASK
FROM "Calendar"
WHERE file.day >= date("<% moment(tp.file.title, "GGGG-[W]WW").startOf("isoWeek").format("YYYY-MM-DD") %>") AND file.day <= date("<% moment(tp.file.title, "GGGG-[W]WW").endOf("isoWeek").format("YYYY-MM-DD") %>")
WHERE contains(text, "#log/decision")
SORT file.name ASC
```

### Meetings this week
![[Meetings.base#Weekly meeting rollup]]

---
## Weekly Review

<% tp.file.cursor() %>

**Wins**
- 

**Misses**
- 

**Decisions** (Anything worth promoting to a `type: decision` note?)
- 

---
## Next week
**Top 3 priorities**
1. 
2. 
3. 
