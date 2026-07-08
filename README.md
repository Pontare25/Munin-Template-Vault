# Munin-Template-Vault

A ready-to-use [Obsidian](https://obsidian.md) vault that works as an **AI-maintained personal wiki**. You capture thoughts and sources; an AI assistant (Claude Code, Codex, or any tool that can read files) files, links, and maintains the knowledge base with you.

Named after Munin, one of Odin's two ravens: the one that remembers.

## What you get

- A folder structure that separates **capture** (Raw), **knowledge** (Atlas), and **configuration** (AI-OS), with Calendar and Efforts alongside.
- A note schema built on wikilinks, a small set of frontmatter fields, and an extended idea compass (`up`, `related`, `down`, `challenges`).
- Standard Operating Procedures (SOPs) the AI follows for ingesting sources, creating notes, answering questions from the wiki, reviewing your daily note, and linting the wiki.
- Minimal Templater templates, three Bases dashboards, and a small worked example you can explore and then delete.
- An AI-led onboarding: paste one prompt and the AI interviews you, fills in your profile, and runs a guided first ingest.

## Quickstart

1. Click **Use this template** on GitHub (or download this repo as a ZIP).
2. Open the folder as a vault in Obsidian.
3. Install and enable the **Templater** community plugin (the only plugin required).
4. Open [START-HERE](START-HERE.md) and follow it.

No git knowledge required to use the vault. When you are ready to back it up, [AI-OS/Guides/github-and-backup](AI-OS/Guides/github-and-backup.md) explains git for people who write notes, not code.

## The three layers

| Layer | Folder | Role |
|---|---|---|
| Capture | `Raw/` | Inbox for sources and fleeting ideas, in transit, not an archive |
| Knowledge | `Atlas/` | Permanent notes, topics, maps, entities. AI-maintained, compounding |
| Schema | `AI-OS/` | How the vault works: your profile, the rules, the SOPs |

`Calendar/` (daily notes, the main capture surface) and `Efforts/` (projects and areas) orbit these three.

## Federation (optional): a shared company knowledge base

Many personal vaults built from this template can share one company knowledge base, without anyone hand-running git. A vault can pull shared knowledge into a read-only `Company/` mirror and contribute selected notes back as GitHub pull requests. Privacy is default-deny: a note is shared only when you explicitly mark it `share: company` and it passes a risk check, and the agent confirms before anything is pushed.

Start at the [federation overview](AI-OS/Guides/federation-overview.md); it routes each reader to their guide. By role: admins setting up the shared brain read [federation-admin-setup](AI-OS/Guides/federation-admin-setup.md) and [federation-rollout](AI-OS/Guides/federation-rollout.md); employees read the plain-language [federation guide](AI-OS/Guides/federation-for-non-git-users.md). The agent-facing procedures are the `federation-*` SOPs in `AI-OS/SOPs/`. Commands: `npm run fed:pull`, `fed:suggest`, `fed:contribute`, `fed:govern`.

## Credits and inspirations

- **Andrej Karpathy's LLM Wiki** idea: a personal wiki curated by a language model. https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- **Nick Milo's** AI-OS, File-over-AI, and ACE folder philosophy (Atlas, Calendar, Efforts). https://www.youtube.com/watch?v=jbHB-rzKBAs&t=2s
- **Google's Open Knowledge Format (OKF)**: the `Atlas/` knowledge layer targets [OKF v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) conformance (reserved `index.md`/`log.md`, a single required `type` attribute, OKF frontmatter) and exports a conformant bundle on demand. See [AI-OS/Schemas/okf-conformance](AI-OS/Schemas/okf-conformance.md). Background: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing
- **Construct by Dee's** Daily note first principle and logging system. https://www.youtube.com/watch?v=Mt8mNIcoxYM
- **Zettelkasten** atomic notes and the **idea compass** (extended here with `challenges`). https://medium.com/a-voice-in-the-conversation/the-idea-compass-expanding-ideas-5259b43ac874

This template borrows ideas from all of the above; mistakes in the synthesis are its own.

## License and contributing

[MIT licensed](LICENSE): use it, fork it, build on it. See [CONTRIBUTING](CONTRIBUTING.md) if you want to improve the template itself.
