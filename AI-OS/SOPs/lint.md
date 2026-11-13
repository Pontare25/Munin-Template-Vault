---
type: sop
version: 1
summary: Scan the knowledge graph for broken links, orphans, schema drift and stale indexes, and propose fixes
---

# SOP: Lint

Periodic health check of the knowledge graph. Lint finds problems and proposes fixes; it changes nothing without approval.

**Trigger:** the human says "lint", "check the graph", "broken links", "orphans", "graph health", or on a cadence the human sets.

## Steps

1. **Scan for findings**, in this order:
   - **Broken links:** wikilinks pointing at notes that do not exist (excluding topic stubs the ingest SOP is expected to create).
   - **Orphans:** notes in `Atlas/` with no inbound links and no `topics:` pointing at them.
   - **Missing topic pages:** subjects referenced in `topics:` fields with no page in `Atlas/Topics/`.
   - **Schema drift:** notes missing required frontmatter for their type (see [[note-schema]]), or tags other than `#example` (classification is the `type:` field, never a tag). For `Atlas/`, every note must carry a non-empty `type:` (OKF conformance); check this during the lint pass.
   - **Stale index lines:** folder `index.md` listings referencing notes that moved or no longer exist, or missing recent notes.
   - **Oversized indexes:** a folder `index.md` listing that has grown far past a quick scan (roughly 100 lines). Propose letting a Base serve as the index (see the growth path in the AI-OS README).
   - **Contradictions and stale claims:** notes that state conflicting things without an `opposes:` link between them; claims that time has overtaken.
2. **Write the report:** group findings by category, one line each (`path: problem`). State counts. Propose a fix per finding.
3. **Wait for approval.** The human picks which fixes to apply (all, some, none).
4. **Apply approved fixes** only. For contradictions, prefer linking both notes via `opposes:` over deleting either.
5. **Log it:** one [[AI-OS/log|log]] entry (`## [YYYY-MM-DD] lint | N findings, M fixed`).

## Output

A findings report grouped by category with counts, the approved fixes applied, and the step 5 log entry.

## Judgment calls

- Empty compass keys on a young topic stub are normal, not findings. Flag them only when a topic has five or more notes and still no compass.
- When unsure whether something is stale, ask; the human's memory outranks the file dates.

## Manual checklist (without an AI)

1. Look for broken links (Obsidian shows them in a fainter color), notes in `Atlas/` with no backlinks, and notes without `type:`.
2. Compare each folder `index.md` with the notes in that folder.
3. Fix what you find, or write it down for later.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
