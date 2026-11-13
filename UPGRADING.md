# Upgrading

How to move a vault made from this template to a newer release. Each version below has one section: what changed, what you do, and what the [[upgrade-vault]] SOP does for you.

## How to upgrade

- **With an AI:** ask it to "upgrade the vault". It follows the [[upgrade-vault]] SOP: it reads your installed version, shows a preview of every file it would touch, and changes nothing until you approve. Always point the AI at `AI-OS/SOPs/upgrade-vault.md` inside the unpacked new release: your vault's own copy does not know the newer release's steps.
- **By hand:** follow the manual checklist at the end of that SOP.

Before you start:

1. Download the new release ZIP from the template's GitHub Releases page and unpack it in a folder **outside** your vault. Never unpack it into the vault.
2. Back up your vault. The AI asks you to close Obsidian while it copies files, and to reopen it before it moves notes.
3. Find your version: the first line of `AI-OS/state.md` (`Template version: x.y.z`), or the top entry of your `CHANGELOG.md` if that line is missing.

Which files an upgrade replaces, merges or leaves alone is set by the ownership table in `AI-OS/README.md`. Vaults older than 2.0.0 are not supported by the SOP: upgrade them by hand using the 2.0.0 breaking changes in `CHANGELOG.md`.

Each section uses the same four parts: **What changed**, **What you do**, **What the SOP does**, **Removed files**.

## 3.0.0

<!-- Phase 2 in progress: items A to G add their entries to this section. -->

**What changed:** Breaking release. The AI's rules moved out of `AI-OS/Me.md` into `AGENTS.md` at the vault root, now the rulebook for every AI tool; `CLAUDE.md` is one line importing it. `Me.md` keeps only your profile and My additions (your own rules, which apply on top). New `AI-OS/memory.md`: the AI notes your feedback in its Inbox and folds it into lessons at the next session start. `AI-OS/state.md` gained Last operation, Open threads and Pending decisions sections. The note schema is split: `AI-OS/Schemas/note-schema.md` is now a short core the AI reads before writing a note, and every field in detail moved to the new `AI-OS/Schemas/note-schema-reference.md`. The [[query]] SOP climbs a five-rung navigation ladder (topic page, backlinks, map of content, folder `index.md` or Base, search last), and every SOP that creates an Atlas note keeps the folder `index.md` current. New `AI-OS/Standards/sop-format.md` sets one shape for every SOP (`type: sop`, `version:` and `summary:` in the frontmatter, Steps, Output, a manual checklist), and the shipped SOPs follow it. Your own SOPs keep working as they are; reshape them when you next edit them. New [[onboarding]] SOP: say "set up my vault" and the AI interviews you and fills in `Me.md`; it replaces the long prompt in `START-HERE.md`, and the AI offers it while `Me.md` still has placeholders. `Raw/Ideas/` is removed: your own ideas live in `Fleeting/`. The `simmering` status is retired: areas use `active`, `backlog` and `dropped`, where `backlog` means not in focus now. The AoR Review lists only `active` areas, and the Efforts *Active* view reads `active` and `waiting`. New guide `Start Here/ai-setup.md` replaces `working-with-ai` and `skills-setup` and is the only place for skill install steps. `AI-OS/Skills/README.md` now holds an installed-skills table. `Me.md`, `state.md` and `log.md` in `AI-OS/` carry a "Private file" header in new copies.

**What you do:** Approve the SOP's preview. If you changed the "Rules for the AI" section in your `Me.md`, decide which of your changes to keep as My additions when the SOP asks. If you prefer, move your notes out of `Raw/Ideas/` into `Fleeting/` through Obsidian before you upgrade.

