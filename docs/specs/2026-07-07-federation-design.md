# Vault Federation: Design Spec

**Date:** 2026-07-07
**Repo:** Munin-Template-Vault
**Status:** Approved design, pre-implementation
**Builds on:** [OKF Conformance](2026-07-07-okf-conformance-design.md), `.github/scripts/okf-*.mjs`

## Overview

Turn Munin-Template-Vault into a **federated** system: many personal vaults (one per employee, each built from this template) share one **company knowledge base** (a separate GitHub repo, itself a template instance). Each personal vault can:

- **Pull** company knowledge, shared SOPs, and standards into a read-only mirror that refreshes without touching personal content.
- **Contribute** selected notes back to the company repo through GitHub pull requests, with no write access to the company `main`.
- **Never** leak personal content by accident: nothing leaves unless the note carries an explicit share marker.
- Stay conformant to the shared schema; a schema change is itself a pull request.

The whole flow is operated by a non-technical user through an LLM agent narrating in plain language. The user never hand-runs git. Every git action is scripted, dry-runnable, diff-previewed, and confirmed before any push or PR.

The existing OKF exporter (`okf-export.mjs`) already sanitizes notes (strips comments and `.base` embeds, rewrites wikilinks to bundle-relative links, drops unresolved links to plain text, normalizes frontmatter). Federation reuses that transform as its sanitizer rather than reinventing it.

## Goals

- A personal vault refreshes company knowledge into `Company/` with a single narrated command, never clobbering personal notes.
- A personal note marked `share: company` can be contributed to the company repo as a GitHub PR, sanitized, provenance-stamped, and schema-validated, without the user touching git.
- Default-deny privacy: an unmarked note can never be contributed, enforced by the contribution filter, not by trust.
- Schema changes and shared-SOP changes travel through a separate governance PR path with a higher review bar.
- Personal-only frontmatter fields survive as OKF-tolerated unknown keys and never break the shared validator.
- Every git operation is agent-runnable with dry-run, diff preview, and explicit confirm-before-push / confirm-before-PR guardrails, plus graceful handling of missing `gh` auth.

## Non-Goals

- Real-time or automatic sync. Pull and contribute are explicit, user-initiated actions.
- Merging company edits into personal notes in place. The company mirror is read-only; to build on a company note you copy it into your own Atlas.
- Automating the maintainer's review and merge. That stays a human decision on the company repo.
- A bundle importer beyond the read-only mirror (no OKF-to-vault round-trip editing).
- Multi-company federation. One personal vault targets one company repo.

## Locked Decisions

Resolved with the user during brainstorming.

| # | Fork | Choice |
|---|---|---|
| 1 | Git topology | **Fork-per-employee.** Each employee forks the company repo on GitHub. The agent keeps a managed clone of that fork at a configurable local path and opens PRs fork to company `main`. True zero-write-to-main, GitHub-native, `gh`-automatable. |
| 2 | Company repo shape | **A template instance.** Same folder model and OKF scripts as a personal vault, holding curated shared `Atlas/` knowledge, shared SOPs, and the canonical schema. Template produces the company repo (one) and personal vaults (many). |
| 3 | Privacy seam | **Marker-gated, any-folder source; subset read-only mirror; type-routed to company `Atlas/`; separate governance path for AI-OS/schema.** A note is contributable only if it carries `share: company`. A risk-aware linter suggests candidates but never from `Raw/` or `Calendar/` and never past risk signals. |
| 4 | Conflict handling | **Read-only refreshed mirror.** `Company/` is wholesale-replaced on pull, so merge conflicts are impossible by construction. Contribution PRs are rebased on latest company `main` before opening; genuine conflicts are explained in plain language and left for the maintainer. |

## Architecture

### Two repos, one schema

```
Personal vault (employee machine)          Company repo (template instance, separate GitHub repo)
─────────────────────────────────          ──────────────────────────────────────────────────────
/  ← root = personal, source of truth       Atlas/            ← shared knowledge (all contribution dests)
   AI-OS/  Atlas/  Efforts/                  AI-OS/SOPs/       ← shared SOPs / standards
   Calendar/  Raw/                           AI-OS/Schemas/    ← canonical schema (source of truth)
   Company/  ◄─ pull: read-only ────────     .github/scripts/  ← OKF + federation tooling (shared)
     Atlas/      wholesale refresh,
     Standards/  never edited
     schema/
   .federation/  ← managed fork clone (git), gitignored, may live outside OneDrive
```

The schema lives canonically in the **company repo** (`AI-OS/Schemas/`). The template ships a copy so a fresh vault validates offline; the personal vault treats the company copy as upstream authority. Personal vaults never edit their local schema to diverge; they open a governance PR instead.

### New components

**Scripts** (`.github/scripts/federation/`, ESM, Node built-ins + existing deps only):

