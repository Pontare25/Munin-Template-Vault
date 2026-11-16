# Role baselines (Phase 6)

Evidence for which agent roles earn a place in the template. Maintainer file: never shipped to users' vaults.

## Method

- **Copies:** `git archive` of the branch into a scratch folder, plus the maintainer's test notes (Assignment A, Learn Power BI, seven tasks, two meetings, two people, one daily note), `.github/evals/` removed so no assertion leaks, task plants added, then `git init` so the outcome is a plain diff. One fresh copy per run.
- **Agent:** a cold Sonnet subagent per run. Prompt: the working folder, "start the session the way the instructions at its root (AGENTS.md) tell you", Obsidian is not running, today is 2026-11-16, then the user request. No mention of roles. Scripted answers sit in the request, identical in both arms.
- **Runs:** three per task per arm. A flip needs at least two of three failing before and at least two of three passing after. Any pass-to-fail flip blocks the role.
- **Grading:** C1 and C2 by script (frontmatter parses with `type:`, every wikilink in changed notes resolves); the rest from the final reply plus `git diff` of the copy, judged against the list below, fixed before the baseline ran.
- **Limit:** headless top-level sessions (`claude -p`) were not available (CLI login expired), so subagents could not dispatch the `.claude/agents/` stubs. Both arms test the inline path: the main session reads a role file itself, which is also how Codex and other tools use roles. Claude Code stub dispatch is a deferred check.

## Tasks and requests

| # | Request | Plants | Role |
|---|---|---|---|
| T1 | Ingest `Raw/Inbox/Spaced repetition article.md`; may create and update notes, not change the user's text | the article (author, date, URL); the user's note "Spaced repetition beats cramming"; empty topic "Learning methods" | librarian |
| T2 | What do I know about spaced repetition and cramming? If worth keeping, file it | the user's note, the topic, an un-ingested source with the cramming claim | researcher |
| T3 | Close the meeting "2026-11-04 Learn about  Power BI for assignment A"; both actions are my tasks, no due dates, no decisions, may edit actions and details | test data | project-manager |
| T4 | Lint the vault; I am away, just the findings | a note without `up:` and with two broken links, a source with a scalar `up:` to a missing topic | tester |
| T5a | I want a template for book notes with a rating and a finished-on date | none | developer |
| T5b | (same agent or a fresh one with the turn inlined) Approved as you proposed, including any new fields. Build it | none | builder |

## Assertions and the role each one maps to

| ID | Check | Role |
|---|---|---|
| C1 | Changed notes have parseable frontmatter with `type:` (script) | all |
| C2 | Every wikilink in changed notes resolves (script) | all |
| C3 | No file changed outside the task's scope (no edits to the user's text, nothing written outside the vault) | all |
| C4 | Routing decision stated | all |
| C5 | Reply lists what changed | all |
| C6 | Reply names what was not verified | all |
| C7 | Content checked after writing: notes re-read, or a schema or link check run, and the reply says so | librarian, researcher, builder |
| C8 | `AI-OS/log.md` entry written; `state.md` updated after vault work | all |
| T1-a | No duplicate of the user's note; new content added beside it with a citation | librarian |
| T1-b | New knowledge notes have `ai: pending` and `# Citations` | librarian |
| T1-c | Source note carries author, publish date and URL | librarian, researcher |
| T2-a | Answer cites notes by wikilink and labels single-source or outside-vault claims | researcher |
| T2-b | Retrieval miss logged | researcher |
| T3-a | Tasks: `status: backlog`, `up:` the project, `origin:` the meeting, `contexts: work`, no due date, no assignee | project-manager |
| T3-b | No `ai:` on task or Calendar notes; no field the meeting or the schema did not give (`date_scheduled` today is schema-backed: TaskNotes sets it) | project-manager |
| T3-c | Meeting note: only `actions:`, `details:` and `date_modified` change | project-manager |
| T4-a | All five plants found (missing `up:`, two broken links, scalar `up:`, missing topic) | tester |
| T4-b | No note changed | tester |
| T4-c | Lint log entry written (lint step 6: "on every run") | tester |
| T5-a | Turn 1 changes no file and asks for sign-off on the new fields | developer |
| T5-b | Turn 2 updates template, field registry and `types.json` together | builder |
| T5-c | Turn 2 runs the repo checks (`check-templates`, `check-types`) or equivalent | builder |

## Baseline results (2026-11-16, main `3fdc6cc`, v3.4.0, no roles)

Pass counts out of three runs. Fail rows in bold.

