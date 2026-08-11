<%* await tp.file.move("Efforts/Areas/" + tp.file.title) -%>
---
type: area
status: active
created-date: <% tp.date.now("YYYY-MM-DD") %>
description:
up:
---
# <% tp.file.title %>

## Standard of care

<% tp.file.cursor() %>

%% One line: what "handled well" looks like for this area. %%

## Next actions

- [ ]
