# SOP: Federation Schema Change (Governance)

Propose a change to a SHARED standard (the schema or a shared SOP) as its own pull request against the company repo. This is governance, deliberately separate from note contribution, so a stray share marker can never alter the company standard and a knowledge note can never land in `AI-OS/`.

**Trigger:** the user says "request a schema change", "propose a new shared field", "change the company standard", or "update a shared SOP".

## When you need this vs a personal extension

Most personal-only fields need NOTHING here: OKF preserves unknown frontmatter keys, so a personal field travels with a contributed note untouched and never breaks the shared validator. Use this SOP only when a field or rule should become part of the shared standard for everyone.

## Steps

1. **Draft the change locally.** Edit the target file under the vault's own `AI-OS/` (for the schema, `AI-OS/Schemas/note-schema.md` or `okf-conformance.md`; for a shared SOP, the file under `AI-OS/SOPs/`). State the rationale.
2. **Preview.** Run `npm run fed:govern -- --file <path> --rationale "<why>" --dry-run --pr`. This prints the target, the auto-built PR body (rationale + a compatibility checklist), and the git/gh commands. Nothing is written or run.
3. **Compatibility check.** Confirm the change does not make any field newly required, renamed, or removed without a migration. If it does, it is a breaking change: the commit uses `feat!:` and the PR body must state the migration. The shared validator (`okf:validate`) must stay green on the existing company bundle.
4. **Confirm-before-push, then confirm-before-PR.** As with contribution: `npm run fed:govern -- --file <path> --rationale "<why>" --push`, then `... --pr`. The PR is labelled `governance`.
5. **Hand off.** Give the user the PR link. Merge is a company maintainer decision; the standard changes only when they merge.

## Judgment calls

- `fed:govern` refuses any file outside `AI-OS/` and any file that looks like a knowledge note (has a knowledge `type:`). If it refuses, the change belongs in [[federation-contribute]], not here.
- Never edit the vault's local schema copy to diverge from the company standard as a shortcut. Local drift is a lint finding; the only correct path to change the standard is this PR.
