# SOP: Federation Pull

Refresh the read-only mirror of company knowledge (`Company/`) so the vault holds the latest shared Atlas, SOPs, and schema. Safe to run anytime: it never touches personal notes and can never conflict.

**Trigger:** the user says "get the latest company knowledge", "update the company vault", "pull company", or on a cadence the user sets.

## Steps

1. **Check auth.** If `gh auth status` fails, run the [[federation-setup]] SOP first (or tell the user to `gh auth login`).
2. **Refresh.** Run `npm run fed:pull`. This shallow-fetches the company repo, then wholesale-replaces the `Company/` mirror with the configured include paths (`Atlas`, `AI-OS/SOPs`, `AI-OS/Schemas`).
3. **Narrate the diff.** Report the printed added / changed / removed counts in plain language: "3 company notes are new, 1 changed, none removed."
4. **Remind about read-only.** `Company/` is a synced copy the user never edits. To build on a company note, copy it into the user's own `Atlas/` where it becomes theirs.

## Judgment calls

- The mirror is gitignored in the personal vault, so pulling never shows up as vault changes to commit. That is intended.
- If the user has edited something inside `Company/` (they should not), the wholesale refresh will overwrite it. Warn once, then proceed.
- To refresh from a local checkout instead of fetching (offline, or testing), run `npm run fed:pull -- --from <path-to-company-checkout>`.
