# OKF Conformance Build-Out — Design Spec

**Date:** 2026-07-07
**Repo:** Munin-Template-Vault
**Status:** Approved design, pre-implementation
**Spec source:** [OKF v0.1 SPEC](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)

## Overview

Munin-Template-Vault already borrows from Google's Open Knowledge Format (OKF): the note schema calls `type` "OKF-compatible" and `description` an "OKF SHOULD field," and folder `README.md` files carry a progressive-disclosure `## Index` section (OKF's index-file role). This project finishes the job: make the vault a genuine, documented OKF v0.1 bundle while keeping it fully usable in Obsidian.

The core tension OKF creates for an Obsidian vault is links: OKF recommends bundle-relative `/path.md` links, Obsidian uses `[[wikilinks]]`. Resolution: **author natively with wikilinks; convert to bundle-relative paths at export time.** The on-disk vault stays Obsidian-first; a strictly conformant OKF bundle is produced on demand.

## Goals

- The `Atlas/` knowledge layer is a conformant OKF v0.1 bundle after export.
- Native frontmatter, folder index files, and changelog follow OKF conventions without breaking Obsidian.
- A repeatable exporter produces a strict OKF bundle (`dist/okf/`) from `Atlas/`.
- A validator enforces conformance in CI.
- One schema doc states the conformance claim and the native-vs-export split.

## Non-Goals

- Exporting Raw, Calendar, Efforts, or AI-OS as shared knowledge (out of bundle scope).
- Replacing wikilinks with `/path` links on disk.
- Restructuring the ACE folder model or the idea compass.
- Building a bundle *importer* (OKF → vault). Export only, for now.

## Locked Decisions

| # | Decision | Choice |
|---|---|---|
| A | Exportable bundle boundary | **`Atlas/` only.** Raw / Calendar / Efforts / AI-OS excluded. |
| B | Canonical-URI field name | **Rename `url:` → `resource:`** (OKF field name) in the source template and schema. |
| C | Exporter parsing | **Add `package.json` + `gray-matter` (+ `js-yaml`).** `npm run okf:export` / `okf:validate`. |

## OKF Field Mapping

The native (Obsidian) frontmatter maps to OKF as follows. Native fields stay; the exporter normalizes to the OKF-canonical set.

| OKF field | OKF status | Native vault field | Handling |
|---|---|---|---|
| `type` | REQUIRED | `type` | Identical. Already required on every note. |
| `title` | recommended | filename | Optional native `title:` only when display name must differ from filename; else exporter derives from filename. |
| `description` | recommended | `description` | Identical. |
| `resource` | recommended | `resource` (renamed from `url`) | Canonical URI for `source` notes and entities. |
| `tags` | optional | `tags` | Identical. |
| `timestamp` | optional | `created-date` (YYYY-MM-DD) | Native keeps `created-date` (creation). Exporter emits OKF `timestamp` (ISO 8601) from `created-date`, falling back to git last-commit time. |

Compass keys (`up`, `related`, `down`, `challenges`), `topics`, and `status` are Munin extensions. OKF requires consumers to preserve unknown keys, so they pass through export untouched.

## Native Changes (on-disk, Obsidian-safe)

1. **Index files.** Rename each `Atlas/**/README.md` → `index.md` (OKF §6 reserved name). Content and the appended `## Index` listing are preserved. Update any wikilinks/embeds that target these files. Root `README.md` stays (GitHub landing page).
2. **Frontmatter.** Extend `AI-OS/Schemas/note-schema.md` to document the full OKF field set above. Rename `url:` → `resource:` in `System/Templates/source-capture.md` and the schema.
3. **Log file.** Add `Atlas/log.md` (OKF §7): ISO-dated entries, newest first, prose prefixed with `**Creation**` / `**Update**`. The ingest and new-note SOPs append one line per knowledge change.
4. **Citations.** Document the `# Citations` heading convention (OKF §8) in the schema for source-backed notes, aligning the existing Sources practice.

## Exporter

`.github/scripts/okf-export.mjs` (Node ESM, matches existing `check-wikilinks.mjs` placement).

- **Input:** `Atlas/`. **Output:** `dist/okf/` (gitignored), mirroring the Atlas tree.
- **Transforms:**
  - Resolve `[[wikilink]]` and `[[wikilink|alias]]` to bundle-relative `/path.md` via a title→file map built from the Atlas tree. Unresolved links: leave the visible text, drop the link, emit a warning (OKF requires consumers to tolerate broken links; exporter does not emit them).
  - Strip non-portable Obsidian constructs: `![[*.base]]` embeds, `%% comment %%` blocks. Keep standard markdown body intact.
  - Normalize frontmatter to the OKF-canonical set: guarantee non-empty `type`; emit `timestamp`; derive `title` when absent; rename `resource` already handled natively.
  - Copy `index.md` / `log.md` reserved files through, rewriting their links the same way.
- **Deps:** `gray-matter` (frontmatter), `js-yaml` (emit). Declared in `package.json`.

## Validator + CI

`.github/scripts/okf-validate.mjs` (or `okf-export.mjs --check`) asserts OKF conformance against native `Atlas/`:

- Every non-reserved `.md` has parseable YAML frontmatter.
- Every frontmatter block has a non-empty `type`.
- Reserved files (`index.md`, `log.md`), where present, match OKF structure.

Nonzero exit on failure. Wired into `.github/workflows/lint.yml` beside `check-wikilinks.mjs`.

## Schema Doc

New `AI-OS/Schemas/okf-conformance.md`:

- States OKF v0.1 conformance claim for the exported `Atlas/` bundle.
- The field-mapping table (above).
- Native-vs-export split: what is true on disk vs what the exporter produces.
- How to run `npm run okf:export` and `okf:validate`.
- Cross-linked from `note-schema.md` and the README OKF credit line.

## Files Touched

- **New:** `AI-OS/Schemas/okf-conformance.md`, `Atlas/log.md`, `.github/scripts/okf-export.mjs`, `.github/scripts/okf-validate.mjs`, `package.json`.
- **Renamed:** `Atlas/**/README.md` → `Atlas/**/index.md`.
- **Edited:** `AI-OS/Schemas/note-schema.md`, `System/Templates/source-capture.md`, `AI-OS/SOPs/ingest.md`, `AI-OS/SOPs/new-note.md`, `AI-OS/SOPs/lint.md`, `.github/workflows/lint.yml`, `README.md` (credit line), `.gitignore` (`dist/`, `node_modules/`), `CHANGELOG.md`.
- **Release:** conventional `feat:` commit; release-please picks it up.

## Conformance Criteria (done = true)

1. `npm run okf:validate` passes on native `Atlas/`.
2. `npm run okf:export` produces `dist/okf/` where every non-reserved `.md` has non-empty `type` and parseable frontmatter, and no wikilink survives (all resolved to `/path.md` or downgraded to text).
3. `okf-conformance.md` documents the claim and is reachable from note-schema + README.
4. Obsidian still opens the vault with working wikilinks and folder notes (`index.md`).
5. CI (`lint.yml`) runs the validator and fails on a type-less note.

## Out of Scope / Future

- OKF importer (bundle → vault).
- Publishing the exported bundle anywhere (CI artifact only).
- Per-subfolder sub-bundles inside Atlas.
