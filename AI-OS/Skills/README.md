# Skills

This folder ships empty on purpose. Skills are optional; the vault works fully without them.

## What a skill is

A skill is a reusable instruction file (plain markdown, usually `skill-name/SKILL.md`) that teaches an AI tool a specific capability: how to summarize YouTube videos, how to produce a weekly report in your format, how to run a particular analysis. Because skills are plain files, they follow the File-over-AI principle: your instructions belong to you, in your vault, not locked inside any one AI tool's settings.

## The decision: where do skills live?

Two options:

1. **Vault as the skill repo (recommended).** Keep skills here in `AI-OS/Skills/`, one folder per skill, and point your AI tool at this folder. Skills stay versioned with the vault, portable across machines and AI tools.
2. **Tool defaults.** Let each AI tool manage its own skills in its own location. Simpler if you use exactly one tool and never switch, but your instructions fragment across tool configs.

## Setup for option 1 (Claude Code)

Claude Code discovers skills in `~/.claude/skills`. Instead of copying files there, link that location INTO this folder, so there is only one copy and it lives in the vault.

**Windows** (Command Prompt as administrator, or a normal prompt on recent Windows):

```bat
mkdir "%USERPROFILE%\.claude" 2>nul
mklink /J "%USERPROFILE%\.claude\skills" "C:\path\to\your\vault\AI-OS\Skills"
```

**macOS / Linux:**

```sh
mkdir -p ~/.claude
ln -s "/path/to/your/vault/AI-OS/Skills" ~/.claude/skills
```

If `~/.claude/skills` already exists with content, move that content into this folder first, then create the link.

**Other AI tools:** most tools that support instruction files can be pointed at a folder, or the relevant skill can be referenced by path in the prompt. The generic fallback that always works: tell the AI "read `AI-OS/Skills/<skill-name>/SKILL.md` and follow it."

## Recommended skills

Add skills only when you feel the need; each one costs context.

**Start here:**

- [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills): official Obsidian skills covering Obsidian-flavored markdown, Bases, Templater, and the Obsidian CLI. The closest thing to required: they teach an AI to write notes this vault's tooling understands.

**Worth considering once the basics run smoothly:**

- A web-content extraction skill (for example [Defuddle](https://github.com/kepano/defuddle)), so ingest can fetch articles cleanly.
- A video/transcript summarizer for ingesting talks and lectures.
- A skill-writing skill (community versions exist, for example [Anthropic's skill-creator](https://github.com/anthropics/skills)) so new skills follow good structure.

Community catalogs to browse: search GitHub for "claude skills" or "agent skills".

Deep dive with worked examples: [[skills-setup]].
