# Guide: Your First Hour

From a fresh copy of the vault to your first daily note, fleeting note, task and source. Each step says what you do and what you should see. If what you see is different, the step's **If not** line or [[troubleshooting-and-upgrading]] has the fix.

Shortcuts are written for Windows and Linux. On a Mac, read Ctrl as Cmd and Alt as Option.

## 1. Install and open (5 minutes)

1. Install [Obsidian](https://obsidian.md), version 1.13.3 or newer (the bundled plugins need it). Check under Settings, About.
2. Get a copy of the vault: **Use this template** on the GitHub page and then clone or download your new repository, or download the latest release ZIP and unpack it where you keep your notes.
3. In Obsidian, choose **Open folder as vault** and pick that folder.

**You should see:** the folders `AI-OS`, `Atlas`, `Calendar`, `Dashboards`, `Efforts`, `Fleeting`, `Raw`, `Start Here` and `System` in the left sidebar.

## 2. Turn on the plugins (2 minutes)

1. Obsidian asks whether you trust the author of this vault. Choose **Trust author and enable plugins**.
2. Open Settings, Community plugins.

**You should see:** nine installed plugins, all switched on. Five are required: Templater, Journals, Dataview, Meta Bind and TaskNotes. Four are helpers: Omnisearch, Text Extractor, Tag Wrangler and Minimal Theme Settings.

**If not:** if the page shows Restricted mode with a **Turn on community plugins** button, click it; then switch on any plugin that is still off.

## 3. Turn on the one per-device Templater setting (1 minute)

Open Settings, Templater and, in the **File creation** section, switch on **Trigger Templater on new file creation**.

Templater stores this one setting on each device, not in the vault, so it is off on every new computer or phone until you switch it on there. Without it, new notes in `Fleeting/` stay blank. Everything else ships already set.

## 4. Your first daily note (5 minutes)

1. Press Ctrl+P to open the command palette, type `Journals: Open today's note` and press Enter.
2. Write a few lines under **Brain dump**: whatever is on your mind.

**You should see:** a note named with today's date (for example `2026-11-13`), stored under `Calendar/Daily Notes/` in a year and month folder, with a quote of the day, a Daily Summary box, Brain dump, Today's top 3, Logs and Tasks sections.

The Journals calendar panel opens in the right sidebar; click a day to open its note. If you closed it, press Ctrl+P and run `Journals: Open Calendar` to bring it back.

This is the habit that matters: dump everything into today's daily note. You never need to decide where something goes at the moment you write it.

## 5. Your first fleeting note (5 minutes)

1. Press Ctrl+N.
2. A box asks for the note's name. Type one, or leave it blank to name it later.
3. Write an idea of your own in the body.

**You should see:** the new note in `Fleeting/`, with `type: fleeting` in its properties and a **Promote note** button at the top.

**If not:** properties missing and no button means step 3 is not done on this device. Switch it on, delete the blank note and press Ctrl+N again.

Fleeting notes are your ideas in transit. When one is worth keeping, **Promote note** turns it into a permanent note, a topic, a person, a project and more. The **Inbox** dashboard in `Dashboards/` lists every fleeting note waiting for you.

## 6. Your first task (5 minutes)

1. In today's daily note, put the cursor on an empty line under **Logs**.
2. Press Ctrl+Alt+T. The TaskNotes window for a new task opens.
3. Type a title. Optionally type `+` to link a project or Area, for example `Work`. Save.

**You should see:** a ticked line tagged `#task` that links your new task in the daily note, and the task note itself in `Efforts/TaskNotes/Tasks/`. Open the **Tasks** dashboard in `Dashboards/`: new tasks are scheduled for today, so expand **Today** and it is listed there.

Complete a task on its task card or in a task view, not on the reference line: that line does not follow the task's status. [[tasks-and-logs]] explains the whole task and log system.

## 7. Your first source and note (20 minutes)

### With an AI assistant

1. Paste a link or an article into your AI tool, opened in this folder, and say "ingest this".
2. The AI follows the ingest procedure (`AI-OS/SOPs/ingest.md`): it saves the source in `Raw/`, writes one note per idea in `Atlas/Notes/`, creates topic stubs, links everything and logs what it did.

**You should see:** a new source note in `Raw/Sources/`, new notes in `Atlas/Notes/` and an entry in `AI-OS/log.md`.

### Without AI

1. Press Ctrl+N, name the note after the source, then paste the article's text, or a link with a few lines on why it matters.
2. Click **Promote note** and pick `source`. The note becomes a source and moves to `Raw/Inbox/`.
3. Press Ctrl+N again, name the note after the idea, and write that idea from the source in your own words, a few sentences.
4. Click **Promote note** and pick `note`. It moves to `Atlas/Notes/`.
5. At the end of the note, add a line that links the source by its name, for example `Source: [[My source name]]`.

**You should see:** the source in `Raw/Inbox/` and your note in `Atlas/Notes/`, with your note linking to the source. Open the source and check its backlinks pane to see the link.

That is the loop by hand: capture, then promote what earns a permanent place. `Raw/Inbox/` holds sources not yet analyzed into the wiki; `Raw/Sources/` holds the ones that have been. The AI's ingest (`AI-OS/SOPs/ingest.md`) does that analysis: it adds notes, topics, indexes and a log entry, then moves the source from `Inbox/` to `Sources/`.

## What to read next

- [[obsidian-basics]]: just enough Obsidian to operate the vault: links, frontmatter, period notes, search.
- [[Guide to writing daily notes]]: the daily note, the surface you write into every day.
- [[tasks-and-logs]]: task notes, log markers and how the rollups work.
- [[working-with-projects]]: how a project ties meetings, people, tasks and logs together.
- [[linking-notes-and-maps]]: inline links, the idea compass, topics and Maps of Content.
- [[ai-setup]]: connecting an AI tool, the capture, ingest, query and review loop, privacy, and skills.
- [[github-and-backup]]: make the vault survive your computer.
- [[Hotkeys]]: the custom keyboard shortcuts.
- [[Recommended Obsidian Tutorials]]: videos if you want to go deeper.
- [[troubleshooting-and-upgrading]]: when something does not work, and how upgrades work.
