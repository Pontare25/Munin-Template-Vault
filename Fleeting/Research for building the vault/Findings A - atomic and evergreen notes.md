---
type: fleeting
created-date: 2026-08-19
summary: Research findings on atomic/evergreen note-writing (the CREATED verb) for the template vault.
---

# Findings A: Atomic and Evergreen Note-Writing

Scope: the CREATED verb (well-formed individual notes), one of four priorities (CREATED, INTERCONNECTED, DISTILLED, TRACED). Sources: Andy Matuschak's evergreen-notes cluster (notes.andymatuschak.org), zettelkasten.de (Sascha Fast, "The Complete Guide to Atomic Note-Taking" and related posts), Sönke Ahrens's *How to Take Smart Notes* (via secondary summaries and the zettelkasten.de treatment of it), and the zettelkasten.de forum tradition on Luhmann.

Current vault state referenced throughout: `AI-OS/Schemas/note-schema.md`, `AI-OS/SOPs/new-note.md`, `System/Templates/Templater/Atlas-templates/atomic-note-template.md`, `System/Templates/Templater/Atlas-templates/topic-template.md`.

---

## Q1: What makes a good atomic note? Where's the line — too big vs too small?

**Finding 1.1**
- **Claim:** "Atomic" does not mean "short." The false move is conflating brevity with atomicity — an atomic note is as long as it needs to be to fully contain one idea, no more and no less.
- **Source:** Sascha Fast, "The Complete Guide to Atomic Note-Taking," https://zettelkasten.de/atomicity/guide/
- **Implication for vault:** ADOPT (as guidance, not enforcement). The vault has no note-length rule today, which is correct — but nothing currently warns against the common beginner mistake of treating "atomic" as "short." Worth one sentence in the schema or SOP so strangers don't over-fragment.
- **Concrete change:** Add one line to `note-schema.md` or `new-note.md`: "Atomic means one idea, not one paragraph — a note can be long if the idea needs the space, and short if it doesn't."

**Finding 1.2**
- **Claim:** The best available test for right-sizing is **"can you name it well, and is it understandable at a glance?"** If a note resists a clean, specific title, it's either two ideas fused together (too big) or an incomplete fragment lacking context (too small).
- **Source:** Sascha Fast, citing "Morgan" (Zettelkasten YouTube creator), https://zettelkasten.de/atomicity/guide/ — "A note is fairly atomic if it is easy to name... It is understandable at a glance."
- **Implication for vault:** ADOPT. This is a genuinely actionable, teachable heuristic that a stranger can apply without theory. It also directly supports the vault's existing atomic-note-template (title = filename = the concept).
- **Concrete change:** Add to `new-note.md` step 4 (naming): "If you can't title the note cleanly in one phrase, it's probably two ideas — split it. If the title needs the surrounding source to make sense, it's probably a fragment — merge it up or add context."

