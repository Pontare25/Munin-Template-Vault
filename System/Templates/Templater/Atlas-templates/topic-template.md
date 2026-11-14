<%* await tp.file.move("Atlas/Topics/" + tp.file.title) -%>
---
type: topic
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
summary:
up:
related:
down:
ai:
opposes:
---
AI review: `INPUT[inlineSelect(option(pending), option(approved), option(collaborative), option(checked)):ai]`

<% tp.file.cursor() %>

## About this topic

Notes tagged with this topic appear in the backlinks pane.
