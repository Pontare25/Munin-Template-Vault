# SOP: Lint

Periodic health check of the knowledge graph. Lint finds problems and proposes fixes; it changes nothing without approval.

**Trigger:** the human says "lint", "health check", "check the wiki", or on a cadence the human sets.

## Steps

1. **Scan for findings**, in this order:
   - **Broken links:** wikilinks pointing at notes that do not exist (excluding topic stubs the ingest SOP is expected to create).
   - **Orphans:** notes in `Atlas/` with no inbound links and no `topics:` pointing at them.
   - **Missing topic pages:** subjects referenced in `topics:` fields with no page in `Atlas/Topics/`.
   - **Schema drift:** notes missing required frontmatter for their type (see [[note-schema]]), or `#type/` mirror tags disagreeing with the `type:` field.
   - **Stale index lines:** folder README indexes listing notes that moved or no longer exist, or missing recent notes.
   - **Oversized indexes:** a folder README index that has grown far past a quick scan (roughly 100 lines). Propose letting a Base serve as the index (see the growth path in the AI-OS README).
   - **Contradictions and stale claims:** notes that state conflicting things without a `challenges:` link between them; claims that time has overtaken.
2. **Write the report:** group findings by category, one line each (`path: problem`). State counts. Propose a fix per finding.
3. **Wait for approval.** The human picks which fixes to apply (all, some, none).
4. **Apply approved fixes** only. For contradictions, prefer linking both notes via `challenges:` over deleting either.
5. **Log it:** one [[log]] entry (`## [YYYY-MM-DD] lint | N findings, M fixed`).

## Judgment calls

- Empty compass keys on a young topic stub are normal, not findings. Flag them only when a topic has five or more notes and still no compass.
- When unsure whether something is stale, ask; the human's memory outranks the file dates.
