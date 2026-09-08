---
type: fleeting
created-date: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
---
<% tp.file.cursor() %>

```meta-bind-button
label: Promote note
style: primary
action:
  type: command
  command: templater-obsidian:System/Templates/Templater/Commands/promote-note.md
```
