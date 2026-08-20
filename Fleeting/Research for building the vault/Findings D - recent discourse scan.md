---
type: fleeting
created-date: 2026-08-19
summary: Recent (last-30-day) PKM/Obsidian discourse scan — reality-check plus new techniques — for the template vault.
---

# Findings D — Recent Discourse Scan (last ~30 days)

Method note: `/last30days` (Reddit, YouTube, Hacker News, GitHub; X/TikTok unavailable — no auth configured) ran four targeted queries. Reddit hit rate-limiting after 3-10 items per query (partial coverage, not "nothing happening"). Supplemented with `firecrawl-search` web search + `defuddle` page fetches for blog-level discourse the social engine doesn't reach. No last30days credit/tool failures; both tools worked.

---

## Q1 — Adopting vs abandoning (atomic notes, MOCs, tags/links, folders)

**Notion → Obsidian migration wave continues.** "Notion finally broke me. Seriously considering moving everything to Obsidian" — r/ObsidianMD, 2026-08-16, 347 pts / 157 comments. Complaint is speed/reliability, not philosophy — people aren't picking Obsidian for Zettelkasten purity, they're fleeing a slow app. → **KEEP**: doesn't change the template's knowledge-layer design, just confirms the audience.

**Capture-first, categorize-never (or later).** "Atomic plugin" — r/ObsidianMD, 2026-08-19 — a plugin for quick capture "without having to categorize it yourself" at capture time, syncing across 5 devices. Small thread but the pattern (frictionless capture, defer structure) is consistent with what fleeting-note practice already assumes. → **KEEP** (validates the `fleeting` type existing as a distinct low-friction layer).

**MOCs are drifting from hand-curated to query-generated.** dsebastien.net, "The Complete Guide to Dataview in Obsidian" (recent): a section titled "Maps of Content that maintain themselves" — the pitch is MOCs built from live Dataview/Bases queries instead of manually re-edited hub notes, because manual MOCs go stale. → **ADOPT-candidate**, see Q3.

