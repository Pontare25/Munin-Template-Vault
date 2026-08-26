---
type: fleeting
created-date: 2026-08-19
summary: Plan for researching and building the vault's knowledge layer (Notes, MOCs, Topics, source-to-atomic pipeline). Sparring doc, not final.
---

# Research plan: the knowledge layer

Goal: design how notes get **created, interconnected, distilled, and traced** in the template vault, grounded in established PKM practice but tuned to (a) this vault's existing schema and (b) the fact that it ships to strangers who should form their own habits.

## Guiding constraints

1. **Template vault, not personal vault.** Output = the *minimum viable convention set* that makes the knowledge layer work. Everything above the floor is marked optional. Same philosophy as minimal-tags.
2. **Don't reinvent the bones.** Vault already has: `note` (atomic), `topic` (hub + compass), `moc` (curated map), `source` (raw capture), the four-direction idea compass, topics-replace-tags. Research validates and sharpens these; it does not restart from zero.
3. **Load up on the under-served half.** Create + interconnect are well-covered in the literature. Distill + trace are thin everywhere. The LLM source-to-atomic pipeline is where trace/distill add real value, so weight research there.

## The four verbs (synthesis backbone)

Everything distills back into these four:

| Verb | Question the vault must answer | Where it lives |
|---|---|---|
| **Created** | What makes one good atomic note? When fleeting vs note vs topic? | `note`, `fleeting`, note-writing guide |
| **Interconnected** | Compass vs topics vs MOCs — when each? How do links accrete into structure? | compass, `topics:`, `moc` |
| **Distilled** | How does raw source become atomic knowledge? What gets compressed, what dropped? | source-to-atomic pipeline |
| **Traced** | Can you walk any claim back to its source? Provenance, citations, AI-marking | `%% #AI-Assisted %%`, Citations, `resource:` |

## Workstreams

### Workstream 0 — schema change: `challenges:` → `opposes:` (do first, blocks nothing but touches everything)

Rename the compass East key across the repo: `AI-OS/Schemas/note-schema.md` (~6 refs), every template with the key, `.base` files that filter/display it, example notes, any guide prose. Mechanical but wide. Scope it, then execute as one commit. **Not research — a prerequisite edit.** Get sign-off, then dispatch a bounded builder agent or do inline.

### Research workstreams (parallel agents)

Each agent returns a tight findings memo (claims + source + so-what for THIS vault), not an essay.

- **A — Atomic / evergreen note-writing.** Zettelkasten (Ahrens), Andy Matuschak's evergreen notes, atomicity, note-titles-as-claims, fleeting→permanent promotion. Output: what makes a good `note`, the promotion rule, title conventions.
- **B — Linking architecture & MOCs.** Nick Milo LYT / Maps of Content, structure notes, "link then file", homes for notes, when a Topic becomes an MOC, folgezettel-vs-links debate. Output: compass-vs-topics-vs-MOC decision rule; how structure emerges bottom-up.
- **C — Source → atomic pipeline + distillation + traceability.** Literature notes, progressive summarization (Forte), LLM-assisted extraction, provenance/citation practice, how others keep source→note traceable. Output: the ingestion pipeline spec + the trace model. (Heaviest workstream.)
- **D — Recent discourse scan (`/last30days` + web).** What Obsidian/PKM practitioners are actually arguing about *now* (last 30 days): what's working, what people are abandoning, LLM-in-the-vault sentiment. Output: reality-check against the evergreen-methodology findings.

### Distillation step (main thread, after agents return)

Fold four memos into one actionable insights note in this folder, organized by the four verbs, each insight tagged: keep / adopt / adapt / reject-for-template, with the concrete vault change it implies. That note becomes the build backlog.

## Sequence

0. Sign-off on this plan + the `opposes:` rename scope.
1. (optional) Execute `opposes:` rename.
2. Dispatch agents A–D in parallel.
3. Distill → actionable insights note.
4. Turn insights into build/test items (likely GitHub Project #1 issues).

## Open questions for Pontus

- **Depth of A/B?** They overlap with what the vault already encodes. Run them lean (validate + find gaps only), or full survey?
- **`opposes:` timing** — before or after research? (Before = clean base for any note examples the research produces.)
- **Scope of D** — pure sentiment/reality-check, or also hunt for concrete techniques the evergreen canon misses?
