# Federation: Sharing Knowledge With Your Company (No Git Needed)

Your vault can connect to a shared company knowledge base: pull in what colleagues have learned, and offer your own notes back. You never need to understand or type git. You talk to your AI agent in plain language, and it runs everything for you, always asking before anything leaves your machine.

This guide explains what is happening so you can trust it. Two ideas, one minute each.

## The two ideas

**A fork is your own copy.** You cannot change the company's shared vault directly, and that is on purpose: nobody should be able to overwrite everyone else's knowledge by accident. So you get your own copy, called a *fork*. You make changes in your copy and then *ask* for them to be pulled in.

**A pull request is that ask.** When you want to share a note, the agent opens a *pull request*: a polite, reviewable proposal that says "here is a note I would like to add." A person on the company side reads it and decides to accept or not. Nothing is added to the company vault until they say yes.

That is the whole model. You keep your own copy, you propose, a human accepts.

## One-time setup

The first time only, someone helps you connect. There is exactly one step a computer cannot do for you: signing in to GitHub. The agent will ask you to run one sign-in command that opens your web browser; you click approve, and you are done forever on that machine. The agent handles the rest.

Just say: **"Set up federation."**

## Getting the latest company knowledge

Whenever you want the newest shared knowledge, say: **"Get the latest company knowledge."**

The agent refreshes a folder called `Company/` in your vault. Think of it as a read-only noticeboard: you can read everything, but you do not edit it. If you want to build on a company note, copy it into your own `Atlas/` folder and it becomes yours to change.

This can never cause a mess or a conflict, because the agent replaces the noticeboard wholesale each time. It never touches your personal notes.

## Sharing one of your notes

By default, **nothing you write is ever shared.** A note leaves your vault only if you explicitly mark it, and even then the agent double-checks it for private details first.

To share, say: **"What could I contribute to the company?"** The agent suggests notes worth sharing (and quietly holds back anything that looks private, like a note with an email address in it). You pick the ones you actually want. Then the agent:

1. Shows you a clean, preview version of each note, with private asides and personal formatting removed.
2. Shows you exactly what it is about to do, and waits for your yes.
3. Only after your yes, sends your copy up and opens the pull request.
4. Gives you a link so you can watch it get reviewed.

You are asked to confirm twice: once before anything is sent, once before the proposal is opened. If you ever say no, nothing happens.

## What is protected, always

- **Your private notes stay private.** Daily notes, project notes, captured web clippings, and your personal settings are never even candidates for sharing.
- **A note is shared only if you mark it AND it is the right kind of note.** A project or a diary entry cannot be shared even if marked by mistake.
- **A last-line safety check** scans for things like email addresses before anything leaves. If it finds one, it stops and tells you.
- **You never need write access to the company vault.** You propose; a person accepts.

## The phrases to remember

| You want to | Say |
|---|---|
| Connect the first time | "Set up federation." |
| Get the newest shared knowledge | "Get the latest company knowledge." |
| See what you could share | "What could I contribute to the company?" |
| Share specific notes | "Contribute these notes to the company." |
| Propose a change to the shared rules | "Request a change to the company standard." |

If anything is ever unclear, ask the agent "what will this do?" before you confirm. It will explain in plain language and nothing happens until you agree.
