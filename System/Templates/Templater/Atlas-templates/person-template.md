<%* await tp.file.move("Atlas/Entities/" + tp.file.title) -%>
---
type: person
created-date: <% tp.date.now("YYYY-MM-DD") %>
description:
up:
related:
---
# <% tp.file.title %>

## How we met

<% tp.file.cursor() %>

## Meetings

Meeting notes that link this person appear in the backlinks pane.
