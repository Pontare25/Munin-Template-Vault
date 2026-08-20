---
type: fleeting
created-date: 2026-08-19
summary: Research findings on linking architecture and MOCs (the INTERCONNECTED verb) for the template vault.
---

# Findings B: Linking Architecture and MOCs

Research survey for the INTERCONNECTED workstream of the Munin Template Vault. Covers Nick Milo / LYT, zettelkasten.de and Bob Doto on folgezettel, and Obsidian's own linking mechanics. Goal: validate and sharpen the existing four-mechanism model (inline links, compass fields, `topics:`, MOCs), not replace it.

---

## Q1. What exactly is a Map of Content (MOC)?

**Claim:** Milo defines an MOC as "a cluster of information that maps 'things' in context with other 'things.'" It is a note whose job is to *gather, develop, and navigate* links to other notes on a theme, not to categorize them. Distinguishing properties per Milo: MOCs are **non-hierarchical/heterarchical** (unlike folders or a table of contents, the same note can appear in multiple MOCs, arranged differently each time), **non-destructive** (an "overlay," doesn't own or move the notes it links), and **fluid** (expected to change shape as understanding matures).
**Source:** Nick Milo, "MOCs Overview," LYT Kit, https://notes.linkingyourthinking.com/Cards/MOCs+Overview
**Implication for vault:** KEEP the existing `moc` type's job description ("curated map"); it matches Milo's definition closely already. **Concrete change:** the MOC template/guide should explicitly state the heterarchy property: the same note can and should appear in more than one MOC. If current guidance implies one-home-per-note, that's a folder mindset bleeding in and should be corrected.

**Claim:** MOC vs. tag vs. folder vs. index, stated as an analogy: "If links and backlinks are like roads, tags are like road signs, folders are like houses, and MoCs are maps." A tag says two notes share an attribute (a *weak* relationship); a link says two notes are *related*, closer to "blood relatives." An MOC's superpower over a tag or folder: **one note can be linked from many different MOCs**, each MOC giving it different context; a folder or a single index page cannot do that.
**Source:** Sebastien Dubois (dsebastien.net), "Maps of Content," https://www.dsebastien.net/2022-05-15-maps-of-content/; also Nick Milo, "Idea Emergence Q&A Part 1" (YouTube transcript), https://www.youtube.com/watch?v=WUq8Pun28FI
**Implication for vault:** ADOPT this "links=roads, tags=signs, folders=houses, MOCs=maps" framing as a teaching device inside the vault's linking guide, it's a crisp mental model a stranger can hold onto. **Concrete change:** add this analogy (adapted: this vault has no tags for categorization, `topics:` does that job, so restate as "topics: = road signs, MOC = map") to whatever doc explains the four mechanisms.

**Claim:** An MOC differs from a plain **index** in that an index is typically a flat, complete, alphabetical or chronological list (comprehensiveness is the goal), while an MOC is a **curated, opinionated, contextual arrangement**, it can group notes under headings that represent a point of view, and it doesn't need to be complete. A "case for MOCs" thread on the Obsidian forum frames this via network topology: a **centralized** network (one index node everything routes through) is rigid and creates weak, indirect connections; a **distributed** network (no index at all, pure backlinks) is spontaneous but disorienting; a **decentralized** network, many local MOCs radiating from a loose home, gives both spontaneity and navigability. MOCs are explicitly *not* meant to be the single source of truth for a note's location; a note can sit ungrouped in the main note pool indefinitely and only get pulled into an MOC "later, if it needs to be classified further."
**Source:** Obsidian Forum, "A Case for MOCs" (foundational community post crediting Milo), https://forum.obsidian.md/t/a-case-for-mocs/2418
**Implication for vault:** This directly validates the vault's `topic` type as something distinct from `moc`. A Topic page (per the vault's existing model) reads like the "hub with full compass," closer to a *node* in the decentralized-network sense, doing double duty as both a content note and a light index. A MOC is the more deliberately curated, editorial layer above that. KEEP the type distinction; ADOPT the centralized/distributed/decentralized framing as the rationale for why the vault needs three tiers (Notes to Topics to MOCs) rather than collapsing to two.

