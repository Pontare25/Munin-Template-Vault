---
version: 1
summary: Move the vault to a newer template release, preview first, without losing anything the human wrote
---

# SOP: Upgrade Vault

The ownership table in `AI-OS/README.md` decides what happens to each file; `UPGRADING.md` lists each version's changes and note-level steps. Steps 1 to 5 only read and end in a preview; nothing changes before approval.

**Trigger:** the human says "upgrade the vault", "update to the new template version", "install the new release", or similar.

## Steps

1. **Get the releases, outside the vault.** Follow this SOP from the new release, never the vault's own copy. Ask the human to unpack the release ZIP from GitHub Releases in a folder **outside** the vault, or fetch it from an `upstream` git remote. If possible, also unpack the installed release: it shows which system files the human edited. Ask the human to close Obsidian; step 7 may write to `.obsidian/`.
2. **Read the installed version.** It is the `Template version: x.y.z` line at the top of `AI-OS/state.md` (after its frontmatter, if any). If the line or the file is missing, take the newest version heading in the vault's own `CHANGELOG.md`; if that is missing too, ask the human. Stop and say why when the installed version is older than 2.0.0 (upgrade by hand from `CHANGELOG.md`), equal to the new release, or newer.
3. **Read `UPGRADING.md` from the new release.** Collect every section newer than the installed version, up to and including the new one, in version order.
4. **Classify every file.** Class every new-release file with that release's ownership table (first match wins). Add the files listed under "Removed files" in the collected sections.
5. **Preview, changing nothing.** Show the human, per class:
   - **System:** files that are new, changed, or unchanged. Mark a changed file **edited by you** when the vault's copy differs from the installed release; without that release, mark every differing system file as possibly edited.
   - **Merge:** files whose vault copy differs from the new release.
   - **Plugin code:** per plugin, the vault's and the release's version from `manifest.json`, and whether it would be copied (only when missing or older in the vault).
   - **User:** a count only; these are never touched.
   - **Removed files** and the note-level steps from the collected sections, with how many notes each touches.

   Stop here and ask for approval. A dry run ends at this step.
6. **Back up.** Copy every system and merge file that will change, and every file to be removed, into a dated folder outside the vault (such as `vault-backup-YYYY-MM-DD/`). With git, also suggest a commit.
7. **Apply files.** Copy system files over (edited ones only after the human has seen the edit). For each merge file, show the difference and let the human choose: take the new version, keep theirs, or combine. In `AI-OS/routing.md`, any trigger row whose SOP the release does not ship moves under My SOPs. Copy plugin code only where step 5 said so. Copy `CHANGELOG.md` last, in step 9, so a stopped upgrade is never read as finished. Move removed files to Obsidian's trash folder (`.trash/`), never hard-delete.
8. **Run the note-level steps** from the collected sections in version order, in batches of at most ten notes, with the human's approval per batch. Ask the human to reopen Obsidian first: move or rename notes only through it, so links survive.
9. **Record the version.** Update the `Template version:` line in `AI-OS/state.md`. If there is none, insert `Template version: <new version>` as the first line after any frontmatter; create the file if it is missing. Then copy `CHANGELOG.md`.
10. **Log and report.** One [[log]] entry (`## [YYYY-MM-DD] upgrade-vault | x.y.z to a.b.c`) listing what changed. Ask the human to confirm the plugins load. Report anything skipped or unsure.

## Output

A preview; then the upgraded vault, its backup folder, and the step 10 log entry.

## Judgment calls

- When unsure whether a file is the human's, treat it as theirs: show it and ask.
- Never edit a user file, except the version line in `AI-OS/state.md` and the note-level steps the human approves in step 8. Copy in a shipped user file the vault lacks.
- A failed or stopped upgrade is undone from the backup folder; say where it is.

## Manual checklist (without an AI)

1. Close Obsidian, unpack the new release outside the vault, and back up the vault.
2. Read the `UPGRADING.md` sections newer than your version (first line of `AI-OS/state.md`, else the top of your `CHANGELOG.md`).
3. Copy the system files over; compare the merge files by hand; leave your own files alone.
4. Do the note-level steps the sections list, then set the version line.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
