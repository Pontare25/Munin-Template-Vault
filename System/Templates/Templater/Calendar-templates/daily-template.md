---
type: daily
created-date: <% tp.date.now("YYYY-MM-DD[T]HH:mm:ss") %>
date: <% tp.date.now("YYYY-MM-DD") %>
---
# <% tp.date.now("dddd, MMMM D YYYY") %>

## Log

%% Meetings, notes, decisions. Link out so they roll up: - [b] [[meeting note]]  ·  - [i] fact [[Project]] %%

## Capture

- <% tp.file.cursor() %>

## Tasks

- [ ] #task 

## Meetings

![[Meetings.base#Daily meeting rollup]]
