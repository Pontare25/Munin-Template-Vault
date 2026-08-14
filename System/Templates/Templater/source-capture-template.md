---
type: source
created-date: <% tp.date.now("YYYY-MM-DD") %>
description:
up:
topics:
resource:
---
## Capture
<%* await tp.file.move("Raw/Sources/" + tp.file.title) -%>

<% tp.file.cursor() %>

## Processing

%% The ingest SOP adds a summary and links to extracted notes here %%
