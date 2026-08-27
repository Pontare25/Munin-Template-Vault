# Guide: GitHub and Backup

Your vault is plain files on one computer. This guide is about making it survive that computer, written for people who write notes, not code.

## Git in one paragraph

Git is a tool that takes snapshots of a folder. Each snapshot (a "commit") records what every file looked like at that moment, so you can look back at or restore any previous state. GitHub is a website that stores a copy of those snapshots online. Together they give you: offsite backup, full history of every note, and sync between machines. Git was built for code, but code is text files too, and text is what git is best at.

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

## Git on mobile

This gets a bit trickier. The author of the Git plugin has himself said that the plugin is unstable on mobile. 
There are several alternatives, but I personally use Working Copy [‎Git client - Working Copy App - App Store](https://apps.apple.com/us/app/git-client-working-copy/id896694807) which works on iPhone. It does require you to make a one-time purchase which includes all updates for a year.
This guided walkthrough is a bit outdated but explains how to set it up: [Sync Obsidian using Working Copy and GitHub](https://www.youtube.com/watch?v=akW57xD_EKg&t=213s&pp=ygUVd29ya2luZyBjb3B5IG9ic2lkaWFu "Sync Obsidian using Working Copy and GitHub")
Note that if you use this app on mobile you need to disable the git plugin on your phone (the plugin allows for device detection) allowing you to still use it on your desktop. 

If you are new to Git, I would recommend you use one of the standard synchronization methods, either Obsidian Sync or iCloud, however I do not know how version control works on these.