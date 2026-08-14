---
type: daily
created-date: <% tp.date.now("YYYY-MM-DD HH:mm") %>
date: <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
---
# <% moment(tp.file.title, "YYYY-MM-DD").format("dddd, MMMM D YYYY") %>

## Today's top 3
1. 
2. 
3. 

## Log
%% `[b]` event · `[i]` fact · `[p]` + · `[c]` − · `[*]` highlight — link `[[entities]]` such as projects and people so items roll up. The periods below double as your time-box. %%
**Morning**
- 
**Afternoon**
- 
**Evening**
- 

## Brain dump
- 

## Tasks
%% new task: `Ctrl+L` for a checkbox, then `Ctrl+Shift+L` to tag `#task` %%
```tasks
not done
due on or before <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
sort by urgency
group by due
hide task count
short
```

## Meetings
![[Meetings.base#Daily meeting rollup]]
