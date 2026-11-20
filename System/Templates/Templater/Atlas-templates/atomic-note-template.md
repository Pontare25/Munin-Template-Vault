<%* await tp.file.move("Atlas/Notes/" + tp.file.title) -%>
---
type: note
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
summary:
up:
topics:
ai:
---
AI review: `INPUT[inlineSelect(option(pending), option(approved), option(collaborative), option(checked)):ai]`

<% tp.file.cursor() %>
