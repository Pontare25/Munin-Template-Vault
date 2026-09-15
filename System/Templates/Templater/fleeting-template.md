<%*
// Name the note here, during creation, so the meta-bind button below renders
// once against its final path. Meta-bind keys a code-block button to the note
// path; renaming AFTER it has rendered (the manual rename in Obsidian's new-note
// flow) invalidates that handle and shows "Button Error". Doing the rename
// before the button ever renders sidesteps it. Blank input keeps the default
// name so the flow never blocks.
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
created-date: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
---
```meta-bind-button
label: Promote note
style: primary
action:
  type: command
  command: templater-obsidian:System/Templates/Templater/Commands/promote-note.md
```

<% tp.file.cursor() %>
