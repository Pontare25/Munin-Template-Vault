# OKF Conformance

This vault targets [Open Knowledge Format (OKF) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) for its `Atlas/` knowledge layer. OKF represents knowledge as a directory of markdown files with YAML frontmatter: readable by humans, parseable by agents without SDKs, diffable in version control, and portable across tools.

The vault stays Obsidian-first on disk (wikilinks, Templater, Bases). Conformance is native and needs no tooling. A portable OKF **bundle** (wikilinks rewritten to relative paths, Obsidian syntax stripped) is *not* shipped as an exporter; see "Regenerating a bundle" below. Field mapping: [[note-schema]].

## The bundle

The exportable OKF bundle is **`Atlas/`** only — the permanent, shareable knowledge. `Raw/` (transient capture), `Calendar/` and `Efforts/` (personal), and `AI-OS/` (configuration) are deliberately excluded.

Reserved OKF filenames used natively:

- **`index.md`** (OKF §6) — folder listings / progressive disclosure. Every `Atlas/` subfolder has one.
- **`log.md`** (OKF §7) — the bundle changelog at [[Atlas/log]]. Distinct from [[AI-OS/log|the vault work log]], which records operational sessions.

Every other `Atlas/**/*.md` is a concept document and must carry non-empty `type:` frontmatter.

## Native vs export

| Aspect | On disk (Obsidian) | In the exported bundle (`System/OKF/dist/okf/`) |
|---|---|---|
| Links | `[[wikilinks]]` | bundle-relative `/path.md` links |
| Timestamp | `created-date:` (creation) | OKF `timestamp` (ISO 8601) |
| Obsidian extras | `%% comments %%`, `![[*.base]]` embeds | stripped |
| Frontmatter | Munin fields (compass, `topics`, `status`) + OKF fields | OKF-normalized; unknown keys preserved |

In an exported bundle, unresolved wikilinks would be downgraded to plain text rather than emitted as broken links (OKF asks consumers to tolerate broken links; an export emits none).

## Field mapping

See the table in [[note-schema]] under "OKF alignment". In short: `type` (required), `title` (defaults to filename), `description` (emitted from the note's native `summary:` field), `resource` (canonical URI, formerly `url`), `tags`, and `timestamp` (from `created-date`).

## Regenerating a bundle

No exporter ships with the template — the `Atlas/` layer is OKF-shaped on disk, which is all conformance requires. If you specifically need a portable bundle:

- The original Node exporter/validator (`okf-lib.mjs`, `okf-validate.mjs`, `okf-export.mjs`) lives in git history. Retrieve it from before it was removed, e.g. `git show 757a1b2^:System/OKF/scripts/okf-export.mjs`, and run it with `node` (it needs `gray-matter` + `js-yaml`), or
- have an AI assistant rebuild it from this spec: the logic is a short walk of `Atlas/`, rewriting wikilinks to relative paths and normalising frontmatter to the field mapping above.

## Conformance claim

The `Atlas/` layer is a conformant OKF v0.1 knowledge base on disk: every non-reserved `.md` carries parseable YAML frontmatter with a non-empty `type`, and reserved files (`index.md`, `log.md`) follow OKF structure. An exported bundle additionally rewrites wikilinks to bundle-relative or plain-text links.
