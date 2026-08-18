---
type: meeting
created-date: 2026-08-19T10:00
date: 2026-08-19T10:00
up:
  - "[[Project - Aurora Auth]]"
people:
  - "[[Erik Lund]]"
  - "[[Johan Nyberg]]"
related:
tags:
summary: Review of the Aurora Auth implementation progress.
---
# 2026-08-19 Aurora Auth review

## Agenda
- SSO provider decision
- Token refresh implementation

## Notes

Reviewed [[Project - Aurora Auth]] progress with [[Erik Lund]] and [[Johan Nyberg]]. Provider is picked; token refresh needs a security review before merge.

## Decision log

- [p] Go with OIDC provider for [[Project - Aurora Auth]]
- [c] Token refresh must pass security review before merge [[Project - Aurora Auth]]

## Tasks

- [x] #task Pick the SSO provider [[Project - Aurora Auth]] [[Erik Lund]] ➕ 2026-08-17 ✅ 2026-08-19
- [ ] #task Schedule the token-refresh security review [[Project - Aurora Auth]] [[Johan Nyberg]] ➕ 2026-08-19 📅 2026-08-21