**Hub notes over folders, in mainstream/creator content.** Instagram reels (low-value individually, but indicative of what's reaching non-power-users): "What if your notes didn't look like folders... M.O.C.s (Map of Content): instead of folders, you create 'hub' notes... a dynamic table of contents." This is now beginner-level advice, not power-user doctrine. → **KEEP**: the template already treats `topics:` as the organizing layer over folders — this is right on trend.

The strongest abandonment signal is a full reversal, not a tweak — see Q4 (Jack Baty). It belongs there because it's squarely a canon-contradiction, not an incremental adoption/abandonment note.

---

## Q2 — LLM-in-the-vault: sentiment and workflows

**Hype is real and current (mid-2026), driven by "Obsidian + Claude Code" specifically, not generic AI-notes.**
- Greg Isenberg, "How I Use Obsidian + Claude Code to Run My Life" — 2026-02-23, 436,928 views, 8,774 likes. Pitches Obsidian as the data layer and Claude Code as the agent that queries it (e.g., "compares my stated attention intentions against actual behavior over 30-60 days").
- KJ Rainey, "How To Build The ULTIMATE AI Second Brain (Obsidian + Claude Code)" — 2026-04-10, 227,316 views.
- Nate Herk, "I Turned Claude Into the Ultimate Second Brain" — 2026-06-10, 349,474 views. Ties it to "Claude Fable" (their Opus 5-class release).
- Nick Milo (Linking Your Thinking), "Obsidian + AI: How to Do It The Right Way" — 2025-09-11, 212,566 views — notably framed defensively ("how I defend my workflows from the negative effects of AI"), i.e. even the most-cited LYT figure is treating AI as something to be guarded against, not embraced wholesale.

**But there's real skepticism inside the hype itself.** Top comment on the Isenberg video (6 likes, but pointed): "One guy, scrolls & reads LLM insights about his notes to another guy." — audience noticing thin content dressed as breakthrough workflow. → the AI-second-brain genre is popular but not universally trusted even by its own viewers.

**Explicit backlash, from a credible PKM-native source.** ssp.sh, "Keep AI Out of Your (Obsidian) Vault" (2026, comments as recent as 2026-04-26): "I think it's a dead end... I'm a strong proponent of avoiding adding lots of AI-generated summaries or other on-the-fly-generated text to my vault... over time I don't know anymore whether the content was written by me or by an AI, and my own, much more valuable thoughts get diminished by 'AI Slop'... **don't use it for tagging or organization**, because eventually all your relations and connections won't count for anything, since they aren't made by you." Quotes Kepano (Obsidian's own creator/lead): "A summary of a PDF is noise. An insight I had from reading the PDF is signal." → **This is the single most load-bearing finding for the template.** See Q4.

**RAG-over-vault is moving from idea to shipped plugins.** "Claude Obsidian Plugin Gives Claude A Real Memory" (r/AISEOInsider, recent) — turns a vault into a grounded memory store an agent can query. "Better Paste" — new plugin from the author of a Notebook-LM-style tool, explicitly cross-pollinating NotebookLM's RAG UX into Obsidian.

**Engineering-side: vaults as agent memory infrastructure, with safety rails emerging.** GitHub activity (not social chatter, but a real signal of what builders are doing right now):
- `optimikelabs/optimike-obsidian-mcp` PR (2026-08-13): "atomic note operation runtime" — adds a `Vault.process`-based SHA-256 compare-and-replace write bridge for AI agents editing Markdown notes. This is a **hash-guarded atomic write pattern** specifically to stop an AI agent from clobbering concurrent edits.
- `escoffier-labs/brigade` PR (2026-08-14): "project canonical memory into an Obsidian vault" — treats the vault as the canonical memory target for a coding-agent system, not a personal PKM at all.
- HN, "Session Visualization with Obsidian" (2026-08-17) — using Obsidian purely as a visualization layer for AI agent session logs.

**Read across Q2:** the loudest voices (YouTube creators) are bullish and growing; the most PKM-literate voices (ssp.sh, Kepano) are drawing a hard line specifically around AI writing tags/links/summaries into the vault, which is close to the *center* of what an LLM-curated template vault does. That's a genuine, non-trivial tension for this project — not just noise.

---

## Q3 — Concrete recent techniques not in the evergreen canon

None of these are in Ahrens/Matuschak/Milo (all predate or are orthogonal to them):

1. **Self-maintaining MOCs via live queries** (Dataview/Bases) instead of hand-edited hub notes. — **ADOPT**: fits a template meant for strangers; a query-based MOC degrades gracefully (stays technically accurate) even if the human never revisits it, where a manually-curated MOC just goes stale and erodes trust in the whole layer.
2. **Hash-guarded atomic writes for AI-agent vault edits** (SHA-256 compare-and-replace before an agent overwrites a note). — **ADOPT-candidate**: directly relevant to any template whose SOP has an LLM writing/editing notes; worth a line in the ingestion SOP about not blind-overwriting a note that changed since it was read, even if the current pipeline is single-agent/single-session today.
3. **Vault as canonical agent memory, separate from personal PKM use** (`escoffier-labs/brigade` pattern; "Session Visualization with Obsidian"). — **REJECT-FOR-TEMPLATE** as a default: this template is explicitly a personal wiki for a human, and conflating "vault = my thinking" with "vault = agent scratch memory" is exactly the boundary ssp.sh/Kepano warn about eroding. Worth flagging as an anti-goal, not a feature to chase.
4. **Capture-without-categorizing plugins** as a first-class UX pattern (the "Atomic plugin" thread). — **KEEP**, already the intended function of `fleeting`.
5. **RAG-over-vault as an explicit, named workflow** (Better Paste, Claude-memory plugins) distinct from "AI writes into my vault." — worth distinguishing in the template's language: *querying* the vault with AI (read-only, ssp.sh calls this the "best use case") vs. *AI writing into* the vault (tagging/organizing, which ssp.sh/Kepano reject). The template's `%% #AI-Assisted %%` provenance markers already draw this line for writes; it's not drawn anywhere for reads/queries because that's implicitly fine. → **ADAPT**: could be worth a one-line clarification in the philosophy docs that AI read/query access is unrestricted but AI write access is provenance-marked, since that's precisely the distinction current discourse cares about.

---

## Where recent practice contradicts the canon

This is the counterweight section — direct tensions, dated, sourced.

**1. "Atomic notes + heavy backlinking" is being actively abandoned by a real practitioner, not just theorized about.**
Jack Baty (baty.net, 2026-08, "I deleted nearly all of my notes, on purpose"): went from ~4,000 files to 170 in one sitting. "Having lost my religion around 'zettelkasten' and 'second brains', my notes started to look a little silly. Hundreds of nearly empty files with carefully-curated front matter are not helpful, no matter how many links between them have been created." His reasoning is specific and worth quoting further: "It's not that I've been doing it wrong, but I'm not an academic. I'm not doing research for a book. I'm not studying for an exam. Those tasks might benefit from the whole link-everything-and-generate-a-cool-graph thing, but mine don't." What he kept instead: tips/how-tos, people notes, active projects, and a personal log — a much flatter, more utilitarian shape than atomic-note-and-link orthodoxy.
→ This directly contradicts Ahrens-style "atomicity + density of links is inherently valuable" and Matuschak-style "evergreen notes accumulate into a web of thought" as universal advice. Baty's point is that this is genre-specific (academic/research work) and was cargo-culted into general personal note-taking where it doesn't pay for itself.
→ **Relevance to the template**: the template explicitly targets "strangers" as a general-purpose starting point, not academics. Baty's critique lands squarely on that audience. Doesn't mean scrap atomic notes — but it's a real data point that mandatory atomicity + mandatory linking for *every* note is a canon assumption that breaks for a lot of real personal use, and "minimum viable conventions" (already the template's stated philosophy) is the correct hedge against this failure mode, not an accident.

**2. "Let AI help you tag and link" — the exact mechanism many second-brain-AI pitches sell — is explicitly rejected by PKM-native voices, including Obsidian's own creator.**
ssp.sh + Kepano (quoted above): AI should not write tags, organization, or relations into a vault, because the value of a PKM system is specifically that *you* made the connections. An AI-generated link is worth nothing next to a human-made one, even if it's topologically identical in the graph.
→ **Relevance to the template**: the LLM-assisted source→atomic ingestion pipeline, and specifically the idea-compass fields (`up`/`related`/`down`/`opposes`), are compass-generation-by-AI in exactly the shape this critique targets. The template's `%% #AI-Assisted %%` provenance marker is the right instinct (mark what wasn't human-made) — current discourse validates keeping that marker prominent and possibly extending the caution: an AI-populated compass field should read as a suggestion pending confirmation, not a settled fact, if the template wants to avoid shipping the exact failure mode ssp.sh describes.

