<%* await tp.file.move("Calendar/Weekly Notes/" + tp.date.now("GGGG-[W]WW")) -%>
---
type: weekly
created-date: <% tp.date.now("YYYY-MM-DD") %>
---
# Week <% tp.date.now("W, GGGG") %>

## Review

<% tp.file.cursor() %>

## Preview
