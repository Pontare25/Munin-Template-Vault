---
type: meeting
created-date: 2026-08-17T13:00
date: 2026-08-17T13:00
up:
  - "[[Project - Borealis]]"
people:
  - "[[Sofia Marklund]]"
  - "[[Johan Nyberg]]"
related:
  - "[[Product Development]]"
tags:
summary: Review of the target data model for the Borealis migration.
---
# 2026-08-17 Borealis data model review

## Agenda
- Target schema
- Warehouse provisioning
- Migration sequencing

## Notes

Reviewed the target schema for [[Project - Borealis]] with [[Sofia Marklund]] and [[Johan Nyberg]]. Legacy warehouse has undocumented columns that need mapping.

## Decision log

- [p] Freeze the target schema before any ETL work starts [[Project - Borealis]]
- [c] Undocumented legacy columns are a migration risk [[Project - Borealis]] [[Sofia Marklund]]

## Tasks

- [ ] #task Freeze the target schema [[Project - Borealis]] [[Sofia Marklund]] ➕ 2026-08-17 📅 2026-08-24
- [?] #task Decide whether to keep the legacy audit table [[Project - Borealis]] ➕ 2026-08-17
- [/] #task Provision the new warehouse [[Project - Borealis]] ➕ 2026-08-17
