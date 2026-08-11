<%* await tp.file.move("Calendar/Meetings/" + tp.file.title) -%>
---
type: meeting
created-date: <% tp.date.now("YYYY-MM-DD[T]HH:mm:ss") %>
date: <% tp.system.prompt("Meeting date (YYYY-MM-DD)", tp.date.now("YYYY-MM-DD")) %>
up:
attendees:
related:
summary:
---
# <% tp.file.title %>

## Notes

<% tp.file.cursor() %>

## Decisions

%% Record a decision as an event log tagged for query: - [b] #log/decision Go REST-first [[Project]] %%

## Tasks

- [ ] #task 

## Log

%% Information, not actions: [b] bookmark  [i] info  [p] positive  [c] negative  [*] highlight %%
