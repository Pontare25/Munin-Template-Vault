# Guide: Rolling Federation Out to Employees

Audience: the admin who has already stood up the company brain (see [[federation-admin-setup]]) and now wants employees using it. This is a short, distributable playbook: what to send people, what settings to hand them, and how to talk a non-technical colleague through it.

The guiding principle is **consumption first, contribution later**. Get everyone reading shared company knowledge before you ask anyone to contribute a note back. Pulling is read-only and cannot break anything, so it is the safe, confidence-building first step. Contribution involves markers, sanitization, and pull requests, so it comes once people are comfortable.

## The recommended sequence

1. **Week one, everyone: consume.** Each employee sets up their vault from the template, connects to the company brain, and pulls. They now have a read-only `Company/` mirror they can refresh anytime. Nothing they do can affect anyone else.
2. **Later, when someone has something worth sharing: contribute.** Only then do they mark a note and open their first contribution pull request. Most people will consume for a while before they ever contribute, and that is exactly right.

You do not need to teach contribution on day one. Point people at the consume steps, let them get value from reading, and introduce contribution when they ask "how do I add something?"

## The two values you hand out

Every employee needs the same one value written into their vault's `AI-OS/federation.json`:

- `companyRepo`: the full name of the company brain, in `owner/name` form. If you created `org/company-brain`, that string is what you hand out.

Their agent fills in the other two identity fields (`identity.name`, `identity.handle`) during setup from the employee's own GitHub account, and it writes `fork` automatically when it forks the repo. So the only thing you distribute is the one `companyRepo` value; everything else is per-person and the agent handles it.

Concretely, tell each employee their `AI-OS/federation.json` should carry:

```json
{
  "companyRepo": "org/company-brain"
}
```

replacing `org/company-brain` with your real repository name. They (or their agent) leave the rest of the file at its template defaults.

## Copy-paste message for employees

Send this to each person. Replace `org/company-brain` with your repository name before sending.

```text
Subject: Connecting your vault to the company knowledge base

We now have a shared company knowledge base: a place where team knowledge
lives so you can pull it into your own vault and, when you have something
worth sharing, propose it back. You never have to touch git or the command
line; you talk to your AI assistant in plain language and it does the work,
always asking before anything leaves your machine.

Two things to know:

1. The company knowledge base is: org/company-brain
2. Start by just READING shared knowledge. Sharing your own notes comes
   later, only when you want to, and only for notes you explicitly mark.

To get started, open your vault and tell your AI assistant:

  "Set up federation. The company repo is org/company-brain."

It will walk you through a one-time sign-in (the only step a computer cannot
do for you) and then pull the latest shared knowledge into a read-only
Company/ folder in your vault. From then on, whenever you want the newest
shared knowledge, just say: "Get the latest company knowledge."

There is a plain-language guide with everything explained and nothing
assumed. Read it if you want the why before the how; it is short.
```

If your employees keep the template's guides in their vaults, point them at [[federation-for-non-git-users]] by name; it is the plain-language walkthrough referenced in the last paragraph.

## Script for a non-technical employee

If you are sitting with someone who is nervous about "git" and "pull requests", say roughly this, in your own words:

> You are getting your own private copy of the company's shared notes. Reading them is completely safe: your assistant copies the latest company knowledge into a folder called `Company/` in your vault, and that folder is read-only, so you can browse it but never accidentally change anything for anyone else. To refresh it, you just ask your assistant for the latest.
>
> Sharing your own notes is separate and comes later. Nothing you write is ever shared unless you deliberately mark it, and even then your assistant checks it for private details and asks you to confirm twice before anything is sent. If you never mark a note, nothing ever leaves your machine. So there is no way to leak something by accident.
>
> The one thing a computer cannot do for you is sign in to GitHub; your assistant will hand you a single sign-in step the first time, you approve it in your browser, and you are done for good on that machine.

That is enough for someone to start. They do not need to understand forks or pull requests to consume knowledge; the [[federation-for-non-git-users]] guide explains those two ideas in a minute each if and when they get curious.

## When someone is ready to contribute

Point them at the same plain-language guide, and let their agent follow the [[federation-contribute]] SOP. The short version you can tell them: "When you have a note worth sharing, say to your assistant: 'What could I contribute to the company?' It will suggest candidates, hold back anything that looks private, show you a clean preview, and ask before it sends anything." Their contribution arrives as a pull request that you (or your reviewers) approve on the company repo. Contributors never merge their own work and never get write access to company `main`; that is by design and covered in [[federation-admin-setup]].

## Where to go next

- New to the whole idea? Start at [[federation-overview]].
- Standing up or maintaining the company brain? [[federation-admin-setup]].
- What employees actually experience, in plain language: [[federation-for-non-git-users]].