| File | Responsibility |
|---|---|
| `fed-lib.mjs` | Config loading, `gh`/git presence + auth detection, git command wrapper (dry-run aware), path resolution, provenance stamping. |
| `fed-pull.mjs` | Refresh the `Company/` mirror: fetch the company repo's exported bundle (shared Atlas + Standards + schema), wholesale-replace the mirror folder, report what changed. |
| `fed-suggest.mjs` | The candidate linter: scan personal notes, propose share-candidates, applying folder scope and risk-signal exclusions. Output a report; never write markers itself. |
| `fed-contribute.mjs` | Orchestrate a contribution: take a selection of marked notes, sanitize (reuse `okf-lib`), inject provenance, route by `type` to company `Atlas/` paths, validate, stage into the fork clone, commit, push, open PR. Every mutating step is dry-run / confirm gated. |
| `fed-govern.mjs` | The governance path: stage a proposed SOP or schema change into the fork against company `AI-OS/`, open a PR labelled `governance`. Separate from `fed-contribute` so a stray `share: company` on a personal SOP can never reach the standard. |

**Refactor** (small, in `okf-lib.mjs`): extract the per-file transform currently inline in `okf-export.mjs`'s loop into a reusable `sanitizeNote(absPath, titleMap, opts)` returning `{ frontmatter, body, warnings }`. Both `okf-export.mjs` and `fed-contribute.mjs` call it, so the exporter and the contribution flow can never sanitize differently.

**Config** (`AI-OS/federation.json`, committed template default + per-vault overrides):

```json
{
  "companyRepo": "org/company-knowledge",
  "fork": "employee/company-knowledge",
  "clonePath": ".federation/company-knowledge",
  "identity": { "name": "", "handle": "" },
  "mirror": { "folder": "Company", "include": ["Atlas", "AI-OS/SOPs", "AI-OS/Schemas"] },
  "share": {
    "marker": "share",
    "value": "company",
    "suggestFrom": ["Atlas", "Efforts"],
    "neverSuggestFrom": ["Raw", "Calendar", "AI-OS"],
    "riskSignals": { "tags": ["private", "confidential"], "patterns": ["\\b[\\w.+-]+@[\\w-]+\\.[\\w.-]+\\b"], "denylist": [] }
  }
}
```

**package.json scripts** (extend existing):

```
fed:setup      guided one-time setup (gh auth check, fork, clone, config)
fed:pull       refresh the Company/ mirror
fed:suggest    list share-candidates
fed:contribute sanitize + validate + PR the marked selection   (guardrailed)
fed:govern     open a schema / SOP change PR                    (guardrailed)
fed:status     show mirror freshness, marked notes, open PRs, auth state
```

