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
  "Which Area or organization does this organization belong under?"
)) || "";
-%>
---
type: organization
date_created: <% tp.date.now("YYYY-MM-DD[T]HH:mm") %>
date_modified:
summary:
up:<% upPick ? "\n  - \"[[" + upPick + "]]\"" : "" %>
related:
people:
resource:
aliases:
---
# <% tp.file.title %>
<%* await tp.file.move("Atlas/Entities/Organizations/" + tp.file.title) -%>

## About
`INPUT[textArea:summary]`

<% tp.file.cursor() %>

## People
%% Backlinks show who works here. %%
