# SOP: Federation Contribute

Share selected personal notes with the company knowledge base as a GitHub pull request. Default-deny: nothing leaves unless the user explicitly marks it. The agent narrates and confirms at each gate; the user never types git.

**Trigger:** the user says "contribute this to the company", "share these notes", "send this to the company vault", or "open a PR to the company".

## The privacy model (state this to the user)

A note is contributed only if it carries `share: company` in its frontmatter AND its `type` is shareable knowledge (`note`, `topic`, `moc`, `framework`, `person`, `organization`). Everything else, and every unmarked note, stays private. A marked note is still blocked if it contains a risk signal (an email address, a `#private`/`#confidential` tag, or a denylisted term).

## Steps

1. **Suggest (optional).** Run `npm run fed:suggest` to list notes worth sharing. It never marks anything; it proposes. Notes held back for risk signals are shown with the reason.
2. **Mark, with per-note confirmation.** For each note the user agrees to share, add `share: company` to its frontmatter. Confirm each one; do not bulk-mark silently.
3. **Preview.** Run `npm run fed:contribute -- --dry-run --pr`. This writes nothing and runs nothing. It prints: which notes will be contributed and where they route in the company `Atlas/`, which marked notes are blocked and why, and the exact git and `gh` commands that a real run would execute. Read this back to the user.
4. **Stage and review the sanitized copy.** Run `npm run fed:contribute` (no flags). This writes the sanitized, provenance-stamped copies into the fork clone but pushes nothing. Show the user the sanitization: Obsidian comments stripped, wikilinks rewritten, the `share` marker removed, provenance fields added.
5. **Confirm-before-push.** Only after the user says yes, run `npm run fed:contribute -- --push`. This rebases on the latest company `main`, commits, and pushes to the user's fork. Still no PR.
6. **Confirm-before-PR.** Only after a second yes, run `npm run fed:contribute -- --pr`. This opens the pull request against the company repo with an auto-built body (note list, sanitization report, validation result). Give the user the PR link.
7. **After merge (later).** When a maintainer merges, add a `shared-as: Company/Atlas/...` back-reference to the source note so future edits become a fresh "propose an update", not a duplicate.

## Judgment calls

- If validation fails on any staged note, the whole contribution is blocked. Fix the note, then restart at step 3.
- If the pre-PR rebase reports a conflict, explain in plain language what diverged and offer to abort. Never force-resolve; a genuine conflict is the maintainer's to settle at merge.
- Schema or shared-SOP changes do NOT go through this SOP. Use [[federation-schema-change]].
