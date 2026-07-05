# AI-OS

The schema layer: everything the AI needs to operate this vault. Where `Atlas/` holds what you know, AI-OS holds how the system works. You and the AI evolve this layer together over time; it starts lean on purpose.

## Contents

| File or folder | Role |
|---|---|
| `Me.md` | Your profile: who you are, how you want the AI to work. The entry point every AI tool reads first |
| `Vault-Map.md` | Navigation manual: what goes where and why |
| `SOPs/` | Step-by-step procedures: [[ingest]], [[new-note]], [[daily-review]], [[lint]] |
| `Schemas/note-schema.md` | The note format: types, fields, the idea compass |
| `Skills/` | Optional reusable AI instructions; ships empty with a setup guide |
| `Guides/` | Human-facing explainers: Obsidian basics, working with AI, skills, backup |
| `log.md` | Append-only record of what the AI did in this vault |

## What belongs here

- Configuration, conventions, procedures, and records of AI activity.

## What does not belong here

- Knowledge (that is `Atlas/`), captures (`Raw/`), or work (`Efforts/`).

## Governing SOPs

All four SOPs live in `SOPs/`. Changes to AI-OS itself are proposed by the AI and approved by you.

## Growth path

AI-OS starts lean on purpose: every file here loads as AI context, and unused machinery is worse than none. Add pieces only when you feel a specific pain. The signals:

| Pain | Add | How |
|---|---|---|
| Every session starts with re-explaining where things stand | A `state.md` snapshot: active efforts, recent decisions, open threads. AI updates it at session end, reads it at session start | One file next to this README; add "read state.md first" to `Me.md` rules |
| `log.md` is getting long and slow to scan | Weekly log files (`log-YYYY-wWW.md`) with `log.md` kept as a short index | Roll over when it hurts, not before |
| You correct the AI the same way for the third time | A rule in `Me.md` under "My additions", or a new SOP in `SOPs/` if it is a whole procedure | Ask the AI to draft it from the corrections |
| You repeat the same multi-step request | A skill (see `Skills/README.md`) | Ask the AI to turn the last run into a skill |
| A folder README index outgrows a quick scan (roughly 100 lines) or you want richer views | Let a Base be the index: a dashboard filtered on frontmatter fields, with the README trimmed to purpose plus the embedded Base | Obsidian: new Base, filter by `type:` or `status:`; keep the README's purpose text |
| Multiple AI tools disagree about conventions | Tighten `Me.md` and the schema; both are tool-agnostic on purpose | Keep tool-specific notes inline and rare |

The order most vaults grow: rules in `Me.md`, then a first skill, then `state.md`, then everything else. Some vaults never need more than what ships here.

## Index

<!-- One line per AI-OS document added beyond the standard set. -->
