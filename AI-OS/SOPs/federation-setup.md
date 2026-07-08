# SOP: Federation Setup

One-time setup that connects this personal vault to a company knowledge base so it can pull shared knowledge and contribute notes back. Run once per machine. The agent narrates every step; the user never types git.

**Trigger:** the user says "connect to the company vault", "set up federation", "join the company knowledge base", or first runs any `fed:*` command before setup exists.

## Prerequisites

- `AI-OS/federation.json` filled in: `companyRepo` (like `org/company-knowledge`), the user's GitHub `identity.name` and `handle`.
- Node dependencies installed (`npm install`).

## Steps

1. **Check the GitHub CLI.** Run `node .github/scripts/federation/fed-lib.mjs` is not a CLI; instead any `fed:*` command reports auth state. Run `gh --version`. If missing, tell the user to install it from https://cli.github.com/ and stop.
2. **Sign in (interactive, one time).** Have the user run `gh auth login` and choose GitHub.com, HTTPS, and browser login. This is the one step that cannot be automated: it opens a browser for the user to approve. Confirm with `gh auth status`.
3. **Fork the company repo.** Run `gh repo fork <companyRepo> --clone=false`. This creates the user's personal fork (`<handle>/<repo>`) on GitHub with no local clone yet. Write the fork name into `federation.json` `fork`.
4. **Clone the fork to the managed location.** Clone `<handle>/<repo>` into `federation.json` `clonePath` (default `.federation/company-knowledge`). On Windows, warn if the vault lives inside OneDrive: a live `.git` there can be corrupted by sync. If so, set `clonePath` to a location outside OneDrive and re-run.
5. **Add the company as `upstream`.** In the clone: `git remote add upstream https://github.com/<companyRepo>.git`. `origin` stays the fork. Contributions branch from `upstream/main` and push to `origin`.
6. **First pull.** Run the [[federation-pull]] SOP to populate `Company/`.
7. **Confirm.** `npm run fed:suggest` should run without error and list share-candidates. Setup is done.

## Judgment calls

- If the user has no company repo yet, that repo must be created first (it is itself a Munin template instance). Setup cannot complete without it.
- Never store the user's GitHub token anywhere in the vault. `gh` manages credentials in its own keychain.