**Finding 1.3**
- **Claim:** Atomicity is a *process*, not just a filing rule: you isolate an idea by working in two directions — "outwards" (drawing the boundary against neighboring ideas) and "inwards" (exploring the idea fully on its own note before it gets too big and needs splitting again).
- **Source:** Sascha Fast, "Why (a) Single Note Matters," https://zettelkasten.de/posts/why-single-note-matters/
- **Implication for vault:** REJECT-FOR-TEMPLATE as a formal step (too much process for a stranger's first note) but ADOPT as background framing for the AI. Useful for how the AI *itself* should draft/refactor notes during ingest, not as a rule imposed on the human.
- **Concrete change:** None to templates. Optionally reference in `ingest-protocol.md` as the rationale for why the AI splits an over-large note into a parent-plus-children when a source dumps a lot on one topic.

**Finding 1.4**
- **Claim:** There's a two-step compression built into good note-writing: content → one-sentence summary → title. Working the one-sentence summary is itself an act of understanding, not just labeling.
- **Source:** Sascha Fast, https://zettelkasten.de/posts/why-single-note-matters/
- **Implication for vault:** KEEP + sharpen. The vault already has `summary:` as a "strongly recommended" field (`note-schema.md` line 37) justified by retrieval/indexing utility. This finding gives it a second, stronger justification: writing the summary is a *thinking* step, not just metadata — it's the mechanism that keeps a note atomic.
- **Concrete change:** In `note-schema.md`, add to the `summary:` rationale: "Writing this line is also how you check the note is actually one idea — if you can't compress it to one sentence, the note isn't done splitting yet."

---

## Q2: Note titles as claims / as an "API." When does claim-as-title apply vs. a plain concept title?

**Finding 2.1**
- **Claim:** Evergreen note titles function like an API: a well-factored, well-titled note lets you reference its entire content by name elsewhere, and the ability to title cleanly is itself a signal the note is properly factored.
- **Source:** Andy Matuschak, "Evergreen note titles are like APIs," https://notes.andymatuschak.org/zDh1yhNFQNxDEre12B4zd8k
- **Implication for vault:** KEEP (the vault's `up`/`topics` compass + atomic filing already assumes this, implicitly, by treating the title as the note's handle) but the principle isn't stated anywhere. It's worth naming explicitly since it explains *why* naming matters, not just that it does.
- **Concrete change:** Add one sentence to `new-note.md` step 4: "The title is the note's handle — other notes will reference it by name, so a clean title is a sign the idea is well-factored."

**Finding 2.2**
- **Claim:** Prefer note titles that are complete declarative or imperative phrases stating a claim (e.g. "Educational objectives often subvert themselves") over bare noun phrases, because a claim-title forces you to actually support a position in the body, and struggling to title a note sharply is a signal the thinking is muddy or the note covers multiple topics. Matuschak carves out an explicit exception: nouns/noun-phrase titles are fine **only** for notes that define a core term.
- **Source:** Andy Matuschak, "Prefer note titles with complete phrases to sharpen claims," https://notes.andymatuschak.org/zLhoRUyjKU665EY16u4XXJy
- **Implication for vault:** **This directly conflicts with the vault's current instruction.** `AI-OS/SOPs/new-note.md` step 4 says: "Name the note well: **nouns over sentences**, specific over generic, no dates in knowledge-note titles." That is the opposite default from Matuschak's. ADAPT — don't flip the vault's default (claim-titles are real dogma and a big ask for a stranger's first note, and they interact badly with the vault's Topic-page model, where a Topic *is* a noun-phrase concept hub by design), but narrow the "nouns over sentences" rule to where it actually belongs: `Atlas/Notes/` atomic notes, where a note is making an argument, can and often should use a claim-title; `Atlas/Topics/` pages, which are hub/index pages by design, should stay noun-phrases (they're the vault's own version of Matuschak's "term-defining" exception).
- **Concrete change:** Rewrite `new-note.md` step 4 to: "Name the note well: for **Topic** pages, use a noun phrase (they're concept hubs, not arguments). For atomic **Notes**, prefer a title that states the claim if the note argues something specific (e.g. 'Density of linking is a writing discipline, not just a filing habit') — if you can't title it as a clean claim, that's often a sign the note is still two ideas. Plain noun-phrase titles remain fine for notes that just define a term. Specific over generic either way; no dates in knowledge-note titles."

**Finding 2.3**
- **Claim:** Questions also make good note titles because the interrogative form creates pressure to get to the core of the matter — but the goal is to eventually resolve the question and drop the question mark, converting it to a declarative claim.
- **Source:** Andy Matuschak, https://notes.andymatuschak.org/zLhoRUyjKU665EY16u4XXJy
- **Implication for vault:** REJECT-FOR-TEMPLATE. Nice technique but a third title-mode is too much nuance to hand a stranger alongside the noun/claim split above — the two-way split (2.2) is already the maximum a template vault should impose.
- **Concrete change:** None. Not worth adding.

---

## Q3: Fleeting → literature → permanent note distinction. What is the promotion path and what triggers promotion?

**Finding 3.1**
- **Claim:** Fleeting notes capture a thought or reaction in the moment (to a text, an event, an idea) and are deliberately disposable — their only job is to not let the thought "fleet away" before it can be processed. They are meant to be worked through within a day or two, not kept.
- **Source:** Ahrens, *How to Take Smart Notes*, summarized in "My Zettelkasten Journey" (Medium), https://medium.com/@haikalkushahrin/my-zettelkasten-journey-understanding-the-differences-between-fleeting-notes-literature-notes-f7849b608152
- **Implication for vault:** KEEP. This matches the vault's `type: fleeting` exactly — "Quick capture in transit, not yet filed. Promoted to another type or deleted" (`note-schema.md` line 18). No change needed; the vault already got this right.
- **Concrete change:** None.

**Finding 3.2**
- **Claim:** "Literature note" and "permanent note" is a workflow-stage distinction, not a quality tier — and the zettelkasten.de maintainers themselves say they deliberately *don't* distinguish the two in practice: "there are only notes that are part of the Zettelkasten, and then there are all the other notes." "Permanent" means "permanently useful," not "unchanging" or "fully formed" — all notes stay malleable and get revised as understanding improves.
- **Source:** Will (forum), reprinted by Christian/Sascha, "All notes are malleable: Strive for permanently useful notes, not permanently unchanging notes," https://zettelkasten.de/posts/literature-notes-vs-permanent-notes/
- **Implication for vault:** KEEP, and this is a useful validation. The vault deliberately has no `literature` type — a source's captured material goes straight to `type: source` (`Raw/Sources/`) and gets promoted directly to `type: note` in `Atlas/Notes/`. This finding says that collapsing the literature/permanent distinction is a legitimate simplification some serious Zettelkasten practitioners already make, not a corner Munin cut. Also supports NOT treating an Atlas note as ever "finished" — it should stay editable/updatable via the ingest protocol, which the vault already models ("Raw vs Wiki discipline": promoted notes get added to, not silently rewritten).
- **Concrete change:** None structurally. Optionally add one clarifying line to `note-schema.md`'s `source` row or to `ingest-protocol.md`: "A source note isn't a 'draft' tier below a note — it's raw material. Promotion to `note` happens when an idea in it is worth a permanent home; the source note itself never becomes 'more real.'"

**Finding 3.3**
- **Claim:** The trigger for promoting a literature-note idea to a standalone permanent note is **not** "I finished reading" — it's "this idea now needs to be developed, connected, or expressed in my own words such that it can stand on its own and be found again later regardless of which source it came from." Concretely: write it as if a stranger (your future self) will read only this note, with no other context.
- **Source:** Ahrens, *How to Take Smart Notes*, as characterized across the zettelkasten.de literature-vs-permanent post and the "Understanding Atomicity" guide (Level 2, "Ahrensian terms"), https://zettelkasten.de/posts/literature-notes-vs-permanent-notes/ ; https://zettelkasten.de/atomicity/guide/
- **Implication for vault:** ADOPT as an explicit promotion trigger — this is currently implicit in `ingest-protocol.md`'s instruction to "extract typed entities... resolve each against existing Atlas notes" but the *reason* to promote (self-containedness, not source-completion) isn't stated.
- **Concrete change:** Add to `ingest-protocol.md` or `new-note.md`: "Promote an idea from a source to its own atomic note when it can stand alone without the source open next to it — not simply because the source has been fully read."

**Finding 3.4**
- **Claim:** The relationship between literature-note ideas and permanent notes is many-to-one, not one-to-one: an idea an author returns to across several chapters, or across several different sources, collapses into a single permanent note. Conversely, don't force a permanent note into existence "because I read a chapter" if there's no new synthesis — capture stays in the source note until there's something to say.
- **Source:** Will, https://zettelkasten.de/posts/literature-notes-vs-permanent-notes/
- **Implication for vault:** ADOPT. This is exactly what the vault's ingest-protocol line "A single source should update multiple notes" gets right in one direction, but the reverse (multiple sources → one note) isn't explicit, nor is "don't promote if there's nothing new."
- **Concrete change:** Add to `ingest-protocol.md`: "Promotion is many-to-one in both directions: one source can update several existing Atlas notes, and several sources on the same idea should update the *same* note rather than spawning duplicates. If a source repeats an idea already captured with nothing new added, don't create a note — just add the source as a citation on the existing one."

---

## Q4: When does an idea deserve its own note vs. staying in a source summary?

**Finding 4.1**
- **Claim:** Organize by *concept*, never by author/book/event/project/topic. If you file by source instead of by concept, ideas about the same thing scatter across many source-bound notes with no accumulation and no pressure to synthesize — you lose the chance to notice that two unrelated books were actually talking about the same thing.
- **Source:** Andy Matuschak, "Evergreen notes should be concept-oriented," https://notes.andymatuschak.org/z2hQEhqWkdRLL9JUwfawZZx
- **Implication for vault:** KEEP — this is precisely the vault's `Raw/Sources/` (source-bound, by-origin capture) vs. `Atlas/Notes/` (concept-bound, promoted) split, and it's the whole justification for the "Raw vs Wiki discipline" rule ("knowledge extracted... is promoted to the flat Atlas layers... rather than silently rewriting" the source). Strong external validation of an existing design decision — worth citing in the vault's own docs so future maintainers know it's not arbitrary.
- **Concrete change:** Optionally add this citation to `Vault-Map` or `note-schema.md`'s framing of the Raw/Atlas split, since it's currently asserted without a "why."

**Finding 4.2**
- **Claim:** The decision rule in practice: an idea earns its own note when it (a) recurs — you'd want to link to it from more than one place, or (b) requires its own argument/development that the source's framing doesn't already carry, or (c) you catch yourself wanting to disagree with, extend, or complicate what the source said. If none of those hold, it stays as a line in the source note.
- **Source:** Synthesized from Matuschak's concept-orientation piece (2.1/4.1 above) plus the zettelkasten.de "why single note matters" refactoring logic (1.3) — no single source states this as a checklist, but all three converge on it.
- **Implication for vault:** ADOPT. The vault currently has no explicit decision rule for this — `ingest-protocol.md` says to "extract typed entities... resolve against existing notes" but doesn't say when extraction is warranted versus when material should just stay summarized in the source note.
- **Concrete change:** Add a short checklist to `ingest-protocol.md`: "Promote a claim/idea out of a source into its own Atlas note if any of: it would be linked from elsewhere, it needs its own argument beyond what the source gives it, or you have a reaction (agreement/tension/extension) to record. Otherwise leave it as a line in the source note."

**Finding 4.3**
- **Claim:** Don't be too restrictive about what goes into the system — "it wants to be fed ideas." The cost of a mediocre note is much lower than the cost of losing a good one because atomicity felt like too high a bar to bother capturing it at all.
- **Source:** Will, https://zettelkasten.de/posts/literature-notes-vs-permanent-notes/
- **Implication for vault:** KEEP. The vault's Fleeting → source → note pipeline already has a low-friction bottom tier (`fleeting`) for exactly this reason. No change needed, but worth citing as reassurance in onboarding docs for strangers who might be intimidated by "atomic note" rules into under-capturing.
- **Concrete change:** None structural. Consider one reassuring line in `START-HERE.md` or the Fleeting folder's README: "When in doubt, capture it as fleeting first — atomicity is a filing question, not a capture question."

---

## Q5: Density-of-linking as a writing discipline. How does it shape how you WRITE a note, not just file it?

**Finding 5.1**
- **Claim:** Densely linking notes isn't a filing chore — it's a thinking discipline. Pushing yourself to find links forces expansive, effortful thinking about how the current idea relates to others, and *finding* the right links requires re-reading old notes, which functions as organic spaced review of the whole note base.
- **Source:** Andy Matuschak, "Evergreen notes should be densely linked," https://notes.andymatuschak.org/zF8xCU4BwXwbmSyp7tmff9i
- **Implication for vault:** ADOPT as a writing-time instruction, not just a schema field. The vault has the mechanism (the four-key compass: `up`/`related`/`down`/`opposes`) but currently frames it as a filing/structure step ("place a note in the landscape of ideas") rather than a *thinking* step performed while composing the note.
- **Concrete change:** Add to `new-note.md` step 6 (write the body): "While writing, actively look for what this idea relates to, follows from, or conflicts with — filling the compass is part of drafting, not a cleanup pass afterward. If you can't find any links, that's often a sign the note needs to sit longer before promotion."

**Finding 5.2**
- **Claim:** Prefer fine-grained, specific associations (link to the exact note that captures the specific relationship) over tags, which Matuschak calls "an ineffective association structure" — tags group by shared label with no explanation of *how* things relate, while a link plus a clause of context records the actual relationship.
- **Source:** Andy Matuschak, referenced within "Evergreen notes should be densely linked," https://notes.andymatuschak.org/zF8xCU4BwXwbmSyp7tmff9i (see also "Tags are an ineffective association structure" and "Prefer fine-grained associations" in the same cluster)
- **Implication for vault:** KEEP, strongly. This is close to a direct citation for the vault's most opinionated design choice: `topics:` replacing category tags entirely ("Topics replace category tags completely," `note-schema.md` line 51) and the compass requiring *links*, not tags. Worth citing explicitly since it's the single most defensible piece of external validation for the vault's most unusual convention.
- **Concrete change:** Add this citation to `note-schema.md`'s topics section as the rationale: "(External validation: Matuschak, 'Evergreen notes should be densely linked' / 'Tags are an ineffective association structure' — https://notes.andymatuschak.org/zF8xCU4BwXwbmSyp7tmff9i)."

**Finding 5.3**
- **Claim:** A link whose purpose isn't recorded loses most of its value — Matuschak's cluster (via "prefer fine-grained associations") and the vault's own schema both converge on: a bare link is weaker than a link plus a sentence of *why*.
- **Source:** Andy Matuschak's evergreen-notes cluster (density-of-linking + fine-grained-association notes), https://notes.andymatuschak.org/zF8xCU4BwXwbmSyp7tmff9i
- **Implication for vault:** KEEP — the vault already states this almost verbatim: "When a compass link is not self-explanatory, say why it is there in one clause in the note body; a link whose reason is forgotten is half a link" (`note-schema.md` line 76). No change needed; flagging as confirmed-good.
- **Concrete change:** None. Optionally add the citation for credibility (same as 5.2).

**Finding 5.4**
- **Claim:** You don't have to write the target note before linking to it — linking to a stub (a note that doesn't exist yet) is a legitimate, low-friction way to keep drafting momentum ("backlinks can implicitly define nodes"); it's freeing rather than sloppy.
- **Source:** Andy Matuschak, "Backlinks can be used to implicitly define nodes in knowledge management systems," referenced in https://notes.andymatuschak.org/zF8xCU4BwXwbmSyp7tmff9i
- **Implication for vault:** KEEP — matches the vault's existing "First reference rule" exactly: "when an ingest assigns a topic that does not exist yet, the AI creates a stub Topic page... Stubs grow into real pages as more notes reference them" (`note-schema.md` line 52). Strong validation, no change needed.
- **Concrete change:** None.

---

## Top actionable insights for CREATED

1. **Fix the title-convention conflict.** `new-note.md`'s "nouns over sentences" instruction contradicts Matuschak's well-evidenced claim-title principle. Narrow the rule by type: Topics (concept hubs) stay noun-phrases; atomic Notes should default to claim-titles when they argue something, with noun-phrases reserved for term-defining notes — mirroring Matuschak's own exception exactly.
2. **State the "why" behind the vault's two most defensible design bets**, both of which turn out to have strong external validation and neither of which currently cites it: topics-over-tags (Matuschak, "tags are an ineffective association structure") and concept-orientation over source-orientation (Matuschak, "evergreen notes should be concept-oriented" — this is the entire rationale for the Raw/Atlas split).
3. **Make linking a drafting-time act, not a filing-time act.** Add one sentence to the new-note SOP: the compass gets filled *while writing*, because searching for links is itself the "expansive thinking" step — not a metadata chore performed after the ideas are already settled.
4. **Add an explicit promotion trigger and a source-vs-note decision rule to `ingest-protocol.md`.** Currently the SOP says to extract and resolve entities but never states *when* an idea earns its own note (recurs / needs its own argument / provokes a reaction) versus staying a line in the source note, nor that promotion should be many-to-one in both directions (one source updates many notes; many sources collapse into one note).
5. **Adopt "atomic ≠ short, atomic = nameable at a glance" as the working test**, and reassure strangers that atomicity is a filing question, not a capture-time gate — fleeting capture should stay low-friction regardless of whether the idea is "atomic" yet.
