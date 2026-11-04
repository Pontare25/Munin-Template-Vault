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

**Due**
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
