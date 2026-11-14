---
type: daily
journal: daily
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
date: <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
tags:
summary:
---
# <% moment(tp.file.title, "YYYY-MM-DD").format("dddd, MMMM D YYYY") %>
<%tp.web.daily_quote() %>

```dataviewjs
// Due strip: shows only on today's note, and prints nothing when nothing is due.
const cur = dv.current();
const today = dv.date("today");
if (cur.date && dv.date(cur.date).toISODate() === today.toISODate()) {
  const out = [];
  // Monday of last ISO week; weekly notes are found by frontmatter, not path.
  const mon = today.startOf("week").minus({ weeks: 1 }).toISODate();
  const hasWeekly = dv.pages('"Calendar"').where(p => p.type === "weekly" && p.date && dv.date(p.date).toISODate() === mon).length > 0;
  if (!hasWeekly) out.push("No weekly note for last week");
  // Overdue tasks already show in Next actions, so only waiting tasks past their chase date.
  const waiting = dv.pages('"Efforts/TaskNotes/Tasks"')
    .where(t => t.type === "task" && t.status === "waiting" && t.date_due && dv.date(t.date_due) < today);
  if (waiting.length) out.push(waiting.length + " waiting tasks past their chase date: " + waiting.map(t => t.file.link).join(", "));
  if (out.length) dv.paragraph(out.map(l => "**Due:** " + l).join("\n\n"));
}
```

```calendar-nav 
```
## Daily Summary
`INPUT[textArea:summary]`

---
## Brain dump
- 

## Today's top 3
1. 
2. 
3. 
---
## Logs
> [!info]- Creating traceable logs
> ![[Hotkeys#Logs]]
> Link `[[entities]]` such as projects and people so items are traceable using dataview queries. 
> The periods below double as your time-box. 

**Morning**


**Afternoon** 


**Evening**
 
## Tasks
> [!info]- Creating new tasks
> ![[Hotkeys#Tasks]]
> It is recommended to create tasks in the log section above or in meeting notes 

---
> [!todo]- Tasks created today
> ![[Tasks.base#Period created]]

> [!done]- Tasks completed today
> ![[Tasks.base#Period completed]]

**Next actions** (earliest due first; priority is only a flag)
![[Tasks.base#Period due]]

**Upcoming tasks**
> [!todo]- Upcoming 2 weeks
> ![[Tasks.base#Upcoming 2 weeks]]

---
## Meetings & sessions
> [!Summary]+ Logs and tasks from today's meetings and work sessions
> ```dataview
> task
> From "Calendar/Meetings" or "Calendar/Work Sessions"
> where dateformat(date_start, "yyyy-MM-dd") = dateformat(this.date, "yyyy-MM-dd")
> group by file.name as source
> sort date_start asc
> ```

![[Calendar.base#Daily rollup]]
