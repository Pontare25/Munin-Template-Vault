# OKF Conformance

This vault targets [Open Knowledge Format (OKF) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) for its `Atlas/` knowledge layer. OKF represents knowledge as a directory of markdown files with YAML frontmatter: readable by humans, parseable by agents without SDKs, diffable in version control, and portable across tools.

The vault stays Obsidian-first on disk (wikilinks, Templater, Bases). A conformant OKF **bundle** is produced on demand by an exporter. See the field mapping in [[note-schema]].

## The bundle

The exportable OKF bundle is **`Atlas/`** only — the permanent, shareable knowledge. `Raw/` (transient capture), `Calendar/` and `Efforts/` (personal), and `AI-OS/` (configuration) are deliberately excluded.

Reserved OKF filenames used natively:

- **`index.md`** (OKF §6) — folder listings / progressive disclosure. Every `Atlas/` subfolder has one.
- **`log.md`** (OKF §7) — the bundle changelog at [[Atlas/log]]. Distinct from [[AI-OS/log|the vault work log]], which records operational sessions.

Every other `Atlas/**/*.md` is a concept document and must carry non-empty `type:` frontmatter.

## Native vs export

| Aspect | On disk (Obsidian) | In the exported bundle (`dist/okf/`) |
|---|---|---|
| Links | `[[wikilinks]]` | bundle-relative `/path.md` links |
| Timestamp | `created-date:` (creation) | OKF `timestamp` (ISO 8601) |
| Obsidian extras | `%% comments %%`, `![[*.base]]` embeds | stripped |
| Frontmatter | Munin fields (compass, `topics`, `status`) + OKF fields | OKF-normalized; unknown keys preserved |

Unresolved wikilinks are downgraded to plain text with a warning rather than exported as broken links (OKF asks consumers to tolerate broken links; the exporter emits none).

## Field mapping

See the table in [[note-schema]] under "OKF alignment". In short: `type` (required), `title` (defaults to filename), `description`, `resource` (canonical URI, formerly `url`), `tags`, and `timestamp` (from `created-date`).

## Running it

From the vault root:

```bash
npm install            # first time only
npm run okf:validate   # assert every Atlas concept has a non-empty type
npm run okf:export     # write a conformant bundle to dist/okf/ (gitignored)
npm test               # run the exporter/validator unit tests
```

`okf:validate` runs in CI (`.github/workflows/lint.yml`) and fails the build on a type-less note. The exporter and validator live in `.github/scripts/` (`okf-lib.mjs`, `okf-validate.mjs`, `okf-export.mjs`).

## Conformance claim

After `npm run okf:export`, `dist/okf/` is a conformant OKF v0.1 bundle: every non-reserved `.md` has parseable YAML frontmatter with a non-empty `type`, reserved files follow OKF structure, and all links are bundle-relative or plain text.
