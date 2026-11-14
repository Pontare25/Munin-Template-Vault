---
type: sop
version: 1
summary: Monthly read-only audit of the AI-OS layer with five checks, a fixed report and the four feedback-loop numbers
---

# SOP: Optimizer

A monthly self-audit of the AI-OS layer: schema, word caps, routing, lessons and the feedback loop. It reads and reports; it never applies a fix.

**Trigger:** the human says "run the optimizer", "audit the AI setup", or [[monthly-review]] calls it.

## Steps

1. **Set the window.** Find the last `optimizer` entry in [[AI-OS/log|log]]. The window is every entry after it. With no earlier entry, the window is the whole log and this run is the baseline; say so in the report.
2. **Check 1, schema vs disk.** Every frontmatter field in `System/Templates/` is in the field registry ([[note-schema-reference]]). The registry and `.obsidian/types.json` list the same fields with the same types, both ways. Fields that appear only in your notes are lint's job, not this check.
3. **Check 2, word caps.** Count words with `wc -w` when a shell is available; otherwise estimate, mark the counts as estimates, and flag files within 10% of a cap as "verify by hand". Caps: `AGENTS.md` 600, `AI-OS/Me.md` 400, `AI-OS/state.md` 250, `AI-OS/memory.md` 350 words and 40 entries, the four together 1,600; `AI-OS/routing.md` 550; `AI-OS/Schemas/note-schema.md` 600; every SOP in `AI-OS/SOPs/` 800 ([[sop-format]]).
4. **Check 3, routing truthfulness and reachability.** Every row in the trigger index and under My SOPs in [[routing]] resolves to a SOP file; every SOP file has a row; every SOP except [[onboarding]] and [[upgrade-vault]] has its manual checklist embedded in [[rhythm]].
5. **Check 4, lessons and rule buckets.** In `AI-OS/memory.md`: Lessons a `Me.md` rule, a lint check or a SOP step already covers (propose retiring); Lessons at `hits: 2` or more never proposed as a rule. In `Me.md` My additions: rules about one SOP (propose moving to Procedure notes) or repeating `AGENTS.md` (propose removing). Procedure notes that would help every user: draft a "Feedback from use" issue for the template, personal details removed; the human posts it.
6. **Check 5, loop numbers.** From the log entries in the window:
   - **Captured:** the sum of "lines" in the fold tallies (`fold | 3 lines, 1 lesson, 1 hit, 1 dropped`).
   - **Promoted:** the sum of "lesson" in the same tallies (Inbox lines that became Lessons).
   - **Rules added:** count the list items under My additions in `Me.md` (T). Rules added is T minus the total in the last optimizer entry; a net number, since removed rules hide added ones. On the baseline run it is T.
   - **Recurring lint findings:** categories non-zero in three consecutive `lint` entries.
   If captured is zero while the window shows real work, ask the human whether feedback is being missed. Never invent feedback.
7. **Write the report** in the fixed shape under Output. Each finding names the file, what is wrong, and why it matters in this vault now (what breaks, loads or misleads). A finding that only restates the rule is not a finding: look closer for the concrete effect, or drop it.
8. **Log it:** one entry `## [YYYY-MM-DD] optimizer | N findings | captured X, promoted Y, rules Z (total T), recurring lint W`. This is the only write.
9. **Stop.** The human picks proposals. Approved changes to user files (`memory.md`, `Me.md`, My SOPs) are separate work under the `AGENTS.md` safety tiers. Findings in system-owned files (shipped SOPs, schemas, templates) become a "Feedback from use" draft, not an edit.

## Output

The report, every section present in this order, "None" when empty:

```markdown
## Optimizer report YYYY-MM-DD
Summary: N findings | captured X, promoted Y, rules Z (total T), recurring lint W | window: since YYYY-MM-DD (or baseline)
### 1. Schema vs disk
- path: what | why it matters here | proposed fix
### 2. Word caps
### 3. Routing
### 4. Lessons and rules
### 5. Loop numbers
### Proposals
### Run stats
Files read, counting method (wc or estimate), window.
```

Plus the step 8 log entry.

## Judgment calls

- A file near its cap but under it is not a finding; name it under Run stats.
- When a lesson and a rule overlap only partly, propose a merge, not a retirement.

## Manual checklist (without an AI)

1. Compare your templates' fields with the field registry in `AI-OS/Schemas/note-schema-reference.md`.
2. Trim `Me.md`, `state.md` and `memory.md` where a line no longer earns its place.
3. Check that every row in `AI-OS/routing.md` names a SOP that exists.
4. Delete Lessons in `AI-OS/memory.md` that a `Me.md` rule already covers.
5. No fold lines in `AI-OS/log.md` this month? Ask whether the AI is missing your feedback.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
