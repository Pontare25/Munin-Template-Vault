---
type: fleeting
created-date: 2026-08-19
summary: Distilled, actionable insights from the four research memos (A-D), keyed to the four verbs, plus the decisions Pontus needs to make and a build backlog.
---

# Actionable insights: the knowledge layer

Distillation of [[Findings A - atomic and evergreen notes]], [[Findings B - linking and MOCs]], [[Findings C - source-to-atomic pipeline and traceability]], [[Findings D - recent discourse scan]]. Organized by the four verbs. Tags: **KEEP** (vault already right) / **ADOPT** (add) / **ADAPT** (modify) / **REJECT** (good practice, too much for a template floor). Each item carries a priority (P1 core / P2 refinement / P3 optional) and flags whether it needs a **[DECISION]** from Pontus.

> [!important] The spine of all four memos
> The single biggest finding, hit independently by C (traceability) and D (discourse), is that **AI-written organization is the high-risk zone**. Obsidian's own creator (Kepano) and ssp.sh argue an AI-made link/tag is worth nothing next to a human-made one. Your `%% #AI-Assisted %%` marker is already *ahead of the entire surveyed field* — nobody else marks AI authorship at all. The whole design response is: **AI output is provisional until a human verifies it**, and the vault makes that legible. This turns a liability (AI in the vault) into the template's differentiator.

---

## CREATED — well-formed atomic notes

- **P2 [DECISION] Narrow the title convention.** `new-note.md:12` says "nouns over sentences" for *all* titles. That contradicts Matuschak's well-evidenced claim-title principle (verified). Fix: **Topics stay noun-phrases** (they're concept hubs = Matuschak's term-defining exception), **atomic Notes prefer a claim-title** when they argue something ("Spaced practice beats cramming" — which the worked examples already do). **ADAPT.** Low cost, sharpens the whole Notes layer.
- **P2 ADOPT "atomic ≠ short."** Add one line to schema/SOP: atomic = *one idea, nameable at a glance*, not one paragraph. The right-sizing test is "can you title it cleanly?" — can't title = two ideas (split); title needs the source open = fragment (merge up). Stops strangers over-fragmenting.
- **P2 ADOPT: linking is a drafting act, not a filing chore.** Fill the compass *while writing*, because hunting for links is the thinking step (Matuschak). Add to `new-note.md` step 6.
- **P3 KEEP + cite your own bets.** Two of the vault's most opinionated choices have strong external backing that isn't cited anywhere: topics-over-tags (Matuschak "tags are an ineffective association structure") and concept-over-source orientation (the whole rationale for the Raw/Atlas split). Add the citations so future maintainers know they're deliberate.

## INTERCONNECTED — links, compass, topics, MOCs

- **P1 ADOPT the 4-mechanism decision table.** The ambiguity you flagged (compass vs topics vs MOC) is resolved in [[Findings B - linking and MOCs]] Q3. Publish it verbatim into a linking-conventions guide: **inline link** = reading-flow reference · **compass** = argumentative position · **`topics:`** = subject classification · **MOC** = curated navigation. This is the highest-leverage doc to write.
- **P1 ADOPT the Mental Squeeze Point trigger.** Never "after N notes, make an MOC." Make an MOC only when scattered notes on a live concern start producing *overwhelm* (Milo). Give the LLM curator this exact rule so it stops proposing speculative MOCs. Guards directly against the over-structuring failure a template invites.
- **P2 ADOPT: MOCs are heterarchical.** Same note belongs in multiple MOCs — that's the point, not clutter. State it in the MOC guide; correct any "one home per note" folder-thinking.
- **P2 [DECISION] Self-maintaining (query-backed) MOCs.** D found the live trend: hand-curated MOCs go stale, so people back them with Dataview/Bases queries. **But** B's whole point is that a MOC's value is the *editorial, opinionated arrangement* a query can't produce. My take: **hybrid, not pure-query** — a Base view surfaces candidate notes; the human/LLM curates order + point-of-view on top. Pure-query "MOC" is just an index (which the vault already gets from Bases). Decide whether to ship a query-backed MOC pattern as an above-the-floor option.
- **P3 ADOPT: at least one real link at creation.** The folgezettel debate resolves cleanly for Obsidian (auto-updating links + MOCs replace fixed IDs — REJECT folgezettel itself). The one transferable lesson: force one genuine link at note-creation, not deferred cleanup (Doto's "eufriction"). Your ingest SOP's "resolve against existing notes" already does this.

## DISTILLED — source becomes atomic knowledge

- **P1 [DECISION] Fold the literature-note *function* into the source note.** Don't add a `literature` type (raises the floor). Instead: the LLM writes an **"Extracted claims" block inside the source note** — each claim restated plainly, paired with its verbatim quote + locator. This is the hand-off artifact atomic notes are built from, *and* the one place you verify the LLM's reading before notes proliferate. Changes the ingest SOP + source template.
- **P1 ADOPT: preserve epistemic status.** The signature over-distillation failure — amplified by LLMs, which strip hedges to produce clean declaratives — is turning "one study suggests" or a second-hand claim into a bare fact. Schema rule: never upgrade a hedged/attributed claim; name whose claim it is. This is both a quality *and* a trace rule.
- **P2 ADAPT: throttle atomization.** LLM marginal cost of atomizing is ~zero, so it floods the Atlas with low-value orphans. Default to *source summary + 1-5 notes for genuinely novel claims*, not one note per sentence. Depth is the human's call at ingest.
- **P3 KEEP the immutable source (Layer 0).** Distillation is additive: the note is a compression *of* the source, never a replacement. Source stays unedited in Raw/Sources/. Progressive-summarization's 5 layers themselves = REJECT (too much ceremony); the non-destructive principle = keep.

## TRACED — walk any claim back to its source

- **P1 [DECISION] Claim-level trace for AI-written notes.** The vault today is document-level (`# Citations` + `resource:`) — fine for a human who read the source, *insufficient to audit an LLM's compression* (you'd have to re-read the whole source, so nobody does, so wrong AI claims harden into facts). Fix: tie trace strength to authorship — **human notes: citation is enough; AI notes: mandatory verbatim anchor** (inline quote or block-ref to the exact source passage). Low floor where safe, strict where hallucination lives. This is the highest-value new capability in the whole research.
- **P1 [DECISION] Add a `source:` frontmatter edge.** A prose `# Citations` list isn't machine-walkable. A `source:` (or `sources:`) frontmatter wikilink — mirroring the compass fields — makes provenance a walkable graph a lint pass can verify. **Note:** this is a *new frontmatter property*, which per the vault's own no-casual-frontmatter discipline needs your explicit sign-off + a schema-doc update in the same change. My rec: yes — it's the backbone of the trace model and earns its place. Keep it to this one field.
- **P2 ADOPT: bidirectional provenance as a lint invariant.** Forward edge (source lists notes it fed) + backward edge (`source:` on the note) must match; every citation must resolve to a real source in Raw/Sources/. A half-edge or unresolvable citation = lint finding. Fold into the existing `lint.md` SOP. Also blocks the LLM-fabricated-citation failure mode (~1 in 6, documented): the LLM may only cite sources physically present, never from memory.
- **P2 [DECISION] Make `/Reviewed` a verification state.** Your `%% #AI-Assisted %%` refinements already encode review status (ahead of the field). Sharpen the meaning: `/Drafted` = LLM wrote, unchecked; `/Reviewed` = a human walked the backward trace and confirmed the claim against its cited passage; `/Collaborative` = co-written. That converts the marker from an authorship label into an audit record — the exact answer to the Kepano/ssp.sh critique.

