<%*
const dt = await tp.system.prompt("Meeting datetime (YYYY-MM-DD HH:mm)", tp.date.now("YYYY-MM-DD HH:mm"));
const m = moment(dt, "YYYY-MM-DD HH:mm");
const folder = `Calendar/Meetings/${m.format("GGGG")}/w${m.format("WW")}`;
const newTitle = `${m.format("YYYY-MM-DD")} ${tp.file.title}`;
await tp.file.move(`${folder}/${newTitle}`);
-%>
---
type: meeting
created-date: <% tp.date.now("YYYY-MM-DD HH:mm") %>
date: <% dt %>
up:
attendees:
related:
summary:
---
# <% newTitle %>
**Attendees:**`VIEW[{attendees}][link]`
## Agenda


## Notes

<% tp.file.cursor() %>

## Decision log
%% `Ctrl+Shift+L` inserts a `- [b]` log bullet; press again to cycle `[b] → [i] → [p] → [c]`. Markers: `[b]` log / event · `[i]` fact · `[p]` + · `[c]` − · `[*]` highlight. 
Link `[[entities]]` such as projects and people so items are traceable using dataview queries. 
Record a decision as an event log tagged for query: - [b] #log/decision Go REST-first `[[Project]]` %%


## Tasks
%% new task `Ctrl+Shift+T` to open the create new tasks window which auto tag the task with  `#task` . It is recommended to create tasks in the log section above or in meeting notes %%


