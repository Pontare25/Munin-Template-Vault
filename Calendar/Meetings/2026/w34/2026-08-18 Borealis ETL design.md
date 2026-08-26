---
type: meeting
created-date: 2026-08-18T13:00
date: 2026-08-18T13:00
up:
  - "[[Project - Borealis ETL]]"
people:
  - "[[Sofia Marklund]]"
  - "[[Johan Nyberg]]"
related:
tags:
summary: Design session for the Borealis ETL pipeline.
---
# 2026-08-18 Borealis ETL design

## Agenda

- Pipeline architecture
- Idempotency and retries
- Source table mapping

## Notes

Designed the ETL pipeline for [[Project - Borealis ETL]] with [[Sofia Marklund]] and [[Johan Nyberg]]. Settled on idempotent jobs with a watermark table.

## Decision log

- [p] Use idempotent, watermark-driven jobs for [[Project - Borealis ETL]]
- [i] [[Johan Nyberg]] recommends a dead-letter queue for failed rows [[Project - Borealis ETL]]

## Tasks

- [ ] #task Map legacy source tables [[Project - Borealis ETL]] [[Sofia Marklund]] ➕ 2026-08-18 📅 2026-08-22
- [/] #task Prototype the watermark job [[Project - Borealis ETL]] ➕ 2026-08-18
- [x] #task Choose the orchestration tool [[Project - Borealis ETL]] ➕ 2026-08-18 ✅ 2026-08-18