**SOPs** (`AI-OS/SOPs/`, matching the existing lint/ingest style; the agent's narration script):

- `federation-setup.md`: one-time `gh auth login`, fork, clone, fill config.
- `federation-pull.md`: refresh company knowledge, narrate the diff.
- `federation-contribute.md`: suggest, confirm markers, preview sanitized diff, confirm push, confirm PR.
- `federation-schema-change.md`: the governance path for schema/SOP changes.

**User guide** (`AI-OS/Guides/federation-for-non-git-users.md`): plain-language, zero git assumed. What a fork/PR is in one paragraph, the one-time setup, and "how do I share a note" / "how do I get the latest company knowledge" walkthroughs with the exact phrases to say to the agent.

## Data Flow

### Pull (company → personal, read-only)

1. `fed:pull` verifies `gh` auth (graceful message if missing).
2. Fetch the company repo's exported OKF bundle for the mirror `include` paths (via `gh` API or a shallow fetch of the export artifact / `Atlas/` + `AI-OS/SOPs` + `AI-OS/Schemas`).
3. Wholesale-replace `Company/` (delete then rewrite). No merge, so no conflict.
4. Report added / changed / removed note counts. The user never edits inside `Company/`; to build on a note they copy it into their own `Atlas/`.

### Contribute (personal → company, knowledge)

1. `fed:suggest` (optional) proposes candidates; the agent asks the user per note; approved notes get `share: company` written to their frontmatter.
2. `fed:contribute` collects every note carrying the marker.
3. For each: `sanitizeNote` strips Obsidian extras, rewrites links, normalizes frontmatter; provenance injected (`contributed-by`, `contributed-from`, `contributed-at`, `origin-id`); destination path derived from `type:` via the schema's type-to-folder map, always under company `Atlas/`.
4. Validate the staged copies with `okf:validate`. Any failure blocks the whole contribution before git touches anything.
5. **Diff preview** shown to the user (source note vs sanitized company copy, and the sanitization report of what was stripped).
6. **Confirm-before-push:** rebase the fork clone on latest company `main`, commit (`feat: contribute <note title>`), push to the fork branch.
7. **Confirm-before-PR:** open the PR with an auto-built body (note list, contributor, source paths, sanitization report, validation result).
8. On merge (later, by a maintainer), the personal note gets a `shared-as: Company/Atlas/...` back-reference so future edits are "propose an update," not a fresh contribution.

### Govern (personal → company, schema / shared SOP)

1. `fed:govern` targets a proposed change to the company `AI-OS/Schemas/` or `AI-OS/SOPs/`.
2. Same guardrails, but staged against company `AI-OS/`, PR labelled `governance`, and the body states the rationale and the compatibility impact (does it break the shared validator?).
3. Personal-only fields never need this path: OKF preserves unknown keys, so a personal extension travels with a contributed note untouched and does not require a schema change.

## Privacy Enforcement (default-deny, structural)

- **The gate is the marker.** `fed-contribute` only ever reads notes where frontmatter `share == company`. Absence of the marker is the default and means "never leaves." This is code, not policy.
- **The linter is risk-aware.** `fed-suggest` proposes candidates only from `suggestFrom` folders, never from `neverSuggestFrom`, and skips any note matching a `riskSignal` (private/confidential tag, email pattern, denylisted term). It proposes; the human confirms each; only then is a marker written.
- **Sanitization is shared with the exporter.** `%% comments %%`, `.base` embeds, and HTML comments are stripped by the same `sanitizeNote` the OKF bundle uses, so a private aside inside a shared note is removed on the way out.
- **Governance is walled off.** AI-OS and schema changes cannot ride the knowledge flow; they need the explicit `fed:govern` path.

## Schema Governance

- The canonical schema is `AI-OS/Schemas/note-schema.md` + `okf-conformance.md` in the **company repo**.
- Personal extensions: allowed freely as OKF unknown keys; they must not be added to the shared required set locally. If a field should become shared, that is a `fed:govern` PR.
- A schema-change PR must keep `okf:validate` green on the existing company bundle (no field is made required without a migration). The PR body states the compatibility impact.
- Personal vaults never edit their local schema copy to diverge; local drift is a lint finding.

## Guardrails

- **Auth detection:** `fed-lib` runs `gh auth status`; on non-zero exit every command stops with the exact `gh auth login` instruction rather than a raw error.
- **Dry-run:** every mutating script accepts `--dry-run`, printing the git and `gh` commands it would run and the files it would change, touching nothing.
- **Diff preview:** contributions show the sanitized company copy and the strip report before any push.
- **Confirm-before-push and confirm-before-PR:** two distinct confirmation gates. The agent narrates each in plain language and stops for an explicit yes.
- **Conflict narration:** if the pre-PR rebase conflicts, the agent explains what diverged and offers to abort; it never force-resolves.

## Traceability

Injected into every contributed company copy:

```yaml
contributed-by: <identity.name>
contributed-from: <source path in personal vault>
contributed-at: <ISO date>
origin-id: <stable hash of source path + first-contribution time>
```

The PR (git history) is the permanent trace; the company `Atlas/log.md` records merges; the personal note's `shared-as:` closes the loop back.

## Testing

- **Unit tests** per script (`*.test.mjs`, matching the existing `node --test` setup): `fed-lib` (config, auth detection with a stubbed `gh`, dry-run command building), `sanitizeNote` refactor (parity with current export output), `fed-suggest` (folder scope + risk-signal exclusion), `fed-contribute` (type routing, provenance, validate-blocks-on-failure), `fed-govern` (targets AI-OS, refuses knowledge notes).
- **End-to-end acceptance (the definition of done):** from a real personal vault, mark a test note, run the flow, and open an actual PR against a real company repo on GitHub. "Done" is that PR existing, sanitized and validated, opened without the user running git by hand.

## Deliverables Mapping

| # | Goal deliverable | Covered by |
|---|---|---|
| 1 | Topology design doc + diagram | This spec (Architecture) |
| 2 | Pull / sync mechanism | `fed-pull.mjs`, `Company/` mirror, `federation-pull.md` |
| 3 | Contribution flow | `fed-contribute.mjs`, `federation-contribute.md` |
| 4 | Privacy boundary | Marker gate + risk linter + shared sanitizer |
| 5 | Schema governance | `fed-govern.mjs`, `federation-schema-change.md`, unknown-key rule |
| 6 | Agent automation + guardrails | SOPs + dry-run/diff/confirm gates + auth detection |
| 7 | Working tested code + git-free guide | `*.test.mjs` + `federation-for-non-git-users.md` + real PR |

## Known Non-Automatable Items

- **`gh auth login`** is interactive by design (browser OAuth). One-time, per machine; the setup SOP walks the user through it and every command detects its absence gracefully. Cannot be fully automated.
- **Maintainer review and merge** on the company repo is a deliberate human gate, not a limitation to remove.
- **Fork-clone location on Windows + OneDrive:** a live `.git` inside a OneDrive-synced folder risks sync corruption. `clonePath` is configurable and should default outside OneDrive where detectable; the setup SOP flags this. Not silently automatable across all machines.

## Open Questions for Implementation

- Exact company-bundle fetch mechanism for `fed-pull` (git shallow fetch of specific paths vs `gh` API vs a published export artifact). Decide during planning based on company-repo size.
- Whether `.federation/` clone is a full clone or a sparse/partial checkout to keep it small.