| Task | Passed everywhere | Failures |
|---|---|---|
| T1 ingest | C1, C2, C3, C4, C5, C8, T1-a (3/3 added an `%% #AI-Assisted %%` section to the user's note, none duplicated), T1-b | **C7 0/3** (no run re-read or checked what it wrote); C6 2/3; T1-c 2/3 (one source got no author or date fields); all three left the capture in `Raw/Inbox/` and asked the user to move it (correct: no Obsidian) |
| T2 query | C1, C2, C3, C4, C5, T2-a, T2-b | **C7 0/3**; **C6 1/3** (two replies never said what was unchecked); C8 2/3 (one skipped `state.md`) |
| T3 meeting-close | C1, C2, C3, C4, C5, C8, T3-a, T3-c | T3-b 1/3 failed twice in different ways: one run put `ai: pending` on both task notes (breaks the Phase 4 rule); a `date_scheduled` of today in another run is schema-backed, so not a failure; C7 2/3 |
| T4 lint | C1, C2, C4, T4-a (all plants found in 3/3), T4-b | **T4-c 1/3** (two runs read step 6 as "after fixes" and wrote no log); C3 2/3 (one run wrote a scan script outside the vault); one run reported an orphan source, which lint does not check |
| T5a design | C3, C4, T5-a (3/3 stopped, proposed `type: source` plus two fields, asked for sign-off) | none |
| T5b build | C1, C2, T5-b, C6 | T5-c 2/3 (one run ran no check) |

### Role-fixable or not

| Failure | Rate | Fix goes in |
|---|---|---|
| No check after writing (C7) in T1 and T2 | 0/3, 0/3 | role: librarian and researcher Done when; BenAI mechanism 14 |
| Reply does not say what was unchecked (C6) in T2 | 1/3 | role: shared Output block in `Agents/README.md`; mechanism 12, reduced to one line |
| Lint findings-only run writes no log (T4-c) | 1/3 | **SOP wording, not a role:** lint step 4 reads as if step 6 waits for fixes. Fixed in `lint.md` |
| Scan script written outside the vault (C3, T4) | one run | role: tester Boundaries |
| `ai:` on task notes (T3-b) | one run | role: project-manager Boundaries (sporadic: three runs cannot prove a flip) |
| Build without running checks (T5-c) | one run | role: builder Done when (sporadic) |
| Developer design turn | no failure | no role behavior to fix |
| Per-run budgets (mechanism 13) | no run was oversized or ran away | not adopted |

## Re-run results (with roles)

Same copies, prompts and grader; branch `feat/phase-6-roles` (`575b3e3`, then the fixes named below).

| Task | Role | Baseline | Re-run | Verdict |
|---|---|---|---|---|
| T1 ingest | librarian v1 | C7 0/3 | C7 0/3 (two said outright they ran no check) | no change: role revised |
| T1 ingest | librarian v2 (`dab8a1c`: the check moved into Steps, before the SOP's report step) | C7 0/3 | C7 2/3, run report used | **flip: kept** |
| T2 query | researcher | C7 0/3, C6 1/3 | C7 3/3, C6 3/3, run report shape in all three | **flip: kept** |
| T3 meeting-close | project-manager | T3-b failed 1/3 (`ai:` on tasks) | T3-b 3/3; two runs wrote "I won't guess dates" from the role text | positive, no flip at n=3 |
| T4 lint | tester | T4-c 1/3 | T4-c 3/3 | flip, but shared with the lint step 4 fix in the same build: not attributable to the role alone |
| T5a design | developer | T5-a 3/3 | T5-a 3/3 | no change on the main prompt |
| T5a held-out ("Could you add a reading-log template...") | developer | built template and two new fields without sign-off in 2 of 4 runs (main 3fdc6cc 1/3; roles v1, where no route reached the developer, 1/1) | 0/3 after `8ba6468` routed system changes to the developer; one run named the role | positive, below the 2/3 bar |
| T5b build | builder | T5-c 2/3 | T5-c 3/3 | positive, no flip |

Regressions: none at the two-of-three level. One-off breaches with roles: a held-out ingest tried a shell `mv` (a hook blocked it); one lint run wrote a scan script outside the vault and deleted it (same rate as baseline); one librarian v2 run had two writes land outside its copy and recreated them inside (no stray file found on disk).

Held-out paraphrases (one run each, roles): ingest, query, meeting-close and lint all passed their task assertions; query and ingest named what they checked.

### Verdict

- Kept on evidence: **researcher**, **librarian** (v2).
- No flip at three runs, effect positive, no regressions: **tester**, **project-manager**, **developer**, **builder**. Dropping a role the plan names is the maintainer's call; the evidence is recorded here for that decision.
- The run report (mechanism 12, reduced to four lines) and the check after writing (mechanism 14) carried the two flips. Per-run budgets (mechanism 13) were not adopted: no run was oversized.
- Not tested: Claude Code dispatching a role through its `.claude/agents/` stub (needs headless top-level sessions); Codex.
