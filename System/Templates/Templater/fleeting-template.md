<%*
// Name the note here, during creation, so a capture never sits as "Untitled".
// Blank input keeps the default name so the flow never blocks.
// Only prompt when the note has no real name yet: a CTRL+N note is "Untitled"
// (or "Untitled 1", ...). A note created from a [[wikilink]] already carries its
// name as the title, so skip the prompt and keep it.
if (/^Untitled( \d+)?$/.test(tp.file.title)) {
  const name = await tp.system.prompt("Fleeting note name (blank to name later)");
  if (name) { await tp.file.rename(name); }
}
-%>
---
type: fleeting
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
---
```dataviewjs
// Promote button. It shows only while the note is still type: fleeting, so it
// disappears however the note gets a real type (this button, the command, or a
// template inserted with Alt+E, which merges frontmatter and keeps this block).
if (dv.current()?.type === "fleeting") {
  const button = dv.el("button", "Promote note", { cls: "mod-cta" });
  button.onclick = () => app.commands.executeCommandById(
    "templater-obsidian:System/Templates/Templater/Commands/promote-note.md");
}
```

<% tp.file.cursor() %>
