# Guide: Skills Setup

Deep dive behind [[Skills/README|the Skills folder README]]. Read that first; this guide covers the details.

## The mental model

An AI tool has two kinds of knowledge: what the model was trained on, and what you feed it at runtime. Skills are the second kind, packaged: a folder with a `SKILL.md` file containing instructions, optionally with supporting files (scripts, examples, reference data). When a task matches a skill's description, the AI loads the file and follows it.

The payoff is consistency. Without a skill, "summarize this video" produces a different format every time. With a skill, it produces your format, every time, in every session.

## Why keep skills in the vault

- **Portability:** the vault moves between machines (git, sync); skills move with it.
- **Tool independence:** Claude Code today, something else next year; skills are plain markdown either way.
- **Versioning:** skill improvements are tracked like any other note once the vault is under git ([[github-and-backup]]).
- **Co-evolution:** the AI can propose skill edits as it learns your preferences, and you review them like any note edit.

## Linking the folder (Claude Code)

Claude Code looks for skills in `~/.claude/skills`. Create a link from there into the vault so both paths are the same folder:

**Windows** uses a junction (works without administrator rights on recent Windows):

```
mklink /J "%USERPROFILE%\.claude\skills" "C:\path\to\vault\AI-OS\Skills"
```

Run in Command Prompt (not PowerShell; in PowerShell use `New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills" -Target "C:\path\to\vault\AI-OS\Skills"`).

**macOS / Linux** uses a symlink:

```
ln -s "/path/to/vault/AI-OS/Skills" ~/.claude/skills
```

Verify: create a test folder `AI-OS/Skills/hello/` with a `SKILL.md`, then check it appears under `~/.claude/skills/hello/`. Delete the test afterwards.

If the link cannot be created (permissions, corporate machines), the fallback works everywhere: reference skills by path in your prompt ("read `AI-OS/Skills/<name>/SKILL.md` and follow it").

## Anatomy of a skill

```
AI-OS/Skills/
  video-summarizer/
    SKILL.md        # the instructions
    example.md      # optional: a worked example of the output
```

A good `SKILL.md` has: a frontmatter block with `name:` and a `description:` that says when to use it, then instructions written like you would brief a capable new colleague: concrete steps, the output format, edge cases, what not to do.

## Growing a skill library

1. Notice a repeated request where you keep correcting the same things.
2. Ask the AI: "turn what we just did into a skill, including the corrections."
3. Review the generated `SKILL.md`, prune it (shorter skills get followed more reliably), save it here.
4. Next session, the request should just work. When it does not, edit the skill, not the chat.

Start with zero skills. Add the first one when you catch yourself typing the same instructions for the third time.
