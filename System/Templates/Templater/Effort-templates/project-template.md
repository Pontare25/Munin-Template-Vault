<%*
// Kind first: Learning projects live in Efforts/Learning/<Subject>/ under the Learning
// Area; work and personal projects live in Efforts/Projects/.
const kind = (await tp.system.suggester(
  ["Work or personal project", "Learning project"], ["work", "learning"], false,
  "Work and personal, or Learning?"
)) || "work";
// Top-level Area of a note: use its area: when set, else walk up: until an Area
// note that has no parent Area.
const clean = (v) => typeof v === "string" ? v.replace(/^\[\[/, "").replace(/\]\]$/, "").split("|")[0] : "";
const fmOf = (name) => {
  const f = name ? app.metadataCache.getFirstLinkpathDest(name, "") : null;
  return f ? app.metadataCache.getFileCache(f)?.frontmatter : null;
};
const topArea = (name) => {
  for (let i = 0; i < 6 && name; i++) {
    const fm = fmOf(name);
    if (!fm) return "";
    const own = clean([].concat(fm.area ?? [])[0]);
    if (own) return own;
    const up = clean([].concat(fm.up ?? [])[0]);
    if (fm.type === "area" && !up) return name;
    name = up;
  }
  return "";
};
let root = "Efforts/Projects/", parent = "", upName = "", areaName = "", relatedName = "";
if (kind === "learning") {
  root = "Efforts/Learning/";
  upName = "Learning";
  areaName = "Learning";
  // Work-driven learning: link the work project it serves; it then shows on that
  // project under Related learning.
  const work = app.vault.getMarkdownFiles()
    .filter(f => f.path.startsWith("Efforts/Projects/"))
    .filter(f => {
      const fm = app.metadataCache.getFileCache(f)?.frontmatter;
      return fm?.type === "project" && ["backlog", "active", "waiting"].includes(fm?.status);
    })
    .map(f => f.basename)
    .sort((a, b) => a.localeCompare(b));
  relatedName = (await tp.system.suggester(
    ["(none)"].concat(work), [""].concat(work), false,
    "Does this learning serve a work project? Pick it, or none."
  )) || "";
} else {
  // Sub-project support: pick a parent to nest under (folder is cosmetic; the
  // parent's Sub Projects table matches on `up`, which we fill from the pick).
  const projectFolders = app.vault.getAllLoadedFiles()
    .filter(f => f.children && f.path.startsWith("Efforts/Projects/"))
    .map(f => f.path.slice("Efforts/Projects/".length));
  parent = (await tp.system.suggester(
    ["(top-level project)"].concat(projectFolders),
    [""].concat(projectFolders),
    false,
    "Parent project? Pick one to nest this as a sub-project, or choose top-level."
  )) || "";
  if (parent) {
    upName = "Project - " + parent.split("/").pop();
  } else {
    // Top-level project: its up: is the Area it belongs to (up: always points one
    // level up: sub-project -> project -> Area). Lists active Area notes.
    const areas = app.vault.getMarkdownFiles()
      .filter(f => f.path.startsWith("Efforts/Areas/"))
      .filter(f => {
        const fm = app.metadataCache.getFileCache(f)?.frontmatter;
        return fm?.type === "area" && fm?.status === "active";
      })
      .map(f => f.basename)
      .sort((a, b) => a.localeCompare(b));
    upName = (await tp.system.suggester(
      ["(no Area)"].concat(areas),
      [""].concat(areas),
      false,
      "Which Area does this project belong to?"
    )) || "";
  }
  areaName = topArea(upName);
}
const asList = (n) => n ? "\n  - \"[[" + n + "]]\"" : "";
const dest = parent ? root + parent + "/" + tp.file.title : root + tp.file.title;
await tp.file.move(dest + "/" + tp.file.title);
-%>
---
type: project
status: active
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
up:<% asList(upName) %>
area:<% asList(areaName) %>
related:<% asList(relatedName) %>
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

Summary: `INPUT[textArea:summary]`

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

%% Keep one open task that is the next physical step. Create it here with New task (Ctrl+Alt+T). %%
![[Tasks.base#Project open]]

> [!done]- Closed tasks
> ![[Tasks.base#Project closed]]

> [!todo]- Sub-project tasks
> ![[Tasks.base#Sub-project tasks]]

## Goal

<% tp.file.cursor() %>

## Meetings and work sessions
![[Meetings.base#Project meetings and work sessions]]

## Log
<% tp.file.include("[[Advanced log template]]") %>
## Retro

%% Fill in when you close the project with the button below. Lessons worth keeping become Atlas notes. %%

- What worked:
- What to change next time:
- Lessons to keep:

```meta-bind-button
label: Close project
style: default
actions:
  - type: command
    command: templater-obsidian:System/Templates/Templater/Commands/close-project.md
```

## Related
### Sub Projects
![[Projects.base#Sub projects]]

### Related learning
![[Projects.base#Related learning]]

### Child Notes
![[Notes.base#Child notes]]

### Related Notes
![[Notes.base#Related notes]]