**What the SOP does:** Updates the changed files (system files are copied, merge files are shown for you to choose): note schema, Efforts README, area template, `Efforts.base`, `AoR Review.base`, Raw README, `working-with-projects.md`, the AoR Review dashboard and the two maps that describe it, the new `ai-setup.md`, the Skills README, `first-hour.md`, `linking-notes-and-maps.md`, `AGENTS.md`, `CLAUDE.md`, `AI-OS/README.md`, `START-HERE.md`, the new `AI-OS/SOPs/onboarding.md`, `AI-OS/routing.md` (its new onboarding row), both schema files, all seven shipped SOPs, the new `AI-OS/Standards/sop-format.md`, and the files whose links now point at the schema reference (three SOPs, Vault-Map, Efforts README, `Atlas/Entities/index.md`, three guides, `okf-conformance.md`). Copies in `AI-OS/memory.md` and appends the three new section headings to your `AI-OS/state.md`, below everything already there. Shows the "Rules for the AI" section of your `Me.md` next to the template's original, moves any rule you added there into My additions, and removes the section with your approval; it also removes the `- [none yet]` line under My additions. Your other `Me.md` sections stay as they are. Then, with Obsidian open, in batches of at most ten notes: sets `status: simmering` to `backlog`; in every note's status selector, replaces `option(simmering)` with `option(backlog)`, or drops it where `option(backlog)` is already listed; sets `status: active` on area notes in `Efforts/Areas/` that have no `status:`, so the AoR Review still shows them; moves the notes in `Raw/Ideas/` you approve into `Fleeting/` with `type: fleeting`; repoints links to `working-with-ai` and `skills-setup` in your notes to [[ai-setup]]; offers to add the "Private file" header to your `Me.md`, `state.md` and `log.md`. Last, it trashes the `Raw/Ideas/` folder once it is empty.

**Removed files:** `Raw/Ideas/.gitkeep`, `Start Here/working-with-ai.md`, `Start Here/skills-setup.md`. The `Raw/Ideas/` folder itself goes last, once it is empty.

## 2.4.0

**What changed:** A new front door. `README.md` and `START-HERE.md` were rewritten (the plugin list now matches the nine bundled plugins), and two guides are new: `Start Here/first-hour.md` (from a fresh copy to your first daily note, fleeting note, task and source) and `Start Here/troubleshooting-and-upgrading.md`. Only one Templater setting is per device ("Trigger Templater on new file creation"); earlier docs said two.

**What you do:** Nothing.

**What the SOP does:** Copies the changed and new files (all system files). No note changes.

**Removed files:** none.

## 2.3.0

**What changed:** Every shipped file now has an ownership class (system, user or merge) in `AI-OS/README.md`. New: this file, the [[upgrade-vault]] SOP and its routing row, and `AI-OS/state.md`, whose first line records the installed version. `AI-OS/routing.md` gained a My SOPs section for your own rows. `Raw/Ideas/` is deprecated: your own ideas go to `Fleeting/`; the folder itself is removed in 3.0.0. Docs were corrected to match the disk (Bases catalogue and per-file template table in `Vault-Map.md`, Atlas index links, SOPs write `summary:`), and em-dashes were removed from shipped markdown.

**What you do:** If you added rows to the trigger index in `AI-OS/routing.md`, move them under My SOPs. If you keep notes in `Raw/Ideas/`, you can leave them until 3.0.0 or move them into `Fleeting/` through Obsidian now.

**What the SOP does:** Copies the system files, shows a diff for each merge file, and creates `AI-OS/state.md` with the version line if you do not have one. No note changes.

**Removed files:** none.

## 2.2.0

**What changed:** Meeting notes gained minutes fields, a copy-minutes button and detailed views.

**What you do:** Nothing. Existing meeting notes keep working; the new fields appear on meetings created after the upgrade.

**What the SOP does:** Copies the changed templates and Bases (merge files, so you see the diff). No note changes.

**Removed files:** none.

## 2.1.0

**What changed:** Task reference lines in notes use `[t] #task`, so TaskNotes stops offering to convert them. Projects no longer use the `simmering` status. The Promote button shows only on fleeting notes; Bases got readable date column labels.

**What you do:** Optionally change old `[x] #task` reference lines to `[t] #task`. Give any project with `status: simmering` another status.

**What the SOP does:** Copies the changed templates and Bases (merge files). Lists projects with `status: simmering` and asks which status each should get, in batches of at most ten.

**Removed files:** none.
