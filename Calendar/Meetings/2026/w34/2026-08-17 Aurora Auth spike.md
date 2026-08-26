---
type: meeting
created-date: 2026-08-17T15:00
date: 2026-08-17T15:00
up:
  - "[[Project - Aurora Auth]]"
people:
  - "[[Erik Lund]]"
  - "[[Mia Karlsson]]"
related:
tags:
summary: Technical spike on the Aurora Auth SSO approach.
---
# 2026-08-17 Aurora Auth spike

## Agenda

- SSO provider options
- Token refresh strategy

## Notes

Spike on auth options for [[Project - Aurora Auth]]. [[Mia Karlsson]] wants login friction kept minimal for end users.

## Decision log

- [i] [[Erik Lund]] leans toward OIDC over SAML for simpler token refresh [[Project - Aurora Auth]]
- [b] Evaluated three SSO providers against the friction requirement [[Project - Aurora Auth]]

## Tasks

- [ ] #task Pick the SSO provider [[Project - Aurora Auth]] [[Erik Lund]] ➕ 2026-08-17 📅 2026-08-20
- [!] #task Confirm token-refresh security review with [[Mia Karlsson]] [[Project - Aurora Auth]] ➕ 2026-08-17
