---
type: fleeting
created-date: 2026-08-19
summary: Research findings on the source-to-atomic pipeline, distillation and traceability (DISTILLED + TRACED) for the template vault.
---

# Findings C: Source to Atomic Pipeline, Distillation and Traceability

Scope: DISTILLED and TRACED, the two of Pontus's four priorities least served by existing PKM literature. The prior art on the *human* distillation pipeline (Ahrens, Forte) is deep but silent on LLMs; the prior art on *LLM* provenance (VeriTrail, hallucinated-citation studies) is rigorous but built for RAG/agent pipelines, not personal wikis. The synthesis below bridges the two. Each finding is tagged KEEP / ADOPT / ADAPT / REJECT-FOR-TEMPLATE with a concrete change.

Note on terminology: this vault's `note` (atomic, Atlas/Notes/) maps to Ahrens's *permanent note*; the vault's `source` (Raw/Sources/) maps to Ahrens's *reference/bibliography note* plus the raw text. The vault has no explicit *literature note* type. That gap is the subject of Q1.

---

## Q1. The distillation pipeline: canonical stages, and does the template NEED a literature-note stage?

### Finding 1.1 - Ahrens's three-type ladder is fleeting -> literature -> permanent, and the literature stage is a *translation* step, not a storage step

**Claim:** Ahrens splits notes into three types with distinct jobs. Fleeting notes are raw capture ("quick notes", temporary reminders). Literature notes are made *while reading*: you write, in your own words, what you do not want to forget from a source, kept together with the bibliographic reference. Permanent notes are self-contained, declarative statements written as if for publication, one idea each, linkable and stored in the slip-box. The literature note is where source language is *translated into your own words*; the permanent note is where that idea is made context-independent and connected to the existing web of notes.
**Source:** Ernest Chiang, "Sonke Ahrens' How to Take Smart Notes" (https://www.ernestchiang.com/en/posts/2025/sonke-ahrens-how-to-take-smart-notes/); Zettelkasten Method interpretations (https://medium.com/@haikalkushahrin/my-zettelkasten-journey-understanding-the-differences-between-fleeting-notes-literature-notes-f7849b608152).
**Implication for THIS vault:** ADAPT. The template already has fleeting and permanent (`note`). The missing middle ("literature note") is the step where a source's claims are restated in the reader's words *before* being atomized. In a human Zettelkasten this step is load-bearing because it forces comprehension. In an LLM pipeline the risk is the opposite: the LLM restates fluently whether or not it understood, so the translation step no longer proves comprehension - it becomes a *provenance checkpoint* instead.
**Concrete change:** Do NOT add a first-class `literature` note type to the template (it raises the floor for strangers). Instead, fold the literature-note function into the `source` note as a required section: an LLM-written "Extracted claims" list (each claim in plain restated language, each with a pointer to the exact passage). This is the literature note, living inside the source, and it becomes the hand-off artifact the atomic notes are built from.

### Finding 1.2 - Forte's Progressive Summarization is five additive layers over an untouched Layer 0

**Claim:** Progressive Summarization works in layers. Layer 0 is the original full-length source. Layer 1 is the excerpt/passage you saved. Layer 2 is bolding the best of Layer 1. Layer 3 is highlighting the best of the bold. Layer 4 is an executive summary in your own words. Layer 5 is a remix/creation. Critically the layers are *additive and non-destructive*: each layer sits on top of the previous, the original is never overwritten, and you can always fall back down the stack to the source sentence. Forte's core principles include "opportunistic compression" (compress a note only when you happen to touch it for real work) and "don't apply all layers to all notes" (most notes stop at Layer 1 forever; value follows a power law).
**Source:** Tiago Forte, Progressive Summarization III (https://fortelabs.com/blog/progressive-summarization-iii-guidelines-and-principles/) and VI (https://fortelabs.com/blog/progressive-summarization-vi-core-principles-of-knowledge-capture/); layer definitions (https://hackmd.io/@_6snqgesSRWI1ygKSv1TtA/prog-sum-doc).
**Implication for THIS vault:** ADOPT the non-destructive-layering *principle*, REJECT-FOR-TEMPLATE the five explicit layers as a required workflow. The single most transferable idea is that **the source (Layer 0) is immutable and always reachable underneath the distilled note** - which is exactly Karpathy's "raw sources are immutable" rule and exactly what makes a note traceable. The layers themselves are too much ceremony for a template floor.
**Concrete change:** Enshrine one rule in the schema: "Distillation is additive. The atomic note is a compression *of* the source, never a replacement *for* it; the source stays in Raw/Sources/ unedited and every atomic note links back to it." Optionally expose progressive summarization as an *above-the-floor* convention for power users, not a requirement.

### Finding 1.3 - Karpathy's LLM Wiki collapses the literature-note stage into the ingest operation

**Claim:** In Karpathy's pattern there is no human literature-note step at all. The operator drops a raw source in and tells the LLM to process it; the LLM "reads the source, discusses key takeaways with you, writes a summary page in the wiki, updates the index, updates relevant entity and concept pages across the wiki, and appends an entry to the log. A single source might touch 10-15 wiki pages." The human's job is sourcing, direction, and asking questions; the LLM does "the summarizing, cross-referencing, filing, and bookkeeping." Karpathy explicitly recommends ingesting one source at a time and staying involved (reading summaries, checking updates) rather than batch-ingesting unsupervised.
**Source:** Andrej Karpathy, "LLM Wiki" gist (https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).
**Implication for THIS vault:** ADOPT. This validates the vault's existing collapse: the LLM does ingestion directly from `source` to `Atlas/`. The literature-note stage as a *separate human artifact* is genuinely unnecessary when an LLM ingests. BUT Karpathy's own "discusses key takeaways with you" and "stay involved" are doing the verification work that the human literature note used to do. The template must not drop that human-in-the-loop beat silently.
**Concrete change:** Keep the collapsed pipeline (source -> atomic, LLM-driven) but make the "summary page" an explicit intermediate artifact stored *in the source note*, so the human has one place to verify the LLM's reading before the atomic notes proliferate across the Atlas. This is the answer to RESEARCH QUESTION 1's sub-question: the template does NOT need a literature-note *type*, but it DOES need the literature-note *function* preserved as a per-source summary/claims block.

**Answer to Q1:** The canonical human ladder is capture -> restate-in-own-words (literature) -> atomize + connect (permanent). LLM ingestion can and should collapse the literature stage as a separate note *type*, but must retain its two functions: (a) forcing an explicit restatement the human can check, and (b) anchoring each restated claim to its exact source passage. Put both inside the source note.

---

## Q2. What gets COMPRESSED vs DROPPED vs PRESERVED, and the failure mode of over-distillation

### Finding 2.1 - The Zettelkasten/PS consensus: preserve the claim + the exact quote + the citation; compress the surrounding prose; drop the rhetoric

**Claim:** Practitioners consistently keep three things when a source becomes a note: the idea restated in your own words (the atomic claim), a verbatim quote or highlighted sentence "to capture the entire idea in essence and give context to the highlight", and the citation with page/locator. The bibliography (source) note "is either the original text that resonated with you or a collection of fleeting notes that all were inspired by a common source ... it can also give context to what you were thinking, should you return to your notes at a later time." What gets dropped: transitional prose, throat-clearing, the author's rhetorical framing, redundant examples. What gets compressed: multi-paragraph arguments collapse to one declarative sentence.
**Source:** Protolyst, "How to take Notes using Zettelkasten" (https://protolyst.org/how-to-take-notes-using-zettelkasten); Forte PS VI "balance detail with discoverability" (https://fortelabs.com/blog/progressive-summarization-vi-core-principles-of-knowledge-capture/); fairylights.io Zettelkasten examples (https://medium.com/@fairylights_io/the-zettelkasten-method-examples-to-help-you-get-started-8f8a44fa9ae6).
**Implication for THIS vault:** ADOPT. The verbatim-quote-plus-restatement pairing is the crucial traceability primitive and it is cheap. The template should require that each atomic claim carry (or be one click from) the exact source sentence it compresses.
**Concrete change:** In the source note's "Extracted claims" block, store rows of `restated claim | verbatim quote | locator`. When an atomic note is created from a claim, it inherits the quote as a blockquote under a `> [!quote]` callout or a `# Citations` line pointing at the source's block-referenced passage.

### Finding 2.2 - Over-distillation failure mode: the atomic note becomes context-free to the point of being unverifiable or wrong

**Claim:** Forte warns explicitly against pushing every note through all layers ("more summarization is not better"). Ahrens's requirement that a permanent note be understandable "out of any context" is in tension with traceability: a maximally context-free sentence has severed the thread back to *why it is true* and *under what conditions the source asserted it*. The Zettelkasten forum's "unverified indirect claims" thread captures the concrete danger: when a source cites a secondary source, atomizing the claim without recording that it is a second-hand, unverified claim launders a hedge into a fact. ("Do you cite the original source, the secondary source, or both?")
**Source:** Forte PS III principle 1 (https://fortelabs.com/blog/progressive-summarization-iii-guidelines-and-principles/); Zettelkasten Forum, "How to handle unverified indirect claims?" (https://forum.zettelkasten.de/discussion/2960/how-to-handle-unverified-indirect-claims).
**Implication for THIS vault:** ADOPT as an explicit anti-pattern in the schema. Over-distillation is the DISTILLED priority's own worst enemy: it produces confident, connectable, wrong atomic notes. The LLM makes this failure *more* likely because it will happily strip every hedge to produce a clean declarative sentence.
**Concrete change:** Add a schema rule: "Preserve epistemic status. If the source hedges ('may', 'one study suggests', 'X claims'), the atomic note must preserve the hedge and, for second-hand claims, name whose claim it is. Never upgrade a hedged or attributed claim into a bare fact." This is a distillation-quality rule *and* a traceability rule.

### Finding 2.3 - "Resonance" and "opportunistic compression" mean most sources should NOT be fully atomized

**Claim:** Forte: capture by resonance, compress opportunistically, and expect a power law where a few notes carry most value. Most captured material should rest at a low layer until real work pulls it forward.
**Source:** Forte PS III (https://fortelabs.com/blog/progressive-summarization-iii-guidelines-and-principles/).
**Implication for THIS vault:** ADAPT. For an LLM-curated wiki this is a *cost and noise* argument: exhaustively atomizing every source floods the Atlas with low-value orphan notes and dilutes the graph. But an LLM's marginal cost of atomizing is near zero, which pushes the opposite way. The template should give the human a throttle.
**Concrete change:** Schema guidance: "Default to a source summary plus 1-5 atomic notes for the genuinely novel claims, not one note per sentence. Depth of atomization is the human's call, signalled at ingest time." Keeps the graph legible and prevents LLM over-production.

---

## Q3. TRACEABILITY - keeping an atomic note walkable back to the exact source claim

### Finding 3.1 - The technique ladder, weakest to strongest

**Claim:** Practitioners use, in increasing strength of auditability:

1. **Citation block** - a `# Citations` / bibliography line naming the source. Walkable to the *document*, not the *claim*. (This is what the vault has today.)
2. **Source backlink / frontmatter provenance** - a wikilink from note to source (and ideally source to note). Walkable to the document, bidirectional.
3. **Locator citation** - source + page/timestamp/section (`lastName, year, pp.22`). Walkable to a *region* of the source.
4. **Block reference / transclusion** - the note points at the *specific block* in the source note (Obsidian `^block-id`), or transcludes the exact sentence. Walkable to the *exact claim*.
5. **Verbatim quote carried in the note** - the source sentence lives inside the atomic note as a blockquote, so the claim is auditable *without leaving the note*.
**Source:** Zettelkasten citation practice (https://medium.com/@fairylights_io/the-zettelkasten-method-examples-to-help-you-get-started-8f8a44fa9ae6); Atlassian Zettelkasten guide "include the source of the information" (https://www.atlassian.com/blog/productivity/zettelkasten-method); Protolyst bibliography-note highlighting (https://protolyst.org/how-to-take-notes-using-zettelkasten).
**Implication for THIS vault:** The vault currently sits at level 1-2 (Citations heading + source-records-where-content-went backlink + `resource:` canonical URI). That makes claims walkable to the *document* but not to the *exact claim*. For an LLM pipeline, document-level trace is not enough (see Q4): you cannot audit an LLM's compression if you have to re-read the whole source to find what it compressed.
**Concrete change:** Push the template's floor to **level 4 or 5 for AI-written claims specifically**: every `%% #AI-Assisted %%` claim must carry either a block reference to the source passage OR the verbatim quote inline. Human-written notes may stay at level 2. This ties trace strength to hallucination risk (cheap where safe, strict where the LLM authored it).

### Finding 3.2 - The minimum that makes a claim auditable: restatement + verbatim anchor + resolvable source id

**Claim:** A claim is auditable when a reader can, in one step, see (a) what the note asserts, (b) the exact source text it rests on, and (c) how to open that source. Anything less forces a re-reading of the whole source to check the compression, which no one does, so unverified LLM claims silently harden into "facts". VeriTrail formalizes the same requirement for AI pipelines: provenance means "if the final output is supported by the source text, we should be able to trace its path ... to the source."
**Source:** Microsoft Research, VeriTrail (https://www.microsoft.com/en-us/research/blog/veritrail-detecting-hallucination-and-tracing-provenance-in-multi-step-ai-workflows/); Protolyst (verbatim highlight beside restatement).
**Implication for THIS vault:** ADOPT as the definition of the template's trace floor. See deliverable (b).
**Concrete change:** Define "auditable claim" in the schema as: restated claim + verbatim quote (or block-ref) + resolvable `resource:`/source link. Ship a note template that has slots for all three.

---

## Q4. LLM-IN-THE-LOOP: how AI extraction changes distillation and what NEW trace safeguards it needs

### Finding 4.1 - LLMs fabricate citations at measurable rates; the citation itself is a hallucination surface

**Claim:** Non-existent citations are a documented, large-scale LLM failure mode: models generate plausible-looking references to sources that do not exist. Legal-domain benchmarking found leading models hallucinate in roughly 1 of 6 (or more) queries. This matters uniquely for a *citation-based* wiki: the very mechanism the vault uses for traceability (the `# Citations` list) is a thing the LLM can invent.
**Source:** "LLM hallucinations in the wild: Large-scale evidence from non-existent citations" (https://arxiv.org/pdf/2605.07723); Stanford HAI, "AI on Trial: Legal Models Hallucinate in 1 out of 6" (https://hai.stanford.edu/news/ai-trial-legal-models-hallucinate-1-out-6-or-more-benchmarking-queries).
**Implication for THIS vault:** ADOPT a hard constraint. In an LLM wiki the citation must be *derived from an ingested source that physically exists in Raw/Sources/*, never free-generated. A citation the LLM writes from memory is worthless and dangerous.
**Concrete change:** Schema rule: "The LLM may only cite sources present in Raw/Sources/ (or an explicitly provided URL it actually fetched this session). It must never author a citation from parametric memory. Every `# Citations` entry must resolve to a `resource:` that exists." Consider a lint check: every citation URI resolves to a real source note or a fetched artifact.

### Finding 4.2 - Multi-step LLM pipelines need provenance AND error-localization; verify claims backward from output to source

**Claim:** VeriTrail models any multi-step generative process as a directed acyclic graph: each node is a piece of text (source chunk, intermediate output, or final note), each edge means "A was an input used to produce B". Traceability has two parts: *provenance* (trace a supported claim back through intermediate steps to the source) and *error localization* (if unsupported, find where the error entered). Verification runs *backward*: extract self-contained claims from the output (via Claimify), then for each claim walk edges toward the source, at each step doing Evidence Selection (which source sentences support the claim) and a Verdict (Fully Supported / Not Fully Supported / Inconclusive), terminating at an immutable source chunk. "Closed-domain hallucination" is exactly the case where output is not supported by provided source text.
**Source:** Microsoft Research, VeriTrail, ICLR 2026 (https://www.microsoft.com/en-us/research/blog/veritrail-detecting-hallucination-and-tracing-provenance-in-multi-step-ai-workflows/).
**Implication for THIS vault:** ADAPT. The vault's ingest IS a multi-step generative process (source -> summary -> atomic note -> topic rollup), so it inherits exactly this problem. Full VeriTrail machinery is far above a template floor, but its core model is directly transferable: (1) atomic notes should be *self-contained verifiable claims* (Claimify's unit is the vault's atomic note), and (2) each note should record the *edge* back to the exact input it came from, so a human (or a future lint agent) can verify backward. The vault's "source records where its content went" is the forward edge; VeriTrail says you also need the backward edge stored *on the note*.
**Concrete change:** Ensure every atomic note stores its immediate provenance edge: `source:` (or `extracted-from:`) pointing at the specific source note, ideally at a block within it. This makes the vault a walkable DAG rather than a bag of notes with a loose citation list. It also makes a future "verify this note against its source" lint pass mechanically possible.

### Finding 4.3 - Marking AI vs human authorship is a first-class trace requirement, and needs granularity

**Claim:** When an LLM writes the knowledge, "who asserted this" splits into three: the original source, the LLM that restated it, and the human who did (or did not) verify it. Karpathy's pattern keeps the human as curator/verifier ("stay involved, read the summaries, check the updates") precisely because the LLM's output is unverified by default. Distinguishing AI-drafted-unreviewed from AI-drafted-human-reviewed is the difference between an auditable and an unauditable claim.
**Source:** Karpathy LLM Wiki (https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f); VeriTrail's verdict states as a model for review status (https://www.microsoft.com/en-us/research/blog/veritrail-detecting-hallucination-and-tracing-provenance-in-multi-step-ai-workflows/).
**Implication for THIS vault:** KEEP and sharpen. The vault's `%% #AI-Assisted %%` marker with /Drafted, /Collaborative, /Reviewed refinements already encodes authorship *and* review status - this is ahead of the surveyed prior art, none of which marks AI authorship at all. The gap is that the refinement is optional and its meaning ("Reviewed" = a human checked it against the source) is not defined as a *verification* claim.
**Concrete change:** Define the refinements precisely in the schema: `/Drafted` = LLM wrote, not human-checked against source; `/Reviewed` = a human verified this claim against its cited source passage; `/Collaborative` = co-written. Make `/Reviewed` mean specifically "the backward trace in Finding 4.2 was walked and the claim is Fully Supported." That turns the marker into an audit record, not just an authorship label.

---

## Q5. Bidirectional provenance: evaluate the vault's current approach

### Finding 5.1 - Bidirectional provenance is best practice; the vault has the forward edge and a weak backward edge

**Claim:** The gold standard is a two-way link: the source knows which notes it fed (forward), and each note knows its source (backward). VeriTrail's DAG is explicitly bidirectional-walkable (edges are directed but the graph is traversed both ways: forward to see impact, backward to verify). Zettelkasten practice puts the citation *on the note* (backward) and, in tools like Protolyst, shows all fleeting notes extracted from a source *on the source* (forward). The vault today has: forward edge = "the source records where its content went" (source -> notes, good); backward edge = `# Citations` list + `resource:` field (note -> source, but document-level, not claim-level).
**Source:** VeriTrail (https://www.microsoft.com/en-us/research/blog/veritrail-detecting-hallucination-and-tracing-provenance-in-multi-step-ai-workflows/); Protolyst bibliography note showing extracted fleeting notes beside the source (https://protolyst.org/how-to-take-notes-using-zettelkasten).
**Implication for THIS vault:** The vault's design instinct is right and, on the forward edge and the AI-authorship marker, ahead of the field. Where it is thin:

- **Backward edge is document-level, not claim-level.** `# Citations` says "this note came from that source" but not "this sentence came from that sentence." For LLM-written content that is the exact granularity you need to audit compression (Q3, Q4).
- **The two edges can drift out of sync.** If the LLM adds a note but forgets to update the source's "where content went" list (or vice versa), provenance silently breaks. Nothing enforces the pair.
- **No verification state on the backward edge.** A citation records origin but not whether the claim was checked against that origin (Finding 4.3).
**Concrete change:**

1. Promote the backward edge to claim-level for AI-written claims (block-ref or inline quote, per Finding 3.1).
2. Make the forward/backward pair a lint invariant: for every atomic note with `source: X`, source X must list that note, and vice versa. Orphaned half-edges are a lint finding.
3. Attach verification state to the edge via the `/Reviewed` refinement (Finding 4.3).

### Finding 5.2 - Store provenance in frontmatter, not only prose, so it is machine-walkable

**Claim:** Karpathy notes that if the LLM adds YAML frontmatter (tags, dates, source counts), Dataview/Bases can generate dynamic tables and the graph stays queryable; the index.md catalog and log.md timeline both depend on parseable structure. A `# Citations` heading in prose is human-readable but not reliably machine-walkable for lint/verify passes.
**Source:** Karpathy LLM Wiki, "Indexing and logging" and "Dataview" tip (https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).
**Implication for THIS vault:** ADAPT. Keep `# Citations` for human readability (it is OKF-friendly and renders well), but *also* carry the primary source link in frontmatter so a lint agent can walk provenance without parsing prose.
**Concrete change:** Add an optional `source:` (or `sources:`) frontmatter wikilink list to the atomic note type, mirroring the existing idea-compass fields (`up:`/`related:`/`down:`/`opposes:`). The `# Citations` block stays for full OKF citation detail; frontmatter carries the walkable edge.

---

## DELIVERABLE (a): Proposed end-to-end pipeline spec

Ordered stages from raw source to filed atomic notes. **H** = human does it, **L** = LLM does it, **H+L** = collaborative. Each stage names the artifact it produces.

| # | Stage | Actor | Input | Artifact produced |
|---|-------|-------|-------|-------------------|
| 0 | **Capture** - drop source into Raw/Sources/ (web clipper, PDF, paste). Source note gets `resource:` canonical URI. | H | external material | immutable `source` note (Layer 0) |
| 1 | **Read + restate** - LLM reads the source and writes an "Extracted claims" block *inside the source note*: each claim restated in plain words, paired with the verbatim quote and a locator/block-id. This is the collapsed literature-note function (Q1). | L | source note | claims block on the source note (the literature note, in-place) |
| 2 | **Discuss / confirm scope** - LLM surfaces key takeaways; human confirms which claims are worth atomizing and how deep to go (Finding 2.3 throttle). Prevents over-production. | H+L | claims block | agreed shortlist of claims to atomize |
| 3 | **Atomize** - LLM creates one `note` per genuinely novel claim in Atlas/Notes/. Each is a self-contained verifiable statement (Claimify unit), carries the verbatim quote or block-ref back to the source, `source:` frontmatter edge, `# Citations`, and `%% #AI-Assisted/Drafted %%`. Epistemic hedges preserved (Finding 2.2). | L | shortlist | atomic `note`s (permanent notes) |
| 4 | **Interconnect** - LLM assigns `topics:`, fills idea-compass (`up:/related:/down:/opposes:`), updates/creates `topic` and entity pages, updates any MOC. A source may touch 10-15 pages (Karpathy). | L | atomic notes | edges + updated topic/entity pages |
| 5 | **Record forward edge** - LLM updates the source note's "where this content went" list to point at every note created. Forward + backward edges now both exist. | L | atomic notes + source | bidirectional provenance pair |
| 6 | **Log** - append one line to log.md: `## [2026-08-19] ingest \| <source title> \| N notes`. | L | all of the above | chronological audit entry |
| 7 | **Review (verify)** - human (or later a verify-lint agent) walks the backward edge for AI claims, checks each against its cited passage, and upgrades `/Drafted` to `/Reviewed` on those confirmed Fully Supported. | H | atomic notes + sources | verified claims (audit state) |
| 8 | **Lint (periodic)** - health check: orphan notes, broken/half provenance edges, citations that do not resolve to a real source, contradictions, stale claims. | L | whole vault | lint findings for human triage |

Stages 0, 2, 7 keep the human in the loop (the beats Karpathy insists on). Stages 1, 3-6, 8 are LLM grunt work. Stage 7 is the safeguard the surveyed human methods never needed and the LLM pipeline cannot skip.

---

## DELIVERABLE (b): The trace model (minimum provenance for one atomic note)

The minimum that makes a single atomic `note` walkable back to its exact source claim. Stated as a concrete convention.

**Frontmatter (machine-walkable edge):**
```yaml
---
type: note
source: "[[Name of the source note]]"   # backward edge; wikilink to the Raw/Sources/ note
# optional when a note fuses several sources:
# sources: ["[[Source A]]", "[[Source B]]"]
---
```

**Body (human-auditable anchor):**
```markdown
<the atomic claim, one self-contained sentence, hedges preserved>

> [!quote] From [[Name of the source note]]
> <verbatim sentence(s) the claim compresses>   %% or a block-ref: ![[Source note#^abc123]] %%

%% #AI-Assisted/Drafted %%   <!-- becomes /Reviewed once verified against the quote above -->

# Citations
- <OKF-style full citation, absolute URL or bundle-relative path, from the source's resource:>
```

**The three mandatory elements (the auditable-claim floor, Finding 3.2):**

1. **Restated claim** - the note's own sentence.
2. **Verbatim anchor** - the exact source text, carried inline as a quote OR as a block-reference/transclusion to the source note. This is the element the vault is currently missing for AI content.
3. **Resolvable source id** - `source:` frontmatter wikilink + `# Citations` entry that resolves to a real `resource:` in Raw/Sources/ (never LLM-invented).

**Tiering (so the floor stays low for strangers):**

- **Human-written note:** elements 1 + 3 required; element 2 optional. (Trust the human's reading.)
- **AI-written note (`%% #AI-Assisted %%`):** all three required. (Do not trust the LLM's reading until anchored and reviewable.)

**Invariant for lint:** for every note with `source: X`, source X's "where content went" list includes this note (bidirectional pair intact), and every `# Citations` URI resolves to an existing source. A broken half-edge or an unresolvable citation is a lint finding.

---

## Top actionable insights for DISTILLED + TRACED

1. **Collapse the literature-note *type* but keep its *function* in the source note.** LLM ingestion makes a separate literature note redundant, but its two jobs (explicit restatement + passage anchoring) must survive as an "Extracted claims" block on the source, which becomes the hand-off artifact for atomization. (Q1; Ahrens, Karpathy.)
2. **Tie trace strength to authorship: verbatim/block-ref anchoring is mandatory for AI-written claims, optional for human ones.** The citation-list floor the vault has today is document-level; that is fine for a human who read the source, insufficient for auditing an LLM's compression. This keeps the floor low where it is safe and strict where hallucination risk lives. (Q3, Q4; VeriTrail, hallucinated-citation studies.)
3. **Preserve epistemic status as a distillation rule.** The signature over-distillation failure, amplified by LLMs, is stripping hedges and attribution so a "one study suggests" or a second-hand claim hardens into a bare fact. Forbid upgrading hedged/attributed claims. (Q2; Forte, Zettelkasten unverified-claims thread.)
4. **Make provenance a bidirectional, machine-walkable, lint-enforced pair.** Store the backward edge in `source:` frontmatter (not only prose), keep the forward "where content went" edge, and add a lint invariant that the two must match and that every citation resolves to a real source. This turns the vault into a walkable DAG (VeriTrail model) instead of a bag of notes with loose citations. (Q5; VeriTrail, Karpathy.)
5. **Add an explicit human verification stage that upgrades `/Drafted` to `/Reviewed`.** The vault's AI-authorship marker is already ahead of the field; give `/Reviewed` a precise meaning ("a human walked the backward trace and the claim is Fully Supported against its cited passage"). That is the one safeguard the human PKM canon never needed and the LLM pipeline cannot omit. (Q4; Karpathy's "stay involved", VeriTrail verdicts.)
