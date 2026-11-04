---
type: area
status: active
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
summary:
up:
---
# <% tp.file.title %>
<%* await tp.file.move("Efforts/Areas/" + tp.file.title) -%>

Status: `INPUT[inlineSelect(option(active), option(simmering), option(dropped)):status]`

## Standard of care

<% tp.file.cursor() %>

%% One line: what "handled well" looks like for this area. %%

## Tasks

%% Tasks anywhere under this Area (hide Done and Dropped in the board): tasks whose up: is the Area, one of its projects or sub-projects, or a sub-Area. %%
![[Tasks.base#Area tasks]]
