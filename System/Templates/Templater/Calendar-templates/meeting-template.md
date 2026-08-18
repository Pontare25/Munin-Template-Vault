<%*
const dt = await tp.system.prompt("Meeting datetime (YYYY-MM-DD HH:mm)", tp.date.now("YYYY-MM-DD HH:mm"));
const m = moment(dt, "YYYY-MM-DD HH:mm");
const folder = `Calendar/Meetings/${m.format("GGGG")}/w${m.format("WW")}`;
const newTitle = `${m.format("YYYY-MM-DD")} ${tp.file.title}`;
await tp.file.move(`${folder}/${newTitle}`);
-%>
---
type: meeting
created-date: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date: <% m.format("YYYY-MM-DDTHH:mm") %>
up:
people:
related:
tags:
summary:
---
# <% newTitle %>
**Attendees:**`VIEW[{people}][link]`
## Agenda


## Notes

<% tp.file.cursor() %>

## Decision log
> [!info]- Creating traceable logs
> ![[Hotkeys#Logs]]
> Link `[[entities]]` such as projects and people so items are traceable using dataview queries. 
> The periods below double as your time-box. 
> For decisions use `#log/decision`

## Tasks
> [!info]- Creating new tasks
> ![[Hotkeys#Tasks]]



