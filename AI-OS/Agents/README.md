# Agent roles

A role is a short brief for one kind of work: which SOPs it runs, where it writes, what it must not do, and when it is done. Roles never hold procedure; the SOP does. The main session is the orchestrator, defined in `AGENTS.md`, and has no role file.

## How a role is used

- **Any tool:** after routing picks a SOP, the session reads the role that runs it (table in `AGENTS.md` section 7) and works inside that role until the task is done.
- **Claude Code:** each role also has a stub in `.claude/agents/`, so the main session can hand independent work to that role as a subagent. Give the subagent the SOP name and the files it needs. A subagent leaves the shared files (`AI-OS/log.md`, `Atlas/log.md`, `state.md`, `memory.md`, `index.md` files) to the main session and lists the lines to add under Open in its report.

## Role file format

```yaml
---
name: librarian
description: One sentence plus trigger phrases
model_tier: mid                  # top | mid | small
writes: [Atlas/, Raw/Sources/]   # advisory scope; tools cannot enforce it
runs: [ingest, new-note, merge-notes]
hands_off_to: [tester]
---
```

Body sections: **Identity** (one line), **Steps**, **Boundaries** (may, ask first, never), **Output**, **Done when**. At most 25 lines.

## Rules for every role

1. Read the SOP in full before the first write. The safety tiers in `AGENTS.md` section 4 apply to every role.
2. Write only inside the role's `writes:` scope and the vault. Scratch files and scripts go to your tool's temp folder, never into the vault or next to it.
3. **Check after writing.** Re-read every note you created or changed: frontmatter parses, required fields per the schema core are present, every wikilink you added resolves. Fix a failure once; if it still fails, report it.
4. **End with the run report**, every line present, "None" when empty:

   ```markdown
   Changed: one line per file created or edited
   Checked: what step 3 confirmed
   Not verified: what you could not check, and why
   Open: questions or approvals waiting on the human
   ```

## Handoffs

Researcher to librarian (sources to file); librarian to tester (scoped check); developer to builder (an approved proposal); builder to tester (verify); tester to orchestrator (findings and proposals). The orchestrator applies approved fixes and writes the shared files.