**Claim:** A real objection surfaced in that same forum thread deserves airtime rather than being ignored: MOCs cost *maintenance* (you must remember to add/prune links) with a payoff, "new insight through juxtaposition", that's hard to verify actually happens, especially for a stranger new to the practice. The rebuttal in Milo's own material is that this cost is optional and deferred: **you don't build MOCs pre-emptively; you build them only once the admin cost is worth paying** (see Q2).
**Source:** Obsidian Forum, "A Case for MOCs," reply thread, https://forum.obsidian.md/t/a-case-for-mocs/2418
**Implication for vault:** ADOPT as a caution to put directly in the MOC-authoring guidance: don't create an MOC just because a topic exists. This is a genuine risk for a *template* handed to strangers who might over-structure on day one out of anxiety. Tag: KEEP/ADOPT.

---

## Q2. How do MOCs emerge?

**Claim:** "You don't start with MOCs." Milo is explicit that folders forced top-down thinking (home note to category to note) as a structural default because the filesystem required it. Links free you from that: you can now work **bottom-up**, let ideas form and connect organically, or **middle-out**, spending most of your working time inside an emerging MOC as notes collide and get thrown in. The trigger to actually create an MOC is what Milo calls the **Mental Squeeze Point**: the moment your unsorted notes (he uses the image of 20 scattered index cards) start to produce *anxiety/overwhelm*, that's the signal, not a fixed note count. "You get to this mental squeeze point where you're about to become overwhelmed... and that's when you create a map of content."
**Source:** Nick Milo, "Idea Emergence Q&A Part 1: How to Create MOCs" transcript, https://www.youtube.com/watch?v=WUq8Pun28FI; corroborated in "MOCs Overview," https://notes.linkingyourthinking.com/Cards/MOCs+Overview
**Implication for vault:** This is the single most load-bearing finding for the template. ADOPT directly. **Concrete change:** the vault's guidance for "when do I make a MOC" should NOT be a note-count threshold like "after 5 notes on a topic, make an MOC" (too mechanical, contradicts the source). Instead, phrase the trigger experientially: *"When you notice yourself losing track of what you have on a subject, or re-deriving the same list of related notes from memory more than once, that's the signal. Not before."* This also gives the LLM curator (who will often be the one proposing MOC creation on this vault) a legible, non-arbitrary rule to apply.

**Claim:** Milo also validates the opposite path for people who already have pre-existing knowledge structure in their head ("we all weren't born yesterday"): it's fine to seed a few home-level MOCs at the very start (top-down) *if* you already know the shape of your thinking, but the warning attached is strong: **"be very afraid of over-structuring too soon... structure needs to be earned."** He recommends starting with at minimum one home note and one MOC, not more, and letting the rest emerge.
**Source:** Same transcript as above, ~19:17-20:22 timestamp, https://www.youtube.com/watch?v=WUq8Pun28FI
**Implication for vault:** ADAPT. The template ships to strangers with zero existing notes, so "you already have preconceived structure" mostly doesn't apply on day one, but it *will* apply once someone migrates in an existing note pile (a real onboarding scenario for this template). **Concrete change:** the onboarding/setup doc should distinguish "cold start" (don't pre-build MOCs, let them emerge) from "migrating existing notes" (a few seed MOCs are fine, but still prune aggressively once real linking starts).

**Claim:** Even Milo's own vault structure is not purely bottom-up in practice, he describes it as "heterarchical," an amoeba that "expands and changes shape," with top-down and bottom-up "informing each other over time" rather than one being the official method.
**Source:** Same transcript, "is this started with a bottom-up approach or top-down" answer, https://www.youtube.com/watch?v=WUq8Pun28FI
**Implication for vault:** REJECT-FOR-TEMPLATE any framing that pits bottom-up against top-down as a binary choice the user must commit to. ADOPT instead: present both as always-available, simultaneous options, a stranger shouldn't feel locked into "the bottom-up vault" or "the top-down vault."

---

## Q3. Decision rule: which interconnection mechanism, when

