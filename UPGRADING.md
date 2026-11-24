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

## Unreleased

**What changed:** The Advanced log widget on project and person notes now loads from one shared script, `System/Scripts/advanced-log.js`. `Advanced log template.md` holds only a three-line `dataviewjs` block, `await dv.view("System/Scripts/advanced-log")`, so a later fix to the script reaches every note on its next render. Before, each note carried its own pasted copy of the widget, and copies made from older templates kept their old behavior. The widget now groups logs under one heading per day (the note's `date`, else `date_start`, else the date in its filename), with that day's daily note, work sessions and meetings beneath it in time order. A note is labelled by its `title:` if it has one, else by its filename without the leading date. **Copy results** writes `## day` and `### note` headings. An End date alone now means "up to that date", not "only that day". It only scans notes that link the host note, so it is faster in large vaults. The vault also bundles a tenth community plugin, AutoDater, which fills `date_created` and `date_modified` when you edit a note (templates under `System/Templates` are excluded).

**What you do:** Approve the SOP's preview and the note-level step. After the upgrade, switch AutoDater on in Settings, Community plugins, if Obsidian left it off. Saved filters stay as they were, but a saved End date alone now shows everything up to that date.

**What the SOP does:** Copies `System/Scripts/advanced-log.js`, the AutoDater plugin code (`.obsidian/plugins/autodater/main.js`, `manifest.json`, `styles.css`), `README.md` and `Start Here/` (`tasks-and-logs.md`, `first-hour.md`, `obsidian-basics.md`, `troubleshooting-and-upgrading.md`), and shows the merge files for you to choose: `System/Templates/Templater/Sub-templates/Dataview queries/Advanced log template.md`, `.obsidian/community-plugins.json` (adds `autodater`) and `.obsidian/plugins/autodater/data.json`. Then, with your approval:

1. **Project and person notes:** finds every `dataviewjs` block that contains `advanced-log-search` and replaces that block, and only that block, with `await dv.view("System/Scripts/advanced-log")` inside a `dataviewjs` fence. Other `dataviewjs` blocks in the note (such as the Promote button) stay. Back up first: the old block is gone after the swap.

**Removed files:** none.

## 3.5.0

**What changed:** Agent roles. Most SOPs now belong to one of six roles: librarian (ingest, new notes, merges), researcher (questions answered with citations), project manager (reviews, projects, meetings), tester (lint, optimizer), developer (proposals for changes to the system) and builder (carries out an approved proposal). A short role file in `AI-OS/Agents/` says where the role may write, what it must not do and when it is done; `AI-OS/Agents/README.md` holds the shared rules: re-read what you wrote before calling it done, and end with a four-line report (changed, checked, not verified, open). The roles table is section 7 of `AGENTS.md`; a request to change a template, SOP, Base or field goes to the developer, who proposes and waits for your sign-off. In Claude Code, `.claude/agents/` lets the main session hand a task to a role as a helper. The [[optimizer]] gains a sixth check: every role has a stub and every stub a role. [[lint]] now writes its log line also when you pick no fixes. `AGENTS.md` lost its Tool notes section and two sentences that other files already say (subagents in `routing.md`, filing answers in [[query]]).

**What you do:** Approve the SOP's preview. Nothing to change in your notes.

**What the SOP does:** Copies the system files (`AGENTS.md`, `AI-OS/Agents/`, `.claude/agents/`, `AI-OS/SOPs/optimizer.md`, `AI-OS/SOPs/lint.md`, `Start Here/ai-setup.md`) and shows the merge files for you to choose: `AI-OS/routing.md` (the role sentence in steps 1 and 3; your My SOPs section stays) and `AI-OS/README.md` (the Agents row and the ownership table). No note-level steps.

## 3.4.1

**What changed:** Fixes from live testing. The AoR Review's Open tasks column now counts tasks on an Area's projects and sub-projects, not only tasks linked straight to the Area. The Due strip at the top of the daily note is gone. New note, framework and source notes no longer ask for a topic: `up:` stays in the note, empty, and is optional; the Notes.base view "No up" lists those notes, most linked first. A new organization asks one question, a new top-level organization or part of an existing one, and no longer offers Areas; it has no `people:` field, and its People section lists everyone whose `up:` points at it (People.base view "People here"). A person's `up:` is their organization, or an Area for a private contact. Parent prompts no longer list template files.

**What you do:** Approve the SOP's preview and the optional note steps. Daily notes you already have keep their Due strip; it shows only on today's note, so it disappears from view after today.

**What the SOP does:** Copies the system files (`AI-OS/Schemas/`, `AI-OS/SOPs/lint.md`, `AI-OS/Vault-Map.md`, `Dashboards/AoR Review.md`, `Start Here/rhythm.md`) and shows the merge files for you to choose: the daily, note, framework, source, organization and person templates, `System/Bases/AoR Review.base`, `Notes.base` and `People.base`. Then, with your approval:

1. **Organization notes:** offers to remove an empty `people:` key and to add the People section with the "People here" view. A filled `people:` key is shown to you first: move those people's `up:` to the organization, or keep the key.

**Removed files:** none.

## 3.4.0

**What changed:** New [[optimizer]] SOP: once a month (the [[monthly-review]] runs it, or say "run the optimizer") the AI audits its own setup. It checks that template fields match the field registry, that the files it reads every session stay within their word caps, that every routing row points at a real SOP, and that lessons in `memory.md` are not already covered by a rule. It reports four numbers that show whether your feedback reaches the AI: feedback lines captured, lessons promoted, rules added, lint findings that keep coming back. It reads and proposes; it changes nothing on its own. Every SOP that edits a note now sets `date_modified`, so staleness checks can trust it. Lint's log entry counts findings per category. The template's GitHub repo has a "Feedback from use" issue form, and the optimizer can draft one from your procedure notes. `Start Here/rhythm.md` embeds the optimizer checklist under Monthly.

Project and task changes from use: a new project asks one question, Work, Personal or Learning, then where it sits. A learning project points `up:` to the project it serves (or to Personal or Work) and carries `[[Learning]]` in `related:`; it shows on its project under Sub projects, so the Related learning view is gone. Project notes put Goal above Tasks, Log right below Tasks, and Retro last. The Close project button and command are gone: you close a project with the Status field at the top and the end date in the Retro, and the Retro is three Meta Bind lists (`retro_worked`, `retro_change`, `retro_lessons`). Child notes leave out tasks. The stored `area:` field is retired: a note's Area is the top of its `up:` chain, and a task's `contexts:` is that Area in lowercase. New task lists your top-level Areas as contexts; with no project it points `up:` at the Area you pick, and with a project it sets the context from the project. The Tasks dashboard and AoR Review fall back to the context for a task with no Area on its `up:` chain. Lint now checks `contexts:` against `up:` instead of `area:`.

**What you do:** Approve the SOP's preview and each batch of note changes. The first optimizer run counts the whole log as its baseline. Close projects with the Status field from now on.

**What the SOP does:** Copies the system files (the new `optimizer` SOP, the changed SOPs, `AI-OS/Standards/sop-format.md`, `AI-OS/Schemas/`, `Start Here/rhythm.md`, `Start Here/tasks-and-logs.md`, `Dashboards/AoR Review.md`) and shows the merge files for you to choose: `AI-OS/routing.md` (one new row; your My SOPs section stays), `AI-OS/README.md` (the SOP list), the project, meeting, work-session and New task templates, `Projects.base`, `Notes.base`, `Tasks.base`, `.obsidian/types.json` and the Templater `data.json` (the Close project hotkey is gone). Then, in approved batches of ten:

1. **Open tasks without `up:`:** a task whose context names a top-level Area gets `up:` to that Area.
2. **`contexts:`:** an open task whose context differs from the Area its `up:` chain reaches gets that Area in lowercase.
3. **Learning projects:** `[[Learning]]` moves from `up:` to `related:`, and you pick the new `up:`: the project it serves, or Personal or Work.
4. **Project notes:** offers to remove the Related learning heading and its embed and the old Close project button, and to replace the old Retro bullets with the new Retro section (text you wrote moves into the lists).
5. **`area:` keys:** offers to delete them. Optional; nothing reads them any more.

**Removed files:** `System/Templates/Templater/Commands/close-project.md`.

## 3.3.0

**What changed:** Five new SOPs give the vault a rhythm: [[weekly-review]], [[monthly-review]], [[project-lifecycle]], [[meeting-close]] and [[merge-notes]], each with a routing row and a manual checklist. The daily review also sweeps `Fleeting/` and the Brain dump section, and "develop my fleeting notes" grows one or two fleeting notes. Ingest checks for duplicates, writes Citations and a Tensions section for conflicting claims, and takes PDFs (the original stays, the extracted text sits beside it). Query files good answers back as notes. Lint runs weekly on changed notes and monthly in full, leaves a summary line in `log.md`, proposes maps of content and stub fill-ins, and has a short incremental mode. Onboarding reads what is already in the vault and asks only about gaps. New views: Stale 14 days (Tasks), No open task (Projects), Stubs (Topics); the AoR Review counts open tasks and has a checklist, and the monthly note embeds it. The daily note gets a Due strip (today only, empty when nothing is due); the weekly note gets Carries forward and System friction lines and no longer mentions `type: decision`. New guide `Start Here/rhythm.md` with every review checklist; it replaces "Guide to writing daily notes".

**What you do:** Approve the SOP's preview. Existing daily, weekly and monthly notes keep their layout; new ones get the new sections. Write on the weekly note's System friction line when something in the vault annoys you.

**What the SOP does:** Copies the system files (the new and changed SOPs, `Start Here/rhythm.md`, the changed guides, `Dashboards/AoR Review.md`) and shows the merge files for you to choose: `AI-OS/routing.md` (five new rows; your My SOPs section stays), the daily, weekly and monthly templates, `System/Bases/Tasks.base`, `Projects.base`, `AoR Review.base`, `Atlas/Topics/Topics.base` and `AI-OS/README.md` (the SOP list). Then one note-level step, in approved batches of ten: notes of yours that link "Guide to writing daily notes" get the link changed to [[rhythm]]; the SOP shows how many first.

**Removed files:** `Start Here/Guide to writing daily notes.md`.

## 3.2.0

**What changed:** Every frontmatter field is now listed in a field registry (`AI-OS/Schemas/note-schema-reference.md`), and adding a field or note type needs your sign-off. Knowledge notes need `up:`: new note, source, person, organization and framework notes ask for their parent. Notes the AI writes carry `ai:` (`pending`, `approved`, `collaborative`, `checked`) instead of a whole-note `%% #AI-Assisted %%` comment; an "AI notes awaiting review" view lists the pending ones. Sources get optional `author:` and `date_published:`. New organization and framework templates, both in Promote note. New projects ask "Work and personal, or Learning?"; learning projects live in `Efforts/Learning/<Subject>/` under a new Learning Area, and show on the work project they serve under Related learning. Projects get a Retro section and a Close project button. Projects, tasks, meetings and work sessions carry `area:`, the top-level Area; New task and the project template copy it from the parent, and lint proposes it on meetings and work sessions. Closed efforts move to a new `Archive/` folder at the monthly review, which search skips; TaskNotes archives tasks to `Archive/Tasks/<year>/`. The daily note's Due block is now Next actions, earliest due first. Lint checks your notes against these rules.

**What you do:** Approve the SOP's preview and each batch of note changes. Pick a parent when the SOP lists notes without `up:` (or skip a note to leave it for later). From now on, move closed projects and Areas to `Archive/` inside Obsidian at the monthly review.

**What the SOP does:** Updates every file this release changed: system files are copied; merge files (templates, Bases, `.obsidian/app.json`, `.obsidian/types.json`, the Omnisearch, Templater and TaskNotes `data.json`) are shown for you to choose; keep TaskNotes' new archive folder if you want archived tasks in `Archive/`. Copies in `Efforts/Areas/Learning.md` and `Archive/README.md` if you have none. Then, in approved batches of ten:

1. **`up:`:** lists notes of type note, framework, source, person and organization with no `up:`, and asks you for each one's parent.
2. **`ai:`:** a note whose first body line is `%% #AI-Assisted %%` gets `ai: pending` and loses that line (`/Drafted` becomes `approved`, `/Collaborative` becomes `collaborative`, `/Reviewed` becomes `checked`). A comment further down marks a section and stays.
3. **`area:`:** open projects (`backlog`, `active`, `waiting`) and open tasks get `area:` from the Area at the top of their `up:` chain. Closed ones are left; the Tasks views find their Area through `up:` anyway.
4. **Archived tasks:** offers to move notes in `Efforts/TaskNotes/Archive/` to `Archive/Tasks/<year>/` through Obsidian.

**Removed files:** none.

## 3.1.0

**What changed:** The Log decision and Log risk commands are gone, and so are the Decisions queries in the weekly, monthly, quarterly and yearly templates; a `#log/decision` tag still works and a search finds it. The phone toolbar buttons get their own icons, set by a new startup template (`System/Templates/Templater/Startup/command-icons.md`). New task asks for the context (`personal` or `work`) before the TaskNotes window opens, and writes `- [t] [[task - ...]]` without `#task`; older `[t] #task` lines still count in every log. New project notes: a Summary box under Status, Goal under Tasks, one table for meetings and work sessions (`Meetings.base` now holds both, with a detailed view for each), then the Advanced log only. New person notes: About box at the top, Advanced log only. New type `ai-agent` in `Atlas/Entities/Agents/`, with a starter note `Claude tasks`: TaskNotes' Assignees field now suggests people and AI agents from all of `Atlas/Entities`. Existing project and person notes keep their layout.

**What you do:** Approve the SOP's preview. Pick personal or work when New task asks. If you made your own note for AI tasks, set `type: ai-agent` on it, or delete it and use `Claude tasks`.

**What the SOP does:** Updates every file this release changed: system files are copied, merge files (templates, Bases, `.obsidian/app.json`, `.obsidian/plugins/templater-obsidian/data.json`, `.obsidian/plugins/tasknotes/data.json`) are shown for you to choose. Copies in `Atlas/Entities/Agents/Claude tasks.md` if you have no note by that name.

**Removed files:** `System/Templates/Templater/Commands/log-decision.md`, `System/Templates/Templater/Commands/log-risk.md`.

## 3.0.1

**What changed:** The phone toolbar (above the keyboard) gets buttons for log bullet, new task, log decision and log risk, plus the usual editing buttons. It is set in `.obsidian/app.json`.

**What you do:** Nothing. If you prefer your own set, change it on the phone in Settings, Toolbar.

**What the SOP does:** Shows the difference in `.obsidian/app.json` (a merge file) and lets you take the new toolbar, keep yours, or combine them.

**Removed files:** none.

## 3.0.0

**What changed:** Breaking release. The AI's rules moved out of `AI-OS/Me.md` into `AGENTS.md` at the vault root, now the rulebook for every AI tool; `CLAUDE.md` is one line importing it. `Me.md` keeps only your profile and My additions (your own rules, which apply on top). New `AI-OS/memory.md`: the AI notes your feedback in its Inbox and folds it into lessons at the next session start. `AI-OS/state.md` gained Last operation, Open threads and Pending decisions sections. The note schema is split: `AI-OS/Schemas/note-schema.md` is now a short core the AI reads before writing a note, and every field in detail moved to the new `AI-OS/Schemas/note-schema-reference.md`. The [[query]] SOP climbs a five-rung navigation ladder (topic page, backlinks, map of content, folder `index.md` or Base, search last), and every SOP that creates an Atlas note keeps the folder `index.md` current. New `AI-OS/Standards/sop-format.md` sets one shape for every SOP (`type: sop`, `version:` and `summary:` in the frontmatter, Steps, Output, a manual checklist), and the shipped SOPs follow it. Your own SOPs keep working as they are; reshape them when you next edit them. New [[onboarding]] SOP: say "set up my vault" and the AI interviews you and fills in `Me.md`; it replaces the long prompt in `START-HERE.md`, and the AI offers it while `Me.md` still has placeholders. `Raw/Ideas/` is removed: your own ideas live in `Fleeting/`. The `simmering` status is retired: areas use `active`, `backlog` and `dropped`, where `backlog` means not in focus now. The AoR Review lists only `active` areas, and the Efforts *Active* view reads `active` and `waiting`. New guide `Start Here/ai-setup.md` replaces `working-with-ai` and `skills-setup` and is the only place for skill install steps. `AI-OS/Skills/README.md` now holds an installed-skills table. `Me.md`, `state.md`, `memory.md` and `log.md` in `AI-OS/` carry a "Private file" header in new copies.

**What you do:** Approve the SOP's preview. If you changed the "Rules for the AI" section in your `Me.md`, decide which of your changes to keep as My additions when the SOP asks. If you prefer, move your notes out of `Raw/Ideas/` into `Fleeting/` through Obsidian before you upgrade.

**What the SOP does:** Updates every file this release changed: system files are copied, merge files are shown for you to choose. Copies in `AI-OS/memory.md` and adds whichever of the three new section headings your `AI-OS/state.md` lacks, below what is there. Shows the "Rules for the AI" section of your `Me.md` (the template shipped exactly seven numbered rules there; anything else is yours), moves any rule you added there into My additions, and removes the section with your approval; it also removes the `- [none yet]` line under My additions. Your other `Me.md` sections stay as they are. Then, with Obsidian open, in batches of at most ten notes: sets `status: simmering` to `backlog`; in every note's status selector, replaces `option(simmering)` with `option(backlog)`, or drops it where `option(backlog)` is already listed; sets `status: active` on area notes in `Efforts/Areas/` that have no `status:`, so the AoR Review still shows them; moves the notes in `Raw/Ideas/` you approve into `Fleeting/` with `type: fleeting`; repoints links to `working-with-ai` and `skills-setup` in your notes to [[ai-setup]]; offers to add the "Private file" header to your `Me.md`, `state.md` and `log.md`. Last, it trashes the `Raw/Ideas/` folder once it is empty.

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