**3. "MOCs don't scale" is not itself a strong current claim (no loud "MOCs are dead" thread found) — the more accurate current claim is "static, hand-curated MOCs go stale and lose trust," with the fix being query-generation, not abandonment of MOCs as a concept.** This is a *refinement* of canon (Milo's own LYT method already assumes MOCs), not a reversal — flagging it here because a shallower reading of "MOC" discourse could wrongly conclude MOCs are being abandoned; they're being automated instead.

**4. "Just use tags/search, skip the linking" — not found as an active current position in this window.** No thread argued for abandoning links in favor of search/tags. If anything, the tags-vs-links conversation has moved on entirely into MOC-generation-mechanics, suggesting that debate is settled/stale relative to newer questions (how much AI, how much automation) rather than live.

---

## Reality-check takeaways for the template vault

- **The single biggest live risk isn't atomic notes or MOCs, it's AI writing organization into the vault.** Both the loudest AI-hype creators and the most credible PKM-native critics agree the highest-value/highest-risk zone is exactly where the template's ingestion pipeline operates (AI proposing links, compass relations, and topics). The `%% #AI-Assisted %%` provenance convention is validated by current discourse, not just good practice — keep it prominent, and consider treating AI-populated compass fields as provisional/human-confirmable rather than final.
- **"Minimum viable conventions" is the correct hedge against the Jack Baty failure mode**, where mandatory atomicity + mandatory linking, applied uniformly to a non-academic user's entire note corpus, produces "hundreds of nearly empty files with carefully-curated front matter" that nobody benefits from. The template already leans this way — the discourse confirms it's the right lean, not a compromise.
- **Query-generated ("self-maintaining") MOCs are a genuinely new, low-risk improvement worth adopting**: they solve the actual failure mode people are hitting (stale hand-curated hubs) without touching the template's core philosophy, and they degrade gracefully for strangers who never revisit a hub note.
- **AI-second-brain hype (Obsidian + Claude Code specifically) is large and current but shallow in places** — even hype-video audiences are calling out thin "screen-share and narrate" content. Don't let the popularity of the genre imply the underlying techniques are settled best practice; the more PKM-literate the source, the more cautionary the take.
- **Treat "vault as agent memory substrate" (a real, shipping GitHub pattern right now) as an explicit anti-goal for this template**, not a feature roadmap item — it's the clearest version of the boundary-erosion ssp.sh warns about, and conflating "personal wiki for a human" with "scratch memory for an agent" undermines the whole premise of an LLM-curated *personal* wiki.
