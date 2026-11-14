<%*
// Parent prompt: list notes of the allowed types (by frontmatter type), sorted by name.
const upTypes = ["area", "organization"];
const upNames = app.vault.getMarkdownFiles()
  .filter(f => upTypes.includes(app.metadataCache.getFileCache(f)?.frontmatter?.type))
  .map(f => f.basename)
  .sort((a, b) => a.localeCompare(b));
const upPick = (await tp.system.suggester(
  ["(none, set it later)"].concat(upNames),
  [""].concat(upNames),
  false,
  "Which Area or organization does this person belong under?"
)) || "";
-%>
---
type: person
date_created: <% tp.date.now("YYYY-MM-DD[T]HH:mm") %>
date_modified:
birthday:
up:<% upPick ? "\n  - \"[[" + upPick + "]]\"" : "" %>
related:
skills:
interests:
summary:
aliases:
location:
tags:
---
# <% tp.file.title %>
<%* await tp.file.move("Atlas/Entities/People/" + tp.file.title) -%>

## About
`INPUT[textArea:summary]`

<% tp.file.cursor() %>

## Last contact
```dataview
TABLE WITHOUT ID
file.link AS "Contact note",
dateformat(file.day, "yyyy-MM-dd") + ": **" + round(T) + " days**" AS "Last contact"
FROM [[]]
FLATTEN (date(today) - file.day).days as T
SORT file.day desc
LIMIT 1
```
## Tasks
![[Tasks.base#Person open]]

> [!done]- Closed tasks
> ![[Tasks.base#Person closed]]
## Log
<% tp.file.include("[[Advanced log template]]") %>
## Meetings
![[Meetings.base#People meetings]]

## Related notes
![[Notes.base#Related notes]]
