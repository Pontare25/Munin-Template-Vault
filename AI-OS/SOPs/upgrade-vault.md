# SOP: Upgrade Vault

Move this vault to a newer template release without losing anything the human wrote. The ownership table in `AI-OS/README.md` decides what happens to each file; `UPGRADING.md` lists each version's changes and note-level steps. Steps 1 to 5 only read and end in a preview; nothing changes before the human approves it.

**Trigger:** the human says "upgrade the vault", "update to the new template version", "install the new release", or similar. A vault older than 2.3.0 has no copy of this SOP: read it from the unpacked new release.

## Steps

1. **Get the releases, outside the vault.** Ask the human to unpack the new release ZIP (from the template's GitHub Releases) in a folder **outside** the vault, or with git, fetch it from an `upstream` remote. Never unpack a release into the vault. If possible, also unpack the release the vault runs now: it shows which system files the human edited. Ask the human to close Obsidian; steps 7 and 8 may write to `.obsidian/`.
2. **Read the installed version.** It is the `Template version: x.y.z` line at the top of `AI-OS/state.md` (after its frontmatter, if any). If the line or the file is missing, take the newest version heading in the vault's own `CHANGELOG.md`; if that is missing too, ask the human. Stop and say why when the installed version is older than 2.0.0 (upgrade by hand using the 2.0.0 breaking changes in `CHANGELOG.md`), the same as the new release, or newer.
3. **Read `UPGRADING.md` from the new release.** Collect every section newer than the installed version, up to and including the new one, in version order.
4. **Classify every file.** Class every file in the new release with the ownership table in the new release's `AI-OS/README.md` (first match wins). Add the files listed under "Removed files" in the collected sections.
5. **Preview, changing nothing.** Show the human, per class:
   - **System:** files that are new, changed, or unchanged. Mark a changed file as **edited by you** when the vault's copy differs from the installed release's copy; without the installed release, mark every system file whose vault copy differs from the new one as possibly edited.
   - **Merge:** files whose vault copy differs from the new release.
   - **Plugin code:** per plugin, the vault's and the release's version from `manifest.json`, and whether it would be copied (only when missing or older in the vault).
   - **User:** a count only; these are never touched.
   - **Removed files** and the note-level steps from the collected sections, with how many notes each touches.

   Stop here and ask for approval. A dry run ends at this step.
6. **Back up.** Copy every system and merge file that will change, and every file to be removed, into a dated folder outside the vault (for example `vault-backup-YYYY-MM-DD/` next to the release). With git, suggest a commit first as well.
7. **Apply files.** Copy system files over (edited ones only after the human has seen the edit). For each merge file, show the difference and let the human choose: take the new version, keep theirs, or combine. In `AI-OS/routing.md`, any trigger row whose SOP the release does not ship moves under My SOPs. Copy plugin code only where step 5 said so. Copy `CHANGELOG.md` last, in step 9, so a stopped upgrade is never read as finished. Move removed files to Obsidian's trash folder (`.trash/`), never hard-delete.
8. **Run the note-level steps** from the collected sections in version order, in batches of at most ten notes, with the human's approval per batch. Move or rename notes only through Obsidian, so links survive.
9. **Record the version.** Update the `Template version:` line in `AI-OS/state.md`. If there is none, insert `Template version: <new version>` as the first line (after the frontmatter, if any), keeping everything else; create the file with just that line if it is missing. Then copy `CHANGELOG.md`.
10. **Log and report.** One [[log]] entry (`## [YYYY-MM-DD] upgrade-vault | x.y.z to a.b.c`) listing what changed. Ask the human to reopen Obsidian and confirm the plugins load. Report anything skipped or unsure.

## Judgment calls

- When unsure whether a file is the human's, treat it as theirs: show it and ask.
- Never edit a user file, except the version line in `AI-OS/state.md`.
- A failed or stopped upgrade can be undone from the backup folder; say where it is.

## Manual checklist (without an AI)

1. Close Obsidian, unpack the new release outside the vault, and back up the vault.
2. Read the `UPGRADING.md` sections newer than your version (first line of `AI-OS/state.md`, else the top of your `CHANGELOG.md`).
3. Copy the system files over; compare the merge files by hand; leave your own files alone.
4. Do the note-level steps the sections list, then set the version line.
