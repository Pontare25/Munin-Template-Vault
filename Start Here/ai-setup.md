# Guide: AI Setup

How to connect an AI tool to this vault, what it reads, how it works with you, how to keep private things private, and how to install skills.

<!-- Phase 2 in progress: items A and B update "How the AI finds its instructions" and "Memory and state" when AGENTS.md and memory.md land. Roles are Phase 6: do not describe them here yet. -->

## Pick a tool

Any AI tool that can read and write files in a folder works. Two common choices:

- **Claude Code** (Anthropic): reads `CLAUDE.md` at the vault root when it starts.
- **Codex** (OpenAI): reads `AGENTS.md` at the vault root when it starts.

Open the tool with the vault folder as its working folder. Both files point the AI at the same rules, so you can switch tools and nothing is lost.

## How the AI finds its instructions

At the start of a session the AI reads `AI-OS/Me.md`: who you are and how you want it to work. `CLAUDE.md` imports it directly; `AGENTS.md` tells the AI to read it first.

Before acting on a request, the AI routes it. It checks the trigger index in `AI-OS/routing.md`, which maps the kind of thing you asked for to the SOP (standard procedure in `AI-OS/SOPs/`) that handles it, reads that SOP, and tells you which one it picked. If nothing matches, it says so instead of winging it and offers to write a new SOP, so each recurring request you make becomes a procedure that just works next time. Routing rules and SOPs are plain notes: read and edit them like anything else.

## The loop

Four operations, repeated:

1. **Capture** (you): dump thoughts, links and tasks into today's daily note, `Fleeting/` or `Raw/Inbox/`. Filing is the AI's job.
2. **Ingest** (AI): "process this article" turns a capture into atomic notes, entity pages and topic links in `Atlas/`, following the [[ingest]] SOP.
3. **Query** (you ask, AI answers): "what do I know about X?" The AI follows the [[query]] SOP. When an answer is worth keeping, say "file that" and it becomes an Atlas note: chat history evaporates, the vault compounds.
4. **Review and lint** (both): [[daily-review]] sweeps captures; [[lint]] checks the link graph now and then.

Other useful requests: "what connects X and Y?", "what in the vault contradicts this note?", "summarize what changed this month" (reads [[log]]), "propose compass entries for topic X" (fills `up`, `related`, `down` and `opposes`).

## Memory and state

- `AI-OS/state.md` starts with the template version your vault runs; the [[upgrade-vault]] SOP reads it.
- [[log]] (`AI-OS/log.md`) is the append-only record of AI work. Skim it now and then.

## Trust and provenance

- Everything the AI writes is marked `%% #AI-Assisted %%` (hidden in reading mode, findable in search), so you know which notes to double-check.
- The SOPs make the AI ask before editing anything you wrote and report what it created.
- AI-written notes are drafts of your knowledge, not truth. Correct them freely; the vault keeps the corrected version.

## Privacy and sync

- **What leaves your machine.** Everything an AI tool reads may be sent to the provider's servers. Keep out of the vault anything you would not paste into a chat window: credentials, other people's confidential information, anything regulated. Check your provider's data retention and training settings; they differ.
- **Personal files.** `AI-OS/Me.md`, `AI-OS/state.md` and `AI-OS/log.md` describe you and your work, and the AI writes to them. They carry a "Private file" header as a reminder.
- **Sync and git.** If you back up with git, use a **private** repository ([[github-and-backup]]). Never put the vault in a shared or public folder. A note that must stay local belongs in a folder your AI tool cannot see, or in another vault.

## Skills

A skill is a reusable instruction file (usually `skill-name/SKILL.md`, plain markdown) that teaches an AI a specific capability, such as summarizing a video in your format. Keeping skills in `AI-OS/Skills/` makes them portable, versioned with the vault, and independent of any one AI tool. The vault works fully without them; add one when you catch yourself typing the same instructions a third time. Record each installed skill in the table in [[Skills/README|the Skills README]].

### Install (Claude Code)

Claude Code looks for skills in `~/.claude/skills`. Link that location into the vault so there is one copy, in the vault. If `~/.claude/skills` already has content, move it into `AI-OS/Skills/` first.

**Windows** (Command Prompt; a junction needs no administrator rights on recent Windows):

```bat
mkdir "%USERPROFILE%\.claude" 2>nul
mklink /J "%USERPROFILE%\.claude\skills" "C:\path\to\your\vault\AI-OS\Skills"
```

In PowerShell instead: `New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills" -Target "C:\path\to\your\vault\AI-OS\Skills"`.

**macOS and Linux:**

```sh
mkdir -p ~/.claude
ln -s "/path/to/your/vault/AI-OS/Skills" ~/.claude/skills
```

Check it: create `AI-OS/Skills/hello/SKILL.md`, confirm it appears under `~/.claude/skills/hello/`, then delete it.

**Other tools, or when the link cannot be made:** tell the AI "read `AI-OS/Skills/<name>/SKILL.md` and follow it."

### What to install first

- [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills): Obsidian-flavored markdown, Bases, defuddle, JSON Canvas and the Obsidian CLI. The closest thing to required: they teach an AI to write notes this vault's tooling understands.
- [anthropics/skills](https://github.com/anthropics/skills): Anthropic's skills, including skill-creator for writing new ones.

Later, if you need them: a web-content extractor so ingest fetches articles cleanly, and a transcript summarizer for talks and lectures.

### Growing your own

1. Notice a request where you keep correcting the same things.
2. Ask the AI: "turn what we just did into a skill, including the corrections."
3. Review the `SKILL.md`: a `name:` and a `description:` that says when to use it, then concrete steps, the output format and what not to do. Shorter skills get followed more reliably.
4. When it misfires, edit the skill, not the chat.
