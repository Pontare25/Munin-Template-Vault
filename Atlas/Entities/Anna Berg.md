---
type: person
created-date: 2026-08-11
description: Example contact, part of the logging-system worked example. Safe to delete.
up:
related:
  - "[[Product Development]]"
  - "[[Acme industries]]"
  - "[[Golf]]"
---
# Anna Berg

## How we met

Client product owner on [[Project Muninize]].

## Meetings

![[Meetings.base#Attendee meetings]]
## Tasks involving them
```dataview
TASK
WHERE contains(list(" ", "/", "!", ">", "?"), status)
WHERE contains(this.file.inlinks, file.link)
SORT date DESC
```

## Log
```dataview
TASK
WHERE contains(list("b", "i", "p", "c", "*"), status)
WHERE contains(this.file.inlinks, file.link)
SORT file.mtime DESC
```
