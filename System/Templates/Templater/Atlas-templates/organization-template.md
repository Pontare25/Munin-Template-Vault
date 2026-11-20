<%*
// Parent prompt: a new top-level organization, or part of an existing one.
// Lists organization notes only (by frontmatter type), never the template files.
const upNames = app.vault.getMarkdownFiles()
  .filter(f => !f.path.startsWith("System/Templates/") && f.basename !== tp.file.title
    && app.metadataCache.getFileCache(f)?.frontmatter?.type === "organization")
  .map(f => f.basename)
  .sort((a, b) => a.localeCompare(b));
const upPick = (await tp.system.suggester(
  ["(new top-level organization)"].concat(upNames),
  [""].concat(upNames),
  false,
  "Is this organization part of another one?"
)) || "";
-%>
---
type: organization
date_created: <% tp.date.now("YYYY-MM-DD[T]HH:mm") %>
date_modified:
summary:
up:<% upPick ? "\n  - \"[[" + upPick + "]]\"" : "" %>
related:
resource:
aliases:
---
# <% tp.file.title %>
<%* await tp.file.move("Atlas/Entities/Organizations/" + tp.file.title) -%>

## About
`INPUT[textArea:summary]`

<% tp.file.cursor() %>

## People
%% People whose up: points at this organization. %%
![[People.base#People here]]
