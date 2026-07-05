# Contributing

Improvements to the template are welcome: clearer guides, better SOPs, fixes to templates or workflows. This page covers the one convention that matters and the ground rules.

## Conventional commits (required)

Releases are automated by [release-please](https://github.com/googleapis/release-please), which reads commit messages to decide version bumps and write the changelog. Every commit message (or at least every PR title, if the PR is squash-merged) must start with a type:

| Prefix | Use for | Version effect |
|---|---|---|
| `feat:` | New capability: a template, a SOP, a guide section | Minor bump (1.1.0) |
| `fix:` | Repairing something broken: dead link, wrong path, bad frontmatter | Patch bump (1.0.1) |
| `docs:` | Wording and documentation improvements | Patch, listed in changelog |
| `chore:` | Housekeeping nobody needs release notes for | No release |
| `feat!:` or `fix!:` | Breaking change to the schema or folder structure | Major bump (2.0.0) |

Examples:

```text
feat: add book source template
fix: correct daily notes folder in daily-notes.json
docs: clarify junction setup on Windows
feat!: rename topics field to subjects
```

After changes land on `main`, release-please opens (or updates) a release PR collecting them. Merging that PR publishes the release and updates [CHANGELOG.md](CHANGELOG.md). Nobody edits CHANGELOG.md by hand.

## Ground rules for content

- **English only**, written for AI-curious knowledge workers: explain concepts, never assume git fluency.
- **No personal data**, no real names, no employer references. Example content stays generic and carries the `#example` tag.
- **No em-dashes**: use colons, commas, or separate sentences. (House style, enforced by review.)
- **Lean by default:** new machinery (plugins, SOPs, fields) needs to justify itself against the growth path in [AI-OS/README](AI-OS/README.md). When in doubt, propose documentation instead of machinery.

## Checks

PRs run two checks (`.github/workflows/lint.yml`): markdown lint (rules in `.markdownlint.jsonc`) and a broken-wikilink check (`.github/scripts/check-wikilinks.mjs`). Run the wikilink check locally with `node .github/scripts/check-wikilinks.mjs` from the repo root.
