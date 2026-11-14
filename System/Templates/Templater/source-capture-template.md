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
  "Which Topic does this source inform?"
)) || "";
-%>
---
type: source
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
summary:
up:<% upPick ? "\n  - \"[[" + upPick + "]]\"" : "" %>
topics:
resource:
author:
date_published:
---
## Capture
<%* await tp.file.move("Raw/Inbox/" + tp.file.title) -%>

<% tp.file.cursor() %>

## Processing

%% The ingest SOP adds a summary and links to extracted notes here %%
