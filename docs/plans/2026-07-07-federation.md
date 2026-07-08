# Vault Federation Implementation Plan

> **For agentic workers:** implement task-by-task. Each task ships code + tests, kept green (`npm test`). Design source: [federation design spec](../specs/2026-07-07-federation-design.md).

**Goal:** A personal Munin vault can pull company knowledge into a read-only mirror and contribute selected notes back as GitHub PRs, with default-deny privacy, schema validation, and full agent-narratable guardrails. The user never hand-runs git.

**Tech stack:** Node ESM (`.mjs`), `gray-matter` + `js-yaml` (existing deps), Node built-in `node:test`, `node:crypto`, `node:child_process`. Reuses `okf-lib.mjs`. Matches the existing `.github/scripts/okf-*.mjs` style.

## Global constraints

- Default-deny: a note is contributable only if frontmatter `share: company` is present AND its `type` routes to the company `Atlas/`. No marker, no contribution. Enforced in code.
- Sanitization is shared with the OKF exporter (`sanitizeContent` in `okf-lib`), so export and contribution can never diverge.
- Two distinct confirm gates: `--push` (commit + push to fork) and `--pr` (open PR). Neither happens without its flag. `--dry-run` writes nothing.
- `gh` auth is detected, never assumed; missing auth stops with the exact `gh auth login` instruction.
- Company mirror is wholesale-replaced on pull; never merged, so no conflicts.
- Governance (schema / shared SOP) uses a separate script and never rides the knowledge flow.
- Conventional commits: new capability `feat:`, docs `docs:`, tooling `chore:`.
- New scripts live in `.github/scripts/federation/`; `Company/`, `.federation/`, `dist/`, `node_modules/` gitignored where appropriate (Company mirror stays gitignored in the personal vault).

## Type routing (the router is also a privacy gate)

Only Atlas-resident types route to the company `Atlas/`. Everything else is blocked from contribution.

| Personal `type` | Company destination |
|---|---|
| `note` | `Atlas/Notes/` |
| `topic` | `Atlas/Topics/` |
| `moc` | `Atlas/MOCs/` |
| `framework` | `Atlas/Frameworks/` |
| `person` | `Atlas/Entities/` |
| `organization` | `Atlas/Entities/` |
| `source`, `project`, `area`, `daily`, `weekly`, `meeting` | **blocked** (personal/transient, never shareable knowledge) |

---

### Task 1: Shared sanitizer refactor + federation config

- Add `sanitizeContent(content, titleMap) => { content, warnings }` to `okf-lib.mjs` (strip Obsidian extras, resolve wikilinks, trim leading newlines). Refactor `okf-export.mjs` to call it. Existing `okf-export.test.mjs` must stay green (output identical).
- Add `AI-OS/federation.json` template config (companyRepo, fork, clonePath, identity, mirror.include, share marker + risk signals).
- Test: `sanitizeContent` parity test.

### Task 2: `fed-lib.mjs` (config, routing, privacy, provenance, gh/git)

- `loadConfig(root)`, `TYPE_DEST`, `destForType(type)`, `isShared(data, config)`, `riskSignals(data, content, config) => string[]`, `stampProvenance(data, {sourceRel, identity, now})`, `originId(sourceRel)`, `listVaultMarkdown(root, ignoreDirs)`, `checkGh(run?)`, `planGitCommands(...)`, `runCommands(cmds, {dryRun, cwd, run})`.
- `checkGh` and `runCommands` take an injectable runner so tests never shell out.
- Test: routing, isShared, riskSignals (email/tag/denylist), provenance + stable originId, checkGh parsing with a stubbed runner, dry-run returns the command plan without executing.

### Task 3: `fed-suggest.mjs` (candidate linter)

- `suggestCandidates(root, config) => { candidates: [...], heldBack: [...] }`: scan `suggestFrom` folders, skip `neverSuggestFrom`, skip already-shared, skip non-contributable types, hold back risk-signal notes with reasons.
- CLI prints a grouped report; writes no markers.
- Test: suggests a clean Atlas note; holds back an email-bearing note; skips a `project` type and a `Raw/` note.

### Task 4: `fed-contribute.mjs` (the contribution flow)

- `planContribution(root, config, {now, identity}) => { contributions, blocked }`: collect marked notes vault-wide, block non-contributable types and risk-signal notes (hard block even if marked), sanitize + stamp provenance, route by type, compute `destRel`.
- `writeStaged(plan, cloneRoot)`, `validateStaged(plan)` (every staged note parses + has type).
- CLI: preview by default (write staged + print diff + planned commands, no push); `--push` commits+pushes to fork; `--pr` opens PR with auto body; `--dry-run` plans only.
- Test: marked note routes + gets provenance; unmarked note ignored; marked `project` blocked; marked note with email blocked; validate catches a typeless staged note.

### Task 5: `fed-govern.mjs` (schema / SOP governance path)

- `planGovernance(root, config, {file}) => plan`: only operates on files under `AI-OS/`; refuses knowledge-note types; stages the proposed content into the clone at the same `AI-OS/...` path; PR labelled `governance`.
- Test: accepts an `AI-OS/Schemas/...` file; refuses a `type: note` file; PR body states compatibility impact.

### Task 6: `fed-pull.mjs` (read-only mirror refresh)

- `refreshMirror(sourceDir, mirrorDir, includes) => { added, changed, removed }`: wholesale-replace the mirror include paths from a fetched company checkout.
- CLI wires fetch (git shallow clone / `gh` fetch of the company repo) → `refreshMirror` → report. The live fetch needs a real company repo (blocked until one exists); `refreshMirror` is fully tested against local temp dirs.
- Test: mirror reflects source; removed source file disappears from mirror; excluded paths not copied.

### Task 7: Wiring, SOPs, guide

- `package.json`: add `fed:setup`, `fed:pull`, `fed:suggest`, `fed:contribute`, `fed:govern`, `fed:status`.
- `.gitignore`: `Company/`, `.federation/`.
- SOPs: `AI-OS/SOPs/federation-setup.md`, `federation-pull.md`, `federation-contribute.md`, `federation-schema-change.md`.
- Guide: `AI-OS/Guides/federation-for-non-git-users.md`.
- `CONTRIBUTING.md` / `README.md`: note the federation capability.

### Task 8: Integration

- `npm test` all green. `npm run okf:validate` still passes. Dry-run every `fed:*` command against the example vault and confirm the planned git/gh commands read correctly.
- Acceptance (blocked until prerequisites exist): `gh auth login` once + a live company repo, then a real contribution PR. Documented in the audit.

---

## Self-review

- Every design component maps to a task. Sanitizer refactor (Task 1) keeps export/contribute identical. Privacy is enforced twice (marker + type router + risk hard-block). Guardrails are flags, testable without shelling out (injectable runner). The only un-runnable pieces overnight are the live `gh` fetch/push/PR, gated on auth + a company repo, and isolated behind pure, tested core functions.
