# Upgrading

How to move a vault made from this template to a newer release. Each version below has one section: what changed, what you do, and what the [[upgrade-vault]] SOP does for you.

## How to upgrade

- **With an AI:** ask it to "upgrade the vault". It follows the [[upgrade-vault]] SOP: it reads your installed version, shows a preview of every file it would touch, and changes nothing until you approve. If your vault is older than 2.3.0 it has no copy of that SOP yet: point the AI at `AI-OS/SOPs/upgrade-vault.md` inside the unpacked new release.
- **By hand:** follow the manual checklist at the end of that SOP.

Before you start:

1. Download the new release ZIP from the template's GitHub Releases page and unpack it in a folder **outside** your vault. Never unpack it into the vault.
2. Close Obsidian and back up your vault.
3. Find your version: the first line of `AI-OS/state.md` (`Template version: x.y.z`), or the top entry of your `CHANGELOG.md` if that line is missing.

Which files an upgrade replaces, merges or leaves alone is set by the ownership table in `AI-OS/README.md`. Vaults older than 2.0.0 are not supported by the SOP: upgrade them by hand using the 2.0.0 breaking changes in `CHANGELOG.md`.

Each section uses the same four parts: **What changed**, **What you do**, **What the SOP does**, **Removed files**.

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
