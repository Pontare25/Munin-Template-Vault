# AGENTS.md

The rulebook for any AI agent in this vault. Your own rules, under My additions in `AI-OS/Me.md`, apply on top.

## 1. Boot

At the start of every session:

1. Read this file and `AI-OS/Me.md`.
2. Read `AI-OS/state.md` and `AI-OS/memory.md` if they contain any list item outside an HTML comment.
3. Fold the `memory.md` Inbox (section 5).
4. If a list item in `Me.md` still holds a `[placeholder]` in single square brackets, offer the onboarding SOP (`AI-OS/SOPs/onboarding.md`).

## 2. You are the orchestrator

Route every request through `AI-OS/routing.md` and state the match before your first action. Split independent work across parallel subagents when your tool supports it; dependent work stays in the main session. You own the shared files: `AI-OS/log.md`, `Atlas/log.md`, `AI-OS/state.md`, `AI-OS/memory.md` and the `index.md` files. Only you write them.

## 3. Current work

Read it from frontmatter, never from a copied list. Active projects: notes in `Efforts/` with `type: project` and `status: active` or `waiting`. Overdue tasks: notes with `type: task`, a `date_due` before today, and `status` not `done` or `dropped`.

## 4. Safety tiers

- **Free:** read anything; create and edit notes where a SOP directs it (Atlas, `Raw/Sources/`, Calendar and task notes, `index.md` lines); write `log.md`, `Atlas/log.md`, `state.md` and `memory.md`; set `date_modified` and `ai:` on notes you touched.
- **Ask first:** edit or delete text the user wrote; change system files (SOPs, schemas, templates, Bases, this file, `.obsidian/`) or add a field; any change touching more than ten notes (one approval per batch; suggest a git commit or a copy first).
- **Never:** hard-delete (use Obsidian's trash); move or rename a note except through Obsidian (the app, its CLI, or by asking the user to drag it), because file-system moves break links; write personal data into files the user may publish.

## 5. Writing and memory

- Before writing a note, read the schema core, `AI-OS/Schemas/note-schema.md`. Open `AI-OS/Vault-Map.md` only for filing questions the schema does not answer.
- Set `ai: pending` on knowledge notes you write; inside a note the user wrote, put `%% #AI-Assisted %%` above your section.
- After vault work, append an entry to `AI-OS/log.md` (format in that file) and update `AI-OS/state.md`.
- Offer to file a valuable answer as an Atlas note.
- **Capture:** when the user corrects or praises how you work, or answers a question about how to work, append one line to the `memory.md` Inbox before your next action: `- YYYY-MM-DD | pos or neg | context | feedback`.
- **Fold:** route each Inbox line: a general lesson to Lessons (a repeat gets `hits` +1 and today's date), a note about one SOP to Procedure notes, a tool problem to Tool gotchas, a system change to a proposal; drop one-offs. Clear the Inbox and log a tally: `## [YYYY-MM-DD] fold | 3 lines, 1 lesson, 1 hit, 1 dropped`.
- **Promote:** at `hits: 2`, if a lesson applies in most sessions, propose a one-line rule for `Me.md` My additions; add it only on approval.
- `AI-OS/memory.md` is the only memory for this vault. Do not use tool memory (Claude Code auto-memory and similar).
- Never use em-dashes.

## 6. Definition of done

The SOP's steps are complete; touched notes follow the schema; index lines and log entries are written; anything you did not verify is named to the user; feedback from the task is captured.

## 7. Roles

Role files arrive in a later release; until then the main session does all work.

## 8. Tool notes

Claude Code reads this file through `CLAUDE.md`; Codex and most other tools read it directly. Hooks and subagents are optional.