---

## Cross-cutting: two watch-outs from the research

1. **The agents bled MuninSystem infra into the template.** B and C cite `build-atlas-index.sh`, AI-Bases, `lint-scanner`/verify agents — those are *this* (MuninSystem) vault's machinery, not the template's. The template has plain SOPs (`ingest.md`, `lint.md`, `query.md`) and Bases. Map every "lint invariant" / "verify agent" proposal onto the template's own `lint.md` SOP, not imagined tooling.
2. **Minimum-viable-conventions is validated, not a compromise.** D's Jack Baty reversal (4,000 notes → 170, "hundreds of nearly empty files with carefully-curated frontmatter") is the failure mode of mandatory atomicity+linking applied to a non-academic. Your low floor is the correct hedge. Every P2/P3 above stays *optional/above-the-floor* on purpose.

## Decisions I need from you (the [DECISION] items above, condensed)

| #   | Decision                                                            | My recommendation                                               | Pontus sign-off                    |
| --- | ------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------- |
| D1  | Add `source:` frontmatter edge (new property)                       | **Yes** — one new field, backbone of trace model                | Yes approved.                      |
| D2  | Claim-level verbatim anchor mandatory for AI notes                  | **Yes** — highest-value new capability, answers Kepano critique | Yes approved                       |
| D3  | "Extracted claims" block on source notes (literature-note function) | **Yes** — the human verification surface                        | Yes approved                       |
| D4  | `/Reviewed` = precise verification audit state                      | **Yes** — cheap, converts marker to audit record                | Defined & approved: clean ladder — `%% #AI-Assisted %%` = AI-written/unverified (default on ingest) → `%% #AI-Assisted/Verified %%` once a human confirms the claim matches its cited source passage. Keep `/Collaborative`; retire `/Drafted` + `/Reviewed` (the old `/Reviewed` meant the reverse). Comment-only, no new frontmatter field. |
| D5  | Narrow title convention (Topics-nouns / Notes-claims)               | **Yes** — low cost, sharpens Notes                              | Yes approved                       |
| D6  | Query-backed "self-maintaining" MOCs                                | **Hybrid only** — query surfaces, human curates; not pure-query | Yes Hybrid only never pure query.  |

## Proposed build backlog (→ Project #1 issues, in order)

1. **Linking-conventions guide** + publish the 4-mechanism table & Mental Squeeze Point trigger (P1, no schema change — safe to start now).
2. **Trace model**: `source:` frontmatter + claim-level anchor for AI notes + schema-doc update (P1, needs D1/D2).
3. **Ingest pipeline rework**: "Extracted claims" block on source, atomization throttle, epistemic-status rule, `/Reviewed` semantics (P1, needs D3/D4; the 8-stage spec in [[Findings C - source-to-atomic pipeline and traceability]] is the blueprint).
4. **Lint invariant** for bidirectional provenance + citation resolution, folded into `lint.md` (P2).
5. **Note-writing polish**: title convention, atomic≠short, link-while-drafting, cite-your-own-bets (P2, needs D5).
6. **MOC guide**: heterarchy, up-to-home link, optional query-backed pattern (P2/P3, needs D6).
