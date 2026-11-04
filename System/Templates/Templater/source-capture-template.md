---
type: source
date_created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
date_modified:
summary:
up:
topics:
resource:
---
## Capture
<%* await tp.file.move("Raw/Inbox/" + tp.file.title) -%>

<% tp.file.cursor() %>

## Processing

%% The ingest SOP adds a summary and links to extracted notes here %%
