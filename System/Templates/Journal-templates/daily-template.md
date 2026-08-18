---
type: daily
journal: daily
journal-date: <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
created-date: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
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
> ```tasks
> created <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD")%>
> short
> hide tags
> ```

> [!done]- Tasks completed today
> ```tasks
> done <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD")%>
> short
> ```

**Due**
```tasks
not done
happens on or before <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
sort by urgency
group by due
short
hide tags
```

**Upcoming tasks**
> [!todo]- Upcoming 2 weeks
> ```tasks
> not done
> happens after <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
> happens before <% moment(tp.file.title, "YYYY-MM-DD").add(14, "days").format("YYYY-MM-DD") %>
> sort by due
> group by due
> short
> hide tags
> ```

---
## Meetings & sessions
> [!Summary]+ Logs and tasks from today's meetings and work sessions
> ```dataview
> task
> From "Calendar/Meetings" or "Calendar/Work Sessions"
> where dateformat(date, "yyyy-MM-dd") = dateformat(this.date, "yyyy-MM-dd")
> group by file.name as source
> sort date asc
> ```

![[Calendar.base#Daily rollup]]
