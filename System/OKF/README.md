# System/OKF — optional knowledge-export tooling

**You can ignore this entire folder.** Your vault works fully without it. Nothing here
touches your notes, your daily workflow, or how Obsidian behaves. Delete the folder and
the vault still runs exactly the same.

## What it is

[Open Knowledge Format (OKF)](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
is Google's spec for representing a knowledge base as plain markdown + YAML frontmatter:
readable by humans, parseable by any AI, diffable in git, portable across tools. Your
`Atlas/` layer is already built to conform. This folder is the small toolkit that
**validates** that conformance and **exports** a clean, tool-agnostic copy on demand.

## Who it's for

Keep it if you ever want to:

- feed your knowledge base to another AI tool without Obsidian-specific syntax getting in the way,
- migrate off Obsidian someday with a clean export in hand,
- keep a CI guardrail that catches malformed notes (any `Atlas/` concept missing a `type:`).

If none of that matters to you, ignore the folder or delete it.

## What's inside

| Path | Role |
|---|---|
| `okf-conformance.md` | The spec doc: what conforms, native-vs-export differences, field mapping |
| `scripts/okf-validate.mjs` | Asserts every `Atlas/` concept note has a non-empty `type:` (runs in CI) |
| `scripts/okf-export.mjs` | Writes a conformant bundle to `System/OKF/dist/okf/` (gitignored) |
| `scripts/okf-lib.mjs` | Shared parsing/link/frontmatter helpers |
| `scripts/*.test.mjs` | Unit tests for the above |
| `dist/okf/` | Generated export output. Gitignored, regenerable, safe to delete |

## Running it

From the vault root:

```bash
npm install            # first time only, installs 2 small deps
npm run okf:validate   # check every Atlas concept has a type
npm run okf:export     # write the bundle to System/OKF/dist/okf/
npm test               # run the unit tests
```

## The three unavoidable stubs elsewhere

npm and GitHub require three files at fixed locations that cannot live in this folder:

- `package.json` + `package-lock.json` (repo root) — npm manifest and lockfile
- `.github/workflows/lint.yml` — CI runner; calls `npm run okf:validate`

Everything else OKF-related lives here.
