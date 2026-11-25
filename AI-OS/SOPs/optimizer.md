---
type: sop
version: 2
summary: Monthly read-only audit of the AI-OS layer with six checks, a fixed report and the four feedback-loop numbers
---

# SOP: Optimizer

A monthly self-audit of the AI-OS layer: schema, word caps, routing, lessons, the feedback loop and roles. It reads and reports; it never applies a fix.

**Trigger:** the human says "run the optimizer", "audit the AI setup", or [[monthly-review]] calls it.

## Steps

1. **Set the window.** Find the last `optimizer` entry in [[AI-OS/log|log]]. The window is every entry after it. No earlier entry: the window is the whole log and the run is the baseline; say so.
2. **Check 1, schema vs disk.** Every frontmatter field in `System/Templates/` is in the field registry ([[note-schema-reference]]). The registry and `.obsidian/types.json` list the same fields with the same types, both ways.
3. **Check 2, word caps.** Count with `wc -w`, else estimate and mark files within 10% of a cap "verify by hand". Caps: `AGENTS.md` 600, `AI-OS/Me.md` 400, `AI-OS/state.md` 250, `AI-OS/memory.md` 350 words and 40 entries, the four together 1,600; `AI-OS/routing.md` 550; `AI-OS/Schemas/note-schema.md` 600; every SOP in `AI-OS/SOPs/` 800 ([[sop-format]]).
4. **Check 3, routing truthfulness and reachability.** Row by row through the trigger index and My SOPs in [[routing]], confirm `AI-OS/SOPs/<name>.md` exists. Then confirm every SOP file has a row. State both counts. Every trigger index SOP except [[onboarding]] and [[upgrade-vault]] has its manual checklist embedded in [[rhythm]] (not your own SOPs).
5. **Check 4, lessons and rule buckets.** In `AI-OS/memory.md`: Lessons a `Me.md` rule, a lint check or a SOP step already covers (propose retiring); Lessons at `hits: 2` or more with no matching rule and no "declined" note: propose once (a decline is noted in the lesson text). In `Me.md` My additions: rules about one SOP (propose moving to Procedure notes) or repeating `AGENTS.md` (propose removing). Procedure notes that would help every user: draft a "Feedback from use" issue for the template, personal details removed; the human posts it.
6. **Check 5, loop numbers.** From the log entries in the window:
   - **Captured:** the sum of "lines" in the fold tallies (`fold | 3 lines, 1 lesson, 1 hit, 1 dropped`).
   - **Promoted:** the sum of "lesson" in the same tallies.
   - **Rules added:** T is the list items under `Me.md` My additions; rules added is T minus the last entry's total (net: removals hide additions); on the baseline, T.
   - **Recurring lint findings:** categories non-zero in three consecutive `lint` entries, skipping entries without a category bullet.
   Captured zero while the window shows real work: ask whether feedback is being missed. Never invent feedback.
7. **Check 6, roles vs stubs.** Every role file in `AI-OS/Agents/` (not its README) has a `.claude/agents/<role>.md` stub pointing at it, and every stub has a role file. Every SOP in a role's `runs:` exists, and the `AGENTS.md` section 7 table matches the role files.
8. **Write the report** in the fixed shape under Output. Each finding names the file, what is wrong, and why it matters in this vault now (what breaks, loads or misleads). A finding that only restates the rule is dropped.
9. **Log it:** `## [YYYY-MM-DD] optimizer | N findings | captured X, promoted Y, rules Z (total T), recurring lint W`. Besides the routine `state.md` update and Inbox capture from `AGENTS.md`, this is the only write.
10. **Stop.** The human picks proposals. Approved changes to user and merge files (`memory.md`, `Me.md`, My SOPs, templates, Bases) are separate work under the `AGENTS.md` safety tiers. Findings in system files (per the `AI-OS/README.md` ownership table) become a "Feedback from use" draft, not an edit.

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
### 6. Roles
### Proposals
### Run stats
Files read, counting method (wc or estimate), window.
```

Plus the step 9 log entry.

## Judgment calls

- A file near its cap but under it is not a finding; name it under Run stats.

## Manual checklist (without an AI)

1. Compare your templates' fields with the field registry in `AI-OS/Schemas/note-schema-reference.md`.
2. Trim `Me.md`, `state.md` and `memory.md` where a line no longer earns its place.
3. Check that every row in `AI-OS/routing.md` names a SOP that exists.
4. Delete Lessons in `AI-OS/memory.md` that a `Me.md` rule already covers.
5. No fold lines in `AI-OS/log.md` this month? Ask whether the AI is missing your feedback.

<!-- Maintainer lessons: template maintainers only. Your notes about this SOP go in AI-OS/memory.md, Procedure notes. -->
