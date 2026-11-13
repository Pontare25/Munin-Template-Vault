# AI-OS

The schema layer: everything the AI needs to operate this vault. Where `Atlas/` holds what you know, AI-OS holds how the system works. You and the AI evolve this layer together over time; it starts lean on purpose.

## Contents

| File or folder | Role |
|---|---|
| `Me.md` | Your profile: who you are, how you want the AI to work, and your own rules (My additions). Read every session after the rulebook, `AGENTS.md` at the vault root |
| `routing.md` | How the AI matches a request to the right handler: the SOP trigger index and the routing procedure |
| `Vault-Map.md` | Navigation manual: what goes where and why |
| `SOPs/` | Step-by-step procedures: [[ingest]], [[new-note]], [[query]], [[daily-review]], [[lint]], [[upgrade-vault]], [[onboarding]] |
| `Standards/sop-format.md` | How every SOP is written: frontmatter, sections, the 800-word cap, a manual checklist. Read before creating or editing a SOP |
| `Schemas/note-schema.md` | The note format, core rules: types, required fields, the idea compass. Read before writing a note |
| `Schemas/note-schema-reference.md` | Every field in detail, with examples: dates, meetings, tasks, people, OKF mapping |
| `Skills/` | Optional reusable AI instructions; its README lists what is installed |
| `state.md` | Personal. Where work stands: last operation, open threads, pending decisions. Its first line records the installed template version |
| `memory.md` | Personal. What the AI has learned about working with you: an Inbox for feedback, folded into lessons at the next session start |
| `log.md` | Append-only record of what the AI did in this vault |

Human-facing guides live in `Start Here/`, outside this folder.

## What belongs here

- Configuration, conventions, procedures, and records of AI activity.

## What does not belong here

- Knowledge (that is `Atlas/`), captures (`Raw/`), or work (`Efforts/`).

## Governing SOPs

All seven SOPs live in `SOPs/`. Changes to AI-OS itself are proposed by the AI and approved by you.

## Who owns which file

Every file the template ships has an ownership class. It decides what an upgrade ([[upgrade-vault]], with the steps per version in `UPGRADING.md`) does to that file.

| Class | What an upgrade does |
|---|---|
| **system** | Replaces it with the new version. If you edited it, the upgrade shows your edit and backs it up first |
| **merge** | Shows the difference between your copy and the new version; you choose per file: take the new one, keep yours, or combine |
| **user** | Never touches it, except steps from `UPGRADING.md` you approve |

| Class | Files (first match wins) |
|---|---|
| user | `AI-OS/Me.md`, `AI-OS/state.md` (an upgrade sets its first line), `AI-OS/memory.md`, `AI-OS/log.md`, `Atlas/log.md`, `Efforts/Areas/Personal.md`, `Efforts/Areas/Work.md` (starter notes, yours once filled), `.github/**` and `CONTRIBUTING.md` (template maintainer files) |
| merge | `AI-OS/routing.md` (your rows live under My SOPs), `AI-OS/README.md`, every folder `README.md` except the root one, every `index.md` in `Atlas/`, `System/Templates/**`, `System/Bases/**`, `Efforts/Efforts.base`, `Atlas/Topics/Topics.base`, `.obsidian/*.json`, `.obsidian/plugins/*/data.json`, `.gitignore` |
| system | Everything else the template ships: root files (`README.md`, `START-HERE.md`, `UPGRADING.md`, `CHANGELOG.md`, `AGENTS.md`, `CLAUDE.md`, `LICENSE`, `.gitattributes`, `.markdownlint*.jsonc`), `AI-OS/Vault-Map.md`, `AI-OS/Schemas/**`, the shipped `AI-OS/SOPs/*.md`, `Start Here/**`, `Dashboards/*.md` and `System/OKF/**` (except their README), `Efforts/TaskNotes/Views/*.base` (TaskNotes regenerates them), `.gitkeep` files, `.obsidian/snippets/**`, `.obsidian/themes/**`, and plugin code (`.obsidian/plugins/*/main.js`, `manifest.json`, `styles.css`) |
| user | Any file the template does not ship: your notes, your own SOPs and skills, attachments |

Plugin code is never downgraded: an upgrade copies a plugin only when the vault lacks it or has an older version (compare `manifest.json`). Close Obsidian before an upgrade writes to `.obsidian/`.

## Growth path

AI-OS starts lean on purpose: every file here loads as AI context, and unused machinery is worse than none. Add pieces only when you feel a specific pain. The signals:

| Pain | Add | How |
|---|---|---|
| `log.md` is getting long and slow to scan | Weekly log files (`log-YYYY-wWW.md`) with `log.md` kept as a short index | Roll over when it hurts, not before |
| You correct the AI the same way twice | The AI already tracks it in `memory.md` and proposes a rule for `Me.md` My additions at `hits: 2`; a whole procedure becomes a SOP in `SOPs/` | Approve the proposal, or ask the AI to draft the SOP |
| You repeat the same multi-step request | A skill (see `Skills/README.md`) | Ask the AI to turn the last run into a skill |
| A folder README index outgrows a quick scan (roughly 100 lines) or you want richer views | Let a Base be the index: a dashboard filtered on frontmatter fields, with the README trimmed to purpose plus the embedded Base | Obsidian: new Base, filter by `type:` or `status:`; keep the README's purpose text |
| Multiple AI tools disagree about conventions | Tighten `AGENTS.md`, `Me.md` and the schema; all are tool-agnostic on purpose | Keep tool-specific notes inline and rare |

The order most vaults grow: rules in `Me.md` My additions, then a first skill, then everything else. Some vaults never need more than what ships here.

## Index

<!-- One line per AI-OS document added beyond the standard set. -->
