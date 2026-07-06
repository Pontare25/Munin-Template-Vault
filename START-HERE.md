# Start Here

Welcome. This vault is a personal wiki that an AI assistant maintains with you. Setup takes about ten minutes and the AI does most of it.

## 1. Set up Obsidian

1. Install [Obsidian](https://obsidian.md) if you have not already.
2. Open this folder as a vault (**Open folder as vault**).
3. When asked, trust the vault and enable plugins.
4. Install the **Templater** community plugin: Settings, Community plugins, Browse, search "Templater", install, enable. It is the only plugin this vault requires.

## 2. Open your AI tool in this folder

Any AI assistant that can read and write files works: Claude Code, Codex, or similar. Open it with this vault folder as its working directory. The entry files `CLAUDE.md` and `AGENTS.md` point the AI to its operating manual automatically.

## 3. Paste the onboarding prompt

Copy the prompt below into a fresh AI session. The AI will interview you, fill in your profile (`AI-OS/Me.md`), check your settings, and walk you through your first ingest.

```text
You are setting up my new AI-maintained Obsidian vault (built from the
Munin-Template-Vault). Work through the phases below in order, one at a
time, and wait for my answers before moving on. Keep it conversational.

1. ORIENT. Read AI-OS/Me.md, AI-OS/Vault-Map.md, and
   AI-OS/Schemas/note-schema.md, and skim every SOP in AI-OS/SOPs/.
   Then tell me, in two or three sentences, what this vault is and what
   your job in it will be, so I know you understood.

2. INTERVIEW. Ask me what you need to fill every bracketed placeholder
   in AI-OS/Me.md: who I am, what to call me, where I am, what language
   my notes should be in, my roles, what I want this vault to do for me,
   and how I like an assistant to behave. Ask at most three questions at
   a time. Follow up where my answers are vague.

3. FILL ME.MD. Update AI-OS/Me.md: replace every placeholder with what
   you learned, keep it as short as the skeleton, delete the interviewer
   comments, and leave the "Rules for the AI" section untouched. Show me
   the result and revise until I approve it.

4. CHECK SETTINGS. Verify .obsidian/daily-notes.json points at
   "Calendar/Daily Notes" with the "System/Templates/daily" template,
   and ask me to confirm the Templater plugin is installed and enabled.
   If anything is off, tell me exactly what to click.

5. EXAMPLE CONTENT. This vault ships a small worked example (notes
   tagged #example) that demonstrates the schema. Ask whether I want to
   keep it for reference or delete it now. If I say delete: remove the
   seven #example files, the example lines in the folder README indexes,
   the "Example" section links to them in the folder READMEs, and the
   example entry in AI-OS/log.md. Leave no broken links behind.

6. TUTORIAL INGEST. Ask me for one thing to feed the wiki: a link, a
   pasted article, or an idea of mine. Then follow AI-OS/SOPs/ingest.md
   end to end, explaining each step in one line as you do it, so I see
   the loop working: atomic notes, topic stub, compass, index lines.

7. CLOSE. Append a setup entry to AI-OS/log.md (format is documented in
   that file). Then remind me of the one habit that matters (dump
   everything into today's daily note) and point me to
   AI-OS/Guides/working-with-ai.md for daily use and
   AI-OS/Guides/github-and-backup.md for backing this up.
```

## 4. Manual setup (if you prefer doing it yourself)

1. Open `AI-OS/Me.md` and fill in every placeholder section by hand.
2. Read `AI-OS/Vault-Map.md` to learn where things go.
3. Read `AI-OS/Schemas/note-schema.md` to learn the note format.
4. Explore the example notes (search for the `#example` tag), then delete them when you no longer need them.
5. Open today's daily note and write something in it. That is the core habit.

## 5. Skills (optional, recommended once the basics run)

Skills are reusable instruction files that teach your AI tool specific capabilities. They can live in this vault (`AI-OS/Skills/`, recommended: versioned and portable) or in your AI tool's own default location if you prefer to keep the vault free of them. [AI-OS/Skills/README](AI-OS/Skills/README.md) explains the choice and the setup.

Recommended first install: [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills), official Obsidian skills that teach an AI correct Obsidian markdown, Bases, Templater, and the Obsidian CLI. The full list lives in [AI-OS/Skills/README](AI-OS/Skills/README.md).

## The one habit that matters

Open today's daily note and dump everything there: thoughts, links, tasks, half-ideas. The daily-review SOP sweeps it into the right places. You never need to decide where something goes at capture time.
