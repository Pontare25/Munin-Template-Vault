<%*
// One choice first: Work, Personal or Learning. Work and Personal projects live in
// Efforts/Projects/; Learning projects live in Efforts/Learning/<Subject>/.
const kind = (await tp.system.suggester(
  ["Work", "Personal", "Learning"], ["Work", "Personal", "Learning"], false,
  "Work, Personal or Learning?"
)) || "Work";
// Top-level Area of a note: walk up: until an Area note that has no parent Area.
const clean = (v) => typeof v === "string" ? v.replace(/^\[\[/, "").replace(/\]\]$/, "").split("|")[0] : "";
const fmOf = (name) => {
  const f = name ? app.metadataCache.getFirstLinkpathDest(name, "") : null;
  return f ? app.metadataCache.getFileCache(f)?.frontmatter : null;
};
const topArea = (name) => {
  for (let i = 0; i < 6 && name; i++) {
    const fm = fmOf(name);
    if (!fm) return "";
    const up = clean([].concat(fm.up ?? [])[0]);
    if (fm.type === "area" && !up) return name;
    name = up;
  }
  return "";
};
// Open projects (backlog, active, waiting), sorted by name.
const byName = (a, b) => a.basename.localeCompare(b.basename);
const notesOf = (type, statuses) => app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("Efforts/"))
  .filter(f => {
    const fm = app.metadataCache.getFileCache(f)?.frontmatter;
    return fm?.type === type && statuses.includes(fm?.status);
  })
  .sort(byName);
const openProjects = notesOf("project", ["backlog", "active", "waiting"]);
let root = "Efforts/Projects/", ups = [], related = [];
if (kind === "Learning") {
  // Learning: up: is the project (or projects) it serves; on its own, Personal or
  // Work. [[Learning]] goes in related:, so the Learning view finds it, and it shows
  // on each project it serves under Sub projects.
  root = "Efforts/Learning/";
  related = ["Learning"];
  for (;;) {
    const left = openProjects.filter(f => !ups.includes(f.basename));
    const none = ups.length ? "(done)" : "(not part of a project)";
    const pick = await tp.system.suggester(
      [none].concat(left.map(f => f.basename)), [""].concat(left.map(f => f.basename)), false,
      ups.length ? "Part of another project too? Pick it, or done." : "Is this learning part of a project? Pick it, or none."
    );
    if (!pick) break;
    ups.push(pick);
  }
  if (!ups.length) {
    ups = [(await tp.system.suggester(["Personal", "Work"], ["Personal", "Work"], false,
      "Personal or Work learning?")) || "Personal"];
  }
} else {
  // Work or Personal: one pick for where it sits. Directly under the Area, under a
  // sub-Area of it, or as a sub-project of one of its projects. up: always points
  // one level up: sub-project -> project -> Area.
  const subAreas = notesOf("area", ["active", "backlog"])
    .filter(f => f.basename !== kind && topArea(f.basename) === kind);
  const parents = openProjects.filter(f => f.path.startsWith("Efforts/Projects/") && topArea(f.basename) === kind);
  const labels = ["(directly under " + kind + ")"]
    .concat(subAreas.map(f => "Area: " + f.basename))
    .concat(parents.map(f => "Sub-project of: " + f.basename));
  const values = [kind].concat(subAreas.map(f => f.basename)).concat(parents.map(f => f.basename));
  const upName = (await tp.system.suggester(labels, values, false, "Where does this project sit?")) || kind;
  ups = [upName];
  const parentFile = parents.find(f => f.basename === upName);
  // Sub-project: file it in the parent's folder (cosmetic; the parent's Sub projects
  // view matches on up:).
  if (parentFile) root = parentFile.parent.path + "/";
}
const asList = (names) => names.map(n => "\n  - \"[[" + n + "]]\"").join("");
const dest = root + tp.file.title;
await tp.file.move(dest + "/" + tp.file.title);
-%>
---
type: project
status: active
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
up:<% asList(ups) %>
related:<% asList(related) %>
people:
date_start: <% tp.date.now("YYYY-MM-DD") %>
date_due:
date_end:
retro_worked:
retro_change:
retro_lessons:
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

## Goal

<% tp.file.cursor() %>

## Tasks

%% Keep one open task that is the next physical step. Create tasks where the work happens (daily note, meeting, work session) with New task (Ctrl+Alt+T), and set this project in the task window. %%
![[Tasks.base#Project open]]

> [!done]- Closed tasks
> ![[Tasks.base#Project closed]]

> [!todo]- Sub-project tasks
> ![[Tasks.base#Sub-project tasks]]

## Log
<% tp.file.include("[[Advanced log template]]") %>
## Meetings and work sessions
![[Meetings.base#Project meetings and work sessions]]

## Related
### Sub Projects
%% Sub-projects and the learning projects that serve this project. %%
![[Projects.base#Sub projects]]

### Child Notes
![[Notes.base#Child notes]]

### Related Notes
![[Notes.base#Related notes]]

## Retro

%% When the project ends: set Status at the top to done or dropped, set the end date, and fill the three lists. Lessons worth keeping become Atlas notes. %%

Ended: `INPUT[datePicker:date_end]`

### What worked

```meta-bind
INPUT[list:retro_worked]
```

### What to change next time

```meta-bind
INPUT[list:retro_change]
```

### Lessons to keep

```meta-bind
INPUT[list:retro_lessons]
```
