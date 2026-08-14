---
type: daily
created-date: <% tp.date.now("YYYY-MM-DD HH:mm") %>
date: <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
summary:
---
# <% moment(tp.file.title, "YYYY-MM-DD").format("dddd, MMMM D YYYY") %>
<%tp.web.daily_quote() %>

```calendar-nav 
```
## Summary
`INPUT[textArea:summary]`

---
## Today's top 3
1. 
2. 
3. 
---
## Logs
> [!info]- Creating traceable logs
> `Ctrl+L` for an empty checkbox, then select log type `[b]` standard log / event · `[i]` fact · `[p]` + · `[c]` − · `[*]` highlight. 
> Link `[[entities]]` such as projects and people so items are traceable using dataview queries. 
> The periods below double as your time-box. 


**Morning**
- 

**Afternoon**
- 

**Evening**
- 

---
## Brain dump
- 


---
## Tasks
> [!info]- Creating new tasks
> Create a new task by clicking `Ctrl+Shift+L` to open the create new tasks window which auto tag the task with  `#task` . It is recommended to create tasks in the log section above or in meeting notes 

**Due**
```tasks
not done
happens on or before <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
sort by urgency
group by due
hide task count
short
```

**Upcoming tasks**
> [!todo]- Upcoming 2 weeks
> ```tasks
> not done
> happens after <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
> happens before <% moment(tp.file.title, "YYYY-MM-DD").add(14, "days").format("YYYY-MM-DD") %>
> sort by due
> group by due
> hide task count
> short
> ```


---
## Meetings
![[Meetings.base#Daily meeting rollup]]
