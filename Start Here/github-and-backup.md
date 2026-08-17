# Guide: GitHub and Backup

Your vault is plain files on one computer. This guide is about making it survive that computer, written for people who write notes, not code.

## Git in one paragraph

Git is a tool that takes snapshots of a folder. Each snapshot (a "commit") records what every file looked like at that moment, so you can look back at or restore any previous state. GitHub is a website that stores a copy of those snapshots online. Together they give you: offsite backup, full history of every note, and sync between machines. Git was built for code, but notes are text files too, and text is what git is best at.

## The honest alternative: Obsidian Sync

If git feels like too much, [Obsidian Sync](https://obsidian.md/sync) (paid, from the makers of Obsidian) syncs and versions your vault across devices with zero setup, including mobile, with end-to-end encryption. It is genuinely good and this template works fine with it. Choose git if you want free, want full history forever, or want the AI to manage backups; choose Sync if you want it to just work. You can also run both.

## Setting up git backup (once)

1. Create a [GitHub](https://github.com) account.
2. Create a new repository: click the plus, "New repository", name it, and set it to **Private** (your notes are nobody's business).
3. Install [GitHub Desktop](https://desktop.github.com) (friendlier than the command line): "Add local repository", choose your vault folder, follow the prompts to publish it to the private repository you made.
4. From then on, backing up is: open GitHub Desktop, write a one-line summary, click "Commit", click "Push". Two clicks and your notes are safe.

If you cloned this template from GitHub, the vault is already a git repository; you only need step 3's publish-to-your-own-private-repo part. Note for cloners: the template's own release workflow files in `.github/workflows/` are for maintaining the template itself; delete them or ignore them, they do nothing without setup.

## Making it automatic

Three levels, pick one:

1. **Manual (recommended to start):** GitHub Desktop, commit and push when you feel like it. Weekly is plenty.
2. **The obsidian-git plugin:** a community plugin that commits and pushes on a timer from inside Obsidian. Works well once git itself is set up.
3. **GitHub Actions:** this template ships a disabled example workflow (`.github/workflows/backup-example.yml.disabled`) that tags a dated restore point of your repository once a week. It cannot see your computer; it only snapshots what you have pushed, so it complements option 1 or 2 rather than replacing them. To enable: remove the `.disabled` suffix, read the comments inside the file, commit and push.

## Asking the AI to do it

If your AI tool can run commands, backup can be delegated: "commit my vault with a summary of what changed". A sensible standing rule (add it to `Me.md` under My additions): the AI proposes a commit at the end of each work session and you approve. Keep the approval step; an AI should not push your notes anywhere without you saying so.

## What not to worry about

- **Merge conflicts:** nearly impossible with one person on one machine. If you edit on two machines, always push after working and pull before starting, and you will be fine.
- **History size:** text is tiny. Decades of notes fit in less space than one phone video.
- **Deleting by accident:** that is exactly what git protects against. Any committed version of any note is recoverable.
