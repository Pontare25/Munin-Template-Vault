---
type: weekly
created-date: <% tp.date.now("YYYY-MM-DD HH:mm") %>
date: <% moment(tp.file.title, "gggg-[W]ww").startOf("week").format("YYYY-MM-DD") %>
---
# Week <% moment(tp.file.title, "gggg-[W]ww").format("w, gggg") %>
```calendar-nav 
```
## Review

<% tp.file.cursor() %>

## Preview
