<%*
const dt = await tp.system.prompt("Session datetime (YYYY-MM-DD HH:mm)", tp.date.now("YYYY-MM-DD HH:mm"));
const m = moment(dt, "YYYY-MM-DD HH:mm");
const folder = `Calendar/Work Sessions/${m.format("GGGG")}/w${m.format("WW")}`;
const newTitle = `${m.format("YYYY-MM-DD")} ${tp.file.title}`;
await tp.file.move(`${folder}/${newTitle}`);
-%>
---
type: work-session
created-date: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date: <% m.format("YYYY-MM-DDTHH:mm") %>
up:
people:
related:
tags:
summary:
---
# <% newTitle %>
## Focus
What this session is for. Link the project so it rolls up: `[[Project ...]]`

## Notes

<% tp.file.cursor() %>

## Log
> [!info]- Creating traceable logs
> ![[Hotkeys#Logs]]
> Link `[[entities]]` such as projects and people so items are traceable using dataview queries.

## Tasks
> [!info]- Creating new tasks
> ![[Hotkeys#Tasks]]

## Next session
- 
