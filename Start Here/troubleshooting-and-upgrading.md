# Guide: Troubleshooting and Upgrading

Fixes for the problems new vaults hit most, then how upgrading to a newer template release works. Shortcuts are written for Windows and Linux; on a Mac read Ctrl as Cmd and Alt as Option.

## Troubleshooting

### Nothing works: no buttons, no templates, no task window

The community plugins are off. Obsidian starts a vault it does not trust in **Restricted mode**.

1. Open Settings, Community plugins.
2. If you see **Turn on community plugins**, click it.
3. Check that all nine plugins are switched on. The five the vault needs are Templater, Journals, Dataview, Meta Bind and TaskNotes.

### New notes in `Fleeting/` are blank

No properties and no **Promote note** button on a note you just created with Ctrl+N means Templater did not run on it.

1. Open Settings, Templater and, in the **File creation** section, switch on **Trigger Templater on new file creation**. Templater keeps this one setting per device, so every new computer or phone needs it once.
2. Delete the blank note and create it again.

### The Promote note button shows as code

The button is a small Dataview JavaScript block. Check that Dataview is on, and under Settings, Dataview, that **Enable JavaScript queries** is on (the vault ships with it on). Without the button, run `Templater: Insert Commands/promote-note` from the command palette (Ctrl+P).

### Raw text such as `INPUT[textArea:summary]` instead of a box

Those are Meta Bind fields. Switch on Meta Bind under Settings, Community plugins. The vault does not need Meta Bind's own JavaScript setting, so leave it off.

### Daily notes

- **Open today's note** with the command `Journals: Open today's note`. Daily notes come from the Journals plugin; Obsidian's core Daily notes plugin is off on purpose, so its commands are missing.
- **No calendar panel:** it opens in the right sidebar when Obsidian starts. If you closed it, press Ctrl+P and run `Journals: Open Calendar`.
- **An error about the quote of the day:** the daily template fetches a quote from the web, which fails offline. Delete the line that calls `tp.web.daily_quote()` near the top of `System/Templates/Journal-templates/daily-template.md` if you work offline or want no web calls.

### Dashboards or rollups are empty

- A new vault ships empty, so views stay empty until you have notes that match them. An empty rollup usually means nothing was captured or linked, not that something is broken.
- Dashboards are built on **Bases**, a core plugin: check that Bases is on under Settings, Core plugins, and that Obsidian is version 1.13.3 or newer (Settings, About).
- Rollups inside daily, weekly and monthly notes use Dataview. If they show an error, check that Dataview is on.

### A shortcut does nothing

Open Settings, Hotkeys and search the command, for example `new-task`. The vault binds four shortcuts: Ctrl+Alt+T (new task), Ctrl+Alt+L (log bullet), Ctrl+Alt+F (Omnisearch) and Alt+E (insert a template). Another plugin or your operating system may have taken the same keys; rebind them there. [[Hotkeys]] has the full list.

### Mobile

- The bundled plugins run on mobile too. Install the vault on the phone through your sync (see [[github-and-backup]]) and do steps 2 and 3 of [[first-hour]] on the phone itself: the Templater setting is per device.
- Phones have no keyboard shortcuts. Use the command palette instead: `Journals: Open today's note`, `Templater: Insert Commands/new-task` for a new task.
- If you back up with git, do not run the Git plugin on the phone; [[github-and-backup]] explains why and what to use instead.

### Still stuck

Ask your AI tool to read this guide and the file that misbehaves, or open an issue on the template's GitHub page with what you did, what you expected and what you saw.

## Upgrading

The template gets new releases. An upgrade brings your vault to the newer release without touching your notes.

### What is yours and what the template owns

Every file the template ships has one of three classes. The full table is in `AI-OS/README.md`, section "Who owns which file".

- **Yours (user):** your notes, `AI-OS/Me.md`, `AI-OS/state.md`, `AI-OS/memory.md`, `AI-OS/log.md`, `Atlas/log.md`, the starter Areas once you filled them in, and anything you added yourself, such as your own SOPs and skills. An upgrade changes these only through steps you approve, plus the version line at the top of `AI-OS/state.md`.
- **Shared (merge):** templates, Bases, folder READMEs, `AI-OS/routing.md`, Atlas `index.md` files and the `.obsidian` settings. An upgrade shows you the difference between your copy and the new one, and you choose per file: take the new one, keep yours, or combine them.
- **The template's (system):** the guides in `Start Here/`, the shipped SOPs, the schema, the root files such as this vault's README. An upgrade replaces them. If you edited one, it shows you your edit and backs it up first.

So: put your own rules in `AI-OS/Me.md` under My additions and your own procedures under My SOPs in `AI-OS/routing.md`, never inside a shipped SOP, and they survive every upgrade.

### How an upgrade runs

1. Find your version on the first line of `AI-OS/state.md` (`Template version: x.y.z`). Vaults older than 2.3.0 have no such line: use the top entry of your `CHANGELOG.md`.
2. Download the new release ZIP from the template's GitHub Releases page and unpack it in a folder **outside** your vault.
3. Close Obsidian and back up your vault.
4. With an AI: ask it to "upgrade the vault" and point it at `AI-OS/SOPs/upgrade-vault.md` in the unpacked release. It previews every file it would touch and changes nothing until you approve. Without AI: follow the manual checklist at the end of that SOP.

What changed in each version, and what you do for it, is in [[UPGRADING]].
