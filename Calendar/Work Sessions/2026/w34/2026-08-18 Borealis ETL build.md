---
type: work-session
created-date: 2026-08-18T15:00
date: 2026-08-18T15:00
up:
  - "[[Project - Borealis ETL]]"
people:
  - "[[Sofia Marklund]]"
related:
tags:
summary: Build session prototyping the watermark ETL job.
---
# 2026-08-18 Borealis ETL build

## Focus
Prototype the watermark job for [[Project - Borealis ETL]].

## Notes

Built a first idempotent job reading from one legacy table with a watermark column.

## Log

- [b] Prototyped the watermark job for [[Project - Borealis ETL]]
- [c] Legacy timestamps are inconsistent across sources, breaks naive watermarking [[Project - Borealis ETL]] [[Sofia Marklund]]

## Tasks

- [/] #task Normalize legacy timestamps [[Project - Borealis ETL]] ➕ 2026-08-18
- [ ] #task Add dead-letter queue for failed rows [[Project - Borealis ETL]] ➕ 2026-08-18 📅 2026-08-25

## Next session
- Handle the timestamp normalization edge cases
