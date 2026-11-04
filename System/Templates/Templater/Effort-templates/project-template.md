<%*
// Sub-project support: pick a parent to nest under (folder is cosmetic; the
// parent's Sub Projects table matches on `up`, which we fill from the pick).
const projectFolders = app.vault.getAllLoadedFiles()
  .filter(f => f.children && f.path.startsWith("Efforts/Projects/"))
  .map(f => f.path.slice("Efforts/Projects/".length));
const parent = await tp.system.suggester(
  ["(top-level project)"].concat(projectFolders),
  [""].concat(projectFolders),
  false,
  "Parent project? Pick one to nest this as a sub-project, or choose top-level."
);
const parentName = parent ? parent.split("/").pop() : "";
// Top-level project: its up: is the Area it belongs to (up: always points one level
// up: sub-project -> project -> Area). Lists active Area notes in Efforts/Areas.
let areaName = "";
if (!parent) {
  const areas = app.vault.getMarkdownFiles()
    .filter(f => f.path.startsWith("Efforts/Areas/"))
    .filter(f => {
      const fm = app.metadataCache.getFileCache(f)?.frontmatter;
      return fm?.type === "area" && fm?.status === "active";
    })
    .map(f => f.basename)
    .sort((a, b) => a.localeCompare(b));
  areaName = (await tp.system.suggester(
    ["(no Area)"].concat(areas),
    [""].concat(areas),
    false,
    "Which Area does this project belong to?"
  )) || "";
}
const root = "Efforts/Projects/";
const dest = parent ? root + parent + "/" + tp.file.title : root + tp.file.title;
await tp.file.move(dest + "/" + tp.file.title);
-%>
---
type: project
status: active
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
up:<% parentName ? "\n  - \"[[Project - " + parentName + "]]\"" : areaName ? "\n  - \"[[" + areaName + "]]\"" : "" %>
related:
people:
date_start: <% tp.date.now("YYYY-MM-DD") %>
date_due:
date_end:
aliases:
  - <% tp.file.title %>
summary:
---
# <% tp.file.title %>
<%* await tp.file.rename("Project - " + tp.file.title) -%>

Status: `INPUT[inlineSelect(option(backlog), option(active), option(waiting), option(done), option(dropped)):status]`

## Last update
```dataview
TABLE WITHOUT ID
file.link AS "Last touched in",
dateformat(file.day, "yyyy-MM-dd") + ": **" + round(T) + " days ago**" AS "Last update"
FROM [[]]
WHERE file.day
FLATTEN (date(today) - file.day).days as T
SORT file.day desc
LIMIT 1
```

## Tasks
![[Tasks.base#Project open]]

> [!done]- Closed tasks
> ![[Tasks.base#Project closed]]

> [!todo]- Sub-project tasks
> ![[Tasks.base#Sub-project tasks]]

## Related
### Logs
```dataview
TASK
WHERE contains(outlinks, [[]]) or contains(up, [[]])
WHERE contains(list("b", "i", "p", "c", "*"), status) OR (status = "t" AND contains(tags, "#task"))
GROUP BY file.name as Source
SORT Source DESC
```
<% tp.file.include("[[Advanced log template]]") %>
### Meetings
![[Meetings.base#Project meetings]]
### Work sessions
![[Sessions.base#Project sessions]]
### Sub Projects
![[Projects.base#Sub projects]]

### Child Notes
![[Notes.base#Child notes]]

### Related Notes
![[Notes.base#Related notes]]

## Goal

<% tp.file.cursor() %>