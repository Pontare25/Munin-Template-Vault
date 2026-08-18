---
type: meeting
created-date: 2026-08-18T16:00
date: 2026-08-18T16:00
up:
  - "[[Project - Aurora]]"
  - "[[Project - Borealis]]"
people:
  - "[[Johan Nyberg]]"
  - "[[Erik Lund]]"
  - "[[Sofia Marklund]]"
related:
  - "[[Product Development]]"
tags:
summary: Cross-project architecture alignment between Aurora and Borealis.
---
# 2026-08-18 Cross-project architecture

## Agenda
- Shared auth vs platform boundaries
- Data contracts between portal and platform

## Notes

[[Johan Nyberg]] ran a cross-project session covering both [[Project - Aurora]] and [[Project - Borealis]]. The portal will read analytics through a stable data contract owned by the platform team.

## Decision log

- [p] The portal consumes analytics via a versioned data contract [[Project - Aurora]] [[Project - Borealis]]
- [i] [[Erik Lund]] and [[Sofia Marklund]] to co-own the contract schema [[Project - Borealis]]

## Tasks

- [ ] #task Draft the portal/platform data contract [[Project - Aurora]] [[Project - Borealis]] [[Johan Nyberg]] ➕ 2026-08-18 📅 2026-08-25
- [?] #task Decide contract versioning scheme [[Project - Borealis]] ➕ 2026-08-18
