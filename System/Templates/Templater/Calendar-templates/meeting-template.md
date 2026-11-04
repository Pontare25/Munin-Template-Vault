<%*
const dt = await tp.system.prompt("Meeting datetime (YYYY-MM-DD HH:mm)", tp.date.now("YYYY-MM-DD HH:mm"));
const m = moment(dt, "YYYY-MM-DD HH:mm");
const folder = `Calendar/Meetings/${m.format("GGGG")}/w${m.format("WW")}`;
const newTitle = `${m.format("YYYY-MM-DD")} ${tp.file.title}`;
await tp.file.move(`${folder}/${newTitle}`);
-%>
---
type: meeting
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
date_start: <% m.format("YYYY-MM-DDTHH:mm") %>
up:
people:
related:
tags:
summary:
details:
actions:
---
# <% newTitle %>
**Attendees:** `VIEW[{people}][link]`
%%
```dataviewjs
// Copy meeting minutes: the title, the one-line summary, then one list per field
// below, as plain markdown ready to paste into an email or chat.
// Add, remove or reorder fields here. `always`: values added even when the field is
// empty, e.g. { key: "people", heading: "Attendees", always: ["Your Name"] }.
const FIELDS = [
  { key: "people",  heading: "Attendees" },
  { key: "details", heading: "Details" },
  { key: "actions", heading: "Actions" },
];

const page = dv.current();

// Wikilink -> plain name, everything else -> string
function toText(x) {
  if (x == null) return "";
  if (typeof x === "object") {
    if (typeof x.fileName === "function") return x.display ?? x.fileName(); // Dataview link
    if (x.path) return x.path.split("/").pop().replace(/\.md$/, "");
  }
  return String(x);
}

let md = `# ${page.file.name}\n`;
const summary = toText(page.summary).trim();
if (summary) md += `\n${summary}\n`;
for (const f of FIELDS) {
  let items = [].concat(page[f.key] ?? [])
    .map(x => toText(x).trim().replace(/^`+|`+$/g, "").trim()) // strip YAML-guard backticks
    .filter(x => x !== "");
  if (f.always) items = [...new Set([...f.always, ...items])];
  if (items.length === 0) continue;
  md += `\n## ${f.heading}\n`;
  for (const item of items) md += `- ${item}\n`;
}

const button = dv.el("button", "Copy meeting minutes");
button.onclick = async () => {
  await navigator.clipboard.writeText(md);
  button.textContent = "Copied";
  setTimeout(() => (button.textContent = "Copy meeting minutes"), 1500);
};
```
%%
## Meeting summary

```dataview
TABLE WITHOUT ID summary AS "Summary", details AS "Details", actions AS "Actions"
WHERE file.path = this.file.path
```

## Agenda


## Notes

<% tp.file.cursor() %>

## Minutes

Fill these as the meeting closes. They feed the summary table above, the copy button and the detailed meeting views.

**Summary:**
`INPUT[textArea:summary]`

### Details

```meta-bind
INPUT[list:details]
```

### Actions

```meta-bind
INPUT[list:actions]
```

## Attendees

```dataview
TABLE WITHOUT ID people AS "Attendee", people.summary AS "Description"
WHERE file.path = this.file.path
FLATTEN people
```