This is the crux deliverable. Four mechanisms exist in the current vault design: **(a)** inline body wikilinks, **(b)** the compass frontmatter fields (`up:`/`related:`/`down:`/`opposes:`), **(c)** `topics:` field, **(d)** MOCs. Below is a synthesis of what the canon implies about the boundaries between these, since none of the sources address exactly this four-way split (it's a vault-specific design on top of the canon), the table is inference from the definitions above, checked against Milo's tags-are-weak/links-are-strong distinction and the roads/signs/houses/maps analogy.

| Mechanism | What it answers | Cardinality | Direction | When to use | Canon analog |
|---|---|---|---|---|---|
| **Inline body wikilink** | "This specific sentence/claim depends on or references that note" | Many, unbounded | Point-in-text to note | Whenever you'd naturally cite or mention another idea while writing prose. The default, lowest-friction link. Should be the *majority* of links in the vault. | LYT's baseline hyper-textuality; "a link is just a relationship by another name" (Milo) |
| **Compass fields** (`up`/`related`/`down`/`opposes`) | "What is this note's structural position relative to other single ideas?" | Few (typically 1-5 per field) | Symmetric-ish, idea-to-idea | Only on `note`/`topic`-type atomic ideas, to declare the note's place in an argument or theme lineage: broader theme, similar ideas, consequences, tensions. Not for casual mentions. | Structure Zettel's "meaningful hierarchy," but per-note rather than a separate hub note, a lightweight, personal substitute for a full structure note on every atomic idea |
| **`topics:` field** | "What broad subject areas does this note belong to?" (replaces category tags) | Few (1-4 typically) | Note to Topic hub (one-directional, aggregating) | Every note should carry at least one `topics:` link so it's discoverable via its Topic hub. This is classification, not argument, closer to Milo's "tag is a weaker relationship" | dsebastien's "tags = road signs" / Milo's tag-vs-link distinction |
| **MOC** | "Here is a curated, opinionated arrangement of notes for a specific purpose, project, or question" | Editorial, MOC picks which notes, in what order/grouping | Many-to-many (one note can sit in several MOCs) | Only once a Mental Squeeze Point is hit, overwhelm from scattered notes on a live concern. Never pre-built speculatively. | Milo's Mental Squeeze Point trigger; "decentralized network" node |

**Crisp boundary rules, stated as guide content:**

1. **Inline links are for reading flow; compass fields are for structural position; `topics:` is for classification; MOCs are for curated navigation.** If unsure which applies, ask: am I *writing about* this note right now (inline), *declaring its argumentative position* (compass), *classifying its subject* (topics), or *building a reference tool for later* (MOC)?
2. **Compass and `topics:` are not redundant with inline links**, a note's `up:`/`related:` field can (and often should) duplicate a link that also appears in the body prose. The compass field is metadata for graph/query purposes; the inline link is for the reading experience. Both are cheap to maintain since they usually point to the same handful of notes.
3. **A MOC is not required for a topic to exist.** A `topic`-type note (with its own compass) can serve as the de facto hub for a subject indefinitely. Only promote to an actual `moc`-type note when the topic accumulates enough scattered material that a single hub page can't hold it all, or when a cross-cutting project needs its own curated view spanning multiple topics.
4. **`topics:` and MOC are not the same axis.** `topics:` is a note declaring its own subject (bottom-up, one-directional, cheap). A MOC is someone (or the LLM curator) actively deciding what belongs together for a purpose (top-down-ish, curated, has admin cost). A note can be correctly tagged `topics: [[Habits]]` and never appear in any MOC.

**Tag:** ADOPT this table as the canonical "which mechanism when" reference, this is new synthesis, not lifted from any one source, but it resolves the ambiguity Pontus flagged directly. **Concrete change:** publish this table verbatim (or a trimmed version) into whatever doc governs linking conventions, e.g. a `linking-conventions` guide or inside the `edit-note`/`new-note` SOP.

---

## Q4. Structure notes / "link then file" / homes for notes (LYT)

**Claim:** Milo's core anti-folder argument, stated directly in the Q&A: *"we now have the fluidity to think wherever we want to... because of links, now we can do bottom-up thinking... let ideas just form and then naturally, organically we make these connections."* And on folders specifically: *"the whole idea here is to use fewer folders now that we have the power of the link... it's about lopping off a zero, if you had 100 folders, take it down to 10."* He calls the wholesale abandonment of folders "the great folder rebellion," but pushes back on the extreme version: folders still have a place (e.g., a business-specific workspace unrelated to the idea network), just heavily rationed.
**Source:** Nick Milo, "Idea Emergence Q&A Part 1" transcript, https://www.youtube.com/watch?v=WUq8Pun28FI
**Implication for vault:** KEEP/ADOPT, this validates the vault's existing flat-layer structure (`Atlas/Notes/`, `Atlas/Topics/`, `Atlas/Research/` as flat pools rather than deep folder trees) directly against primary-source LYT philosophy. **Concrete change:** if any part of the vault's docs still frame folders as the primary organizing tool anywhere in the Atlas layers, correct the framing to "folders are for coarse infrastructure (Entities, MOCs, Notes-as-pools); links and MOCs are for actual organization."

**Claim:** Structure emerges from where you *spend your time*, not where files are stored: "the biggest revelation for my thinking has been spending most of my time in a map... I'll throw notes in there... and I'm in a colliding phase." Milo also describes a practical anchoring habit for every new MOC: **connect it upward to a home map** ("my best practice is that you relate it, you connect it to... somehow back to a home map") so that new structure is always discoverable via breadcrumb, even though it's not filed anywhere.
**Source:** Same transcript, https://www.youtube.com/watch?v=WUq8Pun28FI
**Implication for vault:** This is effectively what the `up:` compass field already does for atomic notes, generalized to MOCs. ADAPT: require (or strongly recommend) that every MOC declares an `up:`-equivalent link back to a broader MOC or the vault's top-level map/home, so MOCs themselves don't become orphaned islands. Worth checking whether the current `moc` type schema already has this field; if not, this is a concrete schema gap to flag.

**Claim:** I searched directly for the "link, don't file" phrasing commonly attributed to Milo/LYT community shorthand but could not locate a primary-source citation for that exact wording in this search pass, the closest verified primary-source equivalent is the "use fewer folders... now that we have the power of the link" quote above, which carries the same meaning.
**Source:** n/a (negative finding, flagged per instructions to cite what wasn't found)
**Implication for vault:** Use the verified quote above rather than the "link don't file" phrase if attributing it directly to Milo; the underlying principle is confirmed correct even if that exact wording wasn't located.

---

## Q5. The folgezettel-vs-links debate

**Claim (mechanistic/critical view):** zettelkasten.de's Sascha Fast argues Folgezettel (Luhmann's fixed alphanumeric sequential-ID technique for placing new notes near related ones) and Structure Zettel (a.k.a. structure notes, separate hub notes that list/organize other notes, addressed by time-based IDs and direct links) both achieve the same underlying principles, hierarchy and hyper-textuality, but Structure Zettel does it strictly better: Folgezettel creates **one single, ultimately meaningless hierarchy** baked into the note's permanent position, while Structure Zettel allows **infinite possible hierarchies**, since any note can be referenced from any number of structure notes without ever having to "live" in one place. The article also argues that deferring the *meaning* of a connection to be discovered later (which Folgezettel implicitly does, you place a note near another before fully understanding why) is a form of **Collector's Fallacy**: first collect, process later, a false sense of productivity.
**Source:** Sascha Fast, "Understanding Hierarchy by Translating Folgezettel and Structure Zettel," zettelkasten.de, https://zettelkasten.de/posts/understanding-hierarchy-translating-folgezettel/

**Claim (experiential/pro-folgezettel rebuttal):** Bob Doto responds that the mechanistic framing above ignores the *lived, embodied experience* of using Folgezettel: it forces the note-maker to slow down and make at least one real connection at the moment of import ("eufriction", good friction, distinct from pure inefficiency), gives a scannable "bird's-eye view" of top-level connections without opening any note, and surfaces orphaned clusters visually (a run of siblings with no children signals a gap). Doto explicitly rejects the "false dichotomy" framing, Folgezettel, timestamps, and structure notes are not substitutes for each other but siblings that can coexist, and dismisses the "Collector's Fallacy" charge as presumptuous: capturing a tentative first-level connection and revisiting it later is not hoarding, it's exactly how thinking-through-writing works.
**Source:** Bob Doto, "Folgezettel Is More Than Mechanism," https://writing.bobdoto.computer/folgezettel-is-more-than-mechanism/

**Resolution for a link-based Obsidian vault:** Both sides actually agree on the mechanics, which is the useful part for this vault: **Folgezettel's stated purpose, giving a note an address AND an automatic first connection, is fully replicated, without the downside of a single fixed hierarchy, by (1) a stable auto-updating filename/link as the ID (which Obsidian provides natively; renaming updates all backlinks instantly, a capability Milo himself notes makes the old Zettelkasten-ID practice largely obsolete for him) and (2) structure notes / MOCs providing the "meaningful hierarchy" layer, of which you can have as many as you want.** Obsidian has no native Folgezettel mechanism at all (no sequential ID assignment), so the entire debate resolves in favor of the "links + structure notes" side for any Obsidian-based vault by default, this isn't even a real choice the template needs to expose to a stranger.
**Tag:** REJECT-FOR-TEMPLATE (Folgezettel itself, not worth teaching or implementing; adds ceremony the platform doesn't need). ADOPT the underlying lesson (Doto's point about *friction being a feature, not a bug*) as design guidance elsewhere: **Concrete change:** the vault's `new-note`/ingest guidance should still ask the curator (human or LLM) to make **at least one real link at time of creation**, not defer connection to "later cleanup." This preserves Doto's eufriction benefit (forced initial connection) without adopting the ID mechanism that produces it in classic Zettelkasten. If the current ingest-protocol SOP already treats "resolve against existing Atlas notes" as mandatory at capture time, this finding validates that step directly rather than requiring a change.

---

## Q6. Obsidian-specific linking mechanics worth teaching

**Claim:** Wikilinks (`[[Note]]`) and Markdown links are equivalent and interoperable within Obsidian; renaming a file auto-updates every link to it vault-wide (configurable). Links can target headings (`[[Note#Heading]]`) or specific blocks via a block ID (`[[Note#^abc123]]`), and vault-wide heading/block search is available via `[[##heading]]` / `[[^^block]]` syntax. Custom display text is set with a pipe (`[[Note|Display text]]`).
**Source:** Obsidian Help, "Internal links," https://help.obsidian.md/links
**Implication for vault:** KEEP as baseline mechanics; not much design decision here, just documentation the template's help docs should cover for a stranger new to Obsidian.

**Claim:** Aliases (`aliases:` frontmatter property) let one note be linked to under multiple names (acronyms, nicknames, translations) without duplicating display-text overrides everywhere. Obsidian explicitly recommends aliases over per-link display-text overrides when the alternate name will be reused throughout the vault, and aliases integrate with **Backlinks**: an alias creates a detectable **unlinked mention** anywhere the alias-text appears in plain prose without a link, which the Backlinks pane can then convert into a real link with one click.
**Source:** Obsidian Help, "Aliases," https://help.obsidian.md/aliases
**Implication for vault:** ADOPT as specific guidance for the person/organization/framework note types in this vault, which commonly have known-by-multiple-names issues (e.g., a person referred to by nickname vs. full name, an organization by acronym vs. full name). **Concrete change:** the entity-note templates (person/organization/framework) should have an `aliases:` field prompt in their creation flow if not already present, specifically to make unlinked-mention detection work.

**Claim:** Unlinked mentions surface text matches (including alias matches) to a note that exist elsewhere in the vault but aren't yet formatted as `[[links]]`. This is Obsidian's built-in mechanism for catching "you clearly meant to link this but didn't," effectively a low-effort backfill tool for interconnection debt.
**Source:** Obsidian Help, "Aliases" (unlinked mentions section), https://help.obsidian.md/aliases; corroborated by community usage discussion, https://learningaloud.com/blog/2024/02/25/a-use-for-obsidian-unlinked-mentions/
**Implication for vault:** ADOPT as part of a periodic vault-lint or session-close routine: sweep unlinked mentions for recently-created/edited notes and convert genuine matches. This is likely already covered by the existing lint SOP infrastructure (there's a `lint-scanner` agent in this environment), worth cross-checking that unlinked-mentions is one of its checks, and adding it if not.

**Claim:** Embeds (`![[Note]]`) render a note's (or a specific heading's/block's) content inline and stay live-synced with the source, this is Obsidian's transclusion mechanism. Embeds work for headings and blocks, not just whole notes.
**Source:** Obsidian Help, "Embed files," https://help.obsidian.md/embeds
**Implication for vault:** ADAPT with caution. Embeds are powerful for MOCs/structure notes that want to preview content rather than just link to it (e.g., embedding a definition block inside a Topic hub), but transclusion can quietly create *implicit* dependencies that don't show up as a normal wikilink relationship in some graph/query tooling depending on how AI-Bases or the retrieval index parses embeds vs. links. **Concrete change:** flag to Pontus whether the Atlas-Retrieval-Index build script (`build-atlas-index.sh`) and AI-Bases treat `![[...]]` embeds the same as `[[...]]` links for indexing purposes, if not, embedding a note's content into a MOC might make it *invisible* to the retrieval index even though it's "linked," which would be a real gap worth flagging as a separate follow-up.

---

## Decision table (repeated for standalone reference, Q3 deliverable)

| Mechanism | Purpose | When to use | When NOT to use |
|---|---|---|---|
| Inline wikilink | Reading-flow reference | Any time you mention/cite another note's idea in prose | N/A, always fine, this is the default |
| Compass (`up`/`related`/`down`/`opposes`) | Declare structural/argumentative position | On atomic `note`/`topic` pages, to place the idea in a lineage of broader/similar/derived/opposing ideas | Casual mentions; entity notes without a real "argument position" |
| `topics:` | Subject classification (replaces tags) | Every note, at least one value, to make it discoverable from its Topic hub | Don't use for argument structure, that's what compass is for |
| MOC | Curated navigation/reference tool | Only at a genuine Mental Squeeze Point, overwhelm from scattered notes on a live concern or project | Never pre-built speculatively for a topic that merely exists; a `topic` hub page can serve that role indefinitely without becoming an `moc` |

---

## Top 5 actionable insights for INTERCONNECTED

1. **The MOC creation trigger should be experiential, not numeric.** Replace any "N notes = make an MOC" rule with Milo's Mental Squeeze Point framing: build an MOC only when scattered notes on a live concern start producing overwhelm, never speculatively. This is the single highest-leverage change for keeping the template minimal for strangers.
2. **The four-mechanism boundary (inline / compass / `topics:` / MOC) is sound but was previously undocumented as a single decision rule.** Publish the Q3 table into the vault's linking-conventions guide or the `new-note`/`edit-note` SOP so both humans and the LLM curator apply it consistently.
3. **MOCs must be heterarchical, not filed.** Explicitly correct any lingering "one home per note" assumption, the same note legitimately belongs in multiple MOCs, and that's a feature per both Milo and the "roads/signs/houses/maps" analogy, not clutter.
4. **The folgezettel debate resolves cleanly in Obsidian's favor and requires no template change**, except for one transferable lesson: require at least one real link at note-creation time (already likely covered by ingest-protocol's "resolve against existing Atlas notes" step) to preserve the "eufriction" benefit without needing fixed IDs.
5. **Two concrete schema/tooling gaps surfaced and should be flagged to Pontus as follow-ups, not fixed silently here:** (a) MOC-type notes may lack a required "link back to a broader MOC/home" field, mirroring what `up:` does for atomic notes; (b) unclear whether the Atlas-Retrieval-Index / AI-Bases correctly index `![[embeds]]` as relationships, which matters if MOCs start using transclusion.

---

## Sources consulted (full list)

- Nick Milo, "MOCs Overview," LYT Kit, https://notes.linkingyourthinking.com/Cards/MOCs+Overview
- Nick Milo, "Idea Emergence Q&A Part 1: How to Create MOCs, How to use Tags & Folders" (YouTube transcript), https://www.youtube.com/watch?v=WUq8Pun28FI
- Obsidian Forum, "A Case for MOCs," https://forum.obsidian.md/t/a-case-for-mocs/2418
- Sebastien Dubois, "Maps of Content," https://www.dsebastien.net/2022-05-15-maps-of-content/
- Sascha Fast, "Understanding Hierarchy by Translating Folgezettel and Structure Zettel," zettelkasten.de, https://zettelkasten.de/posts/understanding-hierarchy-translating-folgezettel/
- Bob Doto, "Folgezettel Is More Than Mechanism," https://writing.bobdoto.computer/folgezettel-is-more-than-mechanism/
- Obsidian Help, "Internal links," https://help.obsidian.md/links
- Obsidian Help, "Aliases," https://help.obsidian.md/aliases
- Obsidian Help, "Embed files," https://help.obsidian.md/embeds
- (Consulted, lower-signal/not directly cited): Beth (Medium), "Maps of Content in Capacities", visual-MOC variant in a different app, confirms the concept travels beyond Obsidian; Reddit r/ObsidianMD "How is a MOC different from an index" thread, surfaced but not deeply excerpted, consistent with dsebastien framing above.
