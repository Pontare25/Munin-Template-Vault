# Munin-Template-Vault

> **⚠️ Work in progress.** This template is under active development — folder structure, templates, and conventions are still changing and may break between updates. Explore the ideas and kick the tires; don't yet rely on it as a stable base for irreplaceable notes.

A ready-to-use [Obsidian](https://obsidian.md) vault that works as an **AI-maintained personal wiki**. You capture thoughts and sources; an AI assistant (Claude Code, Codex, or any tool that can read files) files, links, and maintains the knowledge base with you.

Named after Munin, one of Odin's two ravens: the one that remembers.

## What you get

- A folder structure that separates **capture** (Fleeting + Raw), **knowledge** (Atlas), and **configuration** (AI-OS), with Calendar and Efforts alongside.
- A note schema built on wikilinks, a small set of frontmatter fields, and an extended idea compass (`up`, `related`, `down`, `opposes`).
- Standard Operating Procedures (SOPs) the AI follows for ingesting sources, creating notes, answering questions from the wiki, reviewing your daily note, and linting the wiki.
- Minimal Templater templates, three Bases dashboards, and a small worked example you can explore and then delete.
- An AI-led onboarding: paste one prompt and the AI interviews you, fills in your profile, and runs a guided first ingest.

## Quickstart

1. Click **Use this template** on GitHub (or download this repo as a ZIP).
2. Open the folder as a vault in Obsidian.
3. When Obsidian asks, trust the vault and enable community plugins. It bundles three, already installed: **Templater** (required; runs the note templates), **Omnisearch** (fast full-text search), and **Text Extractor** (OCR and text extraction from PDFs and images).
4. Open [START-HERE](START-HERE.md) and follow it.

No git knowledge required to use the vault. When you are ready to back it up, [github-and-backup](Start%20Here/github-and-backup.md) explains git for people who write notes, not code.

## The three layers

| Layer | Folder | Role |
|---|---|---|
| Capture | `Fleeting/` + `Raw/` | `Fleeting/` = your own quick notes and ideas; `Raw/` = source material awaiting processing. In transit, not an archive |
| Knowledge | `Atlas/` | Permanent notes, topics, maps, entities. AI-maintained, compounding |
| Schema | `AI-OS/` | How the vault works: your profile, the rules, the SOPs |

`Calendar/` (daily notes, the main capture surface) and `Efforts/` (projects and areas) orbit these three.

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
