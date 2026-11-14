<%*
// Parent prompt: list notes of the allowed types (by frontmatter type), sorted by name.
const upTypes = ["topic"];
const upNames = app.vault.getMarkdownFiles()
  .filter(f => upTypes.includes(app.metadataCache.getFileCache(f)?.frontmatter?.type))
  .map(f => f.basename)
  .sort((a, b) => a.localeCompare(b));
const upPick = (await tp.system.suggester(
  ["(none, set it later)"].concat(upNames),
  [""].concat(upNames),
  false,
  "Which Topic does this note belong under?"
)) || "";
-%>
<%* await tp.file.move("Atlas/Notes/" + tp.file.title) -%>
---
type: note
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
summary:
up:<% upPick ? "\n  - \"[[" + upPick + "]]\"" : "" %>
topics:
ai:
---
AI review: `INPUT[inlineSelect(option(pending), option(approved), option(collaborative), option(checked)):ai]`

<% tp.file.cursor() %>
