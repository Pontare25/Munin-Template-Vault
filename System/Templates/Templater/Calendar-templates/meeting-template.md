---
type: meeting
created-date: <% tp.date.now("YYYY-MM-DD HH:mm") %>
date: <% tp.system.prompt("Meeting date (YYYY-MM-DD)", tp.date.now("YYYY-MM-DD")) %>
up:
attendees:
related:
summary:
---
# <% tp.file.title %>
<%* await tp.file.move("Calendar/Meetings/" + tp.file.title) -%>
**Attendees:**`VIEW[{attendees}][link]`
## Agenda


## Notes

<% tp.file.cursor() %>

## Decision log
%% `Ctrl+L` for an empty checkbox, then select log type `[b]` standard log / event · `[i]` fact · `[p]` + · `[c]` − · `[*]` highlight. 
Link `[[entities]]` such as projects and people so items are traceable using dataview queries. 
Record a decision as an event log tagged for query: - [b] #log/decision Go REST-first `[[Project]]` %%


## Tasks
%% new task `Ctrl+Shift+L` to open the create new tasks window which auto tag the task with  `#task` . It is recommended to create tasks in the log section above or in meeting notes %%


