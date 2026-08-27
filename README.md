# Munin-Template-Vault

> **⚠️ Work in progress.** This template is under active development — folder structure, templates, and conventions are still changing and may break between updates. Explore the ideas and kick the tires; don't yet rely on it as a stable base for irreplaceable notes.

A ready-to-use [Obsidian](https://obsidian.md) vault that works as a **personal wiki, project management tool, and a CRM all in one.** The system is designed to work completely without AI but works even better with it. You capture thoughts and sources; an AI assistant (Claude Code, Codex, or any tool that can read files) files, links, and maintains the knowledge base with you and continuously learn and improve.

The system is named after one of Odin's two ravens Hugin and Munin, I forget which one but its the one that remembers 😉.

## What you get

- A folder structure that separates the **capture flow** (Fleeting + Raw), **knowledge management** (Atlas), and **configuration standards** (AI-OS), with **Calendar** for journaling and logs, and **Efforts** for project and task management.
- A note schema built on wikilinks, a small set of frontmatter fields, and an extended idea compass (`up`, `related`, `down`, `opposes`). This allows you to build clear hierarchies of information without getting bogged down and frustrated with organization instead of actually writing. 
- **Standard Operating Procedures** (SOPs) allow your AI of choice to follow instructions on how to work in your personal vault without it bloating your skillsets. It also allows you to stack skills in recurring procedures. For example, the AI follows an SOP for ingesting sources, creating notes, answering questions from the wiki, reviewing your daily note, and regularly linting the wiki.
- Minimal Templater templates, dashboards, and small worked examples you can explore and then delete. (These are tagged with `#example`)
- An AI-led onboarding: paste one prompt and the AI interviews you, fills in your profile, and runs a guided first ingest.

## Quickstart

1. Click **Use this template** on GitHub (or download this repo as a ZIP).
2. Open the folder as a vault in Obsidian.
3. When Obsidian asks, trust the vault and enable community plugins. It bundles three, already installed: **Templater** (required; runs the note templates better than the default core template plugin), **Omnisearch** (fast full-text search), and **Text Extractor** (OCR and text extraction from PDFs and images). Omnisearch is integrated with text extractor giving you one interface to search notes and other files. 
4. Open [START-HERE](START-HERE.md) and follow it.

No git knowledge is required to use the vault. When you are ready to back it up, [github-and-backup](Start%20Here/github-and-backup.md) explains git for people who write notes, not code.

## The three main layers

| Layer | Folder | Role |
|---|---|---|
| Capture | `Fleeting/` + `Raw/` | `Fleeting/` = your own quick notes and ideas; `Raw/` = source material awaiting processing. In transit, not an archive |
| Knowledge | `Atlas/` | Permanent notes, topics, maps, entities. AI-maintained, compounding |
| Schema | `AI-OS/` | How the vault works: your profile, the rules, the SOPs |

`Calendar/` (daily notes, the main capture surface) and `Efforts/` (projects and areas) orbit these three.

## Start Here

Next I would recommend you read the guides in `Start Here/` and if you want to learn how to use Obsidian I have put together a collection of guides here: `Start Here/Recommended Obsidian Tutorials` ([[Recommended Obsidian Tutorials]]). I have also asked AI to create an [[obsidian-basics]] note. 

I would actually recommend you **not** start with this vault if you are completely new to Obsidian. Instead I would recommend you just create a new empty vault and just start writing and linking. Then once you start to feel comfortable, come back go through the examples and use the basis this vault has created and make it your own. 

## Open Knowledge Format (optional)

Your `Atlas/` knowledge layer is built to conform to the [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md): plain markdown any tool or AI can read, with a single required `type` field and reserved `index.md` / `log.md` files. Conformance is **native — no tooling required**. See [System/OKF](System/OKF/README.md) for the details and how to regenerate a portable bundle if you ever need one.

## Credits and inspirations

- **Andrej Karpathy's LLM Wiki** idea: a personal wiki curated by a language model. https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- **Nick Milo's** AI-OS, File-over-AI, and ACE folder philosophy (Atlas, Calendar, Efforts). https://www.youtube.com/watch?v=jbHB-rzKBAs&t=2s
- **Google's Open Knowledge Format (OKF)**: the `Atlas/` knowledge layer targets [OKF v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) conformance (reserved `index.md`/`log.md`, a single required `type` attribute, OKF frontmatter), natively on disk. See [System/OKF](System/OKF/README.md). Background: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing
- **Construct by Dee's** Daily note first principle and logging system. https://www.youtube.com/watch?v=Mt8mNIcoxYM
- **Zettelkasten** atomic notes and the **idea compass** (extended here with `opposes`). https://medium.com/a-voice-in-the-conversation/the-idea-compass-expanding-ideas-5259b43ac874

This template borrows ideas from all of the above; mistakes in the synthesis are its own.

## License and contributing

[MIT licensed](LICENSE): use it, fork it, build on it. See [CONTRIBUTING](CONTRIBUTING.md) if you want to improve the template itself.
