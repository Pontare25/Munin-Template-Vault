# Federation Cold Dry-Run Prompts

Two self-contained prompts for launching fresh agents with no prior context, to
properly dry-run the federation guides. The earlier single-account run validated
the scripts but not the guides-as-followed-by-a-stranger, and could not test the
real cross-account fork. These two prompts fix both gaps.

Run Prompt A first (an admin standing up an organization company brain), then
Prompt B (a brand-new employee on a separate GitHub account connecting to it).

## Values the human must fill in before launching

Replace every `<...>` placeholder in both prompts:

- `<ORG_NAME>`: the GitHub organization that will own the company brain (for
  example `acme-brain-test`). Creating an organization is a GitHub-UI action;
  do it first at <https://github.com/organizations/plan>.
- `<COMPANY_REPO>`: full name of the company brain, `<ORG_NAME>/company-brain`.
- `<ADMIN_HANDLE>`: the GitHub account that owns/admins the org (runs Prompt A).
- `<EMPLOYEE_HANDLE>`: a SEPARATE GitHub account playing the employee (Prompt B).
  It must not be an owner of `<COMPANY_REPO>`; that separation is the whole point.
- `<REVIEWER_TEAM>`: an org team slug for code owners, for example `standards-owners`.

The admin (Prompt A) must grant `<EMPLOYEE_HANDLE>` read access to the private
company brain before Prompt B runs, or the employee cannot fork it.

---

## Prompt A: Admin, stand up the organization company brain

```text
You are a fresh agent with no prior context. Your job is to stand up a shared
company knowledge base ("company brain") for an organization by following an
existing runbook exactly as written, and to report every point where the
runbook is unclear, wrong, or forces a manual GitHub-UI step. Finding gaps is
part of the job: you are cold-testing the guide, not just executing it.

This is a plain code/git repository, NOT an Obsidian vault. Use normal file
tools plus git and the GitHub CLI (`gh`) with POSIX bash syntax.

Repository (the template you build the company brain from):
  local path:  C:/Users/pontus.nellgard/OneDrive - Ekan AB/Dokument/Github repos/Munin-Template-Vault
  remote:      github.com/Pontare25/Munin-Template-Vault (branch main)

Read these first, in full, before doing anything:
- AI-OS/Guides/federation-admin-setup.md   (THE runbook you are executing)
- AI-OS/Guides/federation-overview.md       (context: the two-repo topology)
- docs/specs/2026-07-07-federation-design.md (the approved architecture)
- CONTRIBUTING.md                            (house style you must obey)

Preconditions to verify and report on, before step 1:
- `gh --version` succeeds. On Windows the binary may be at
  "C:/Program Files/GitHub CLI/gh.exe" and not on PATH; use the full path if so.
- `gh auth status` shows you signed in as <ADMIN_HANDLE> with an account that
  can create repositories and manage settings in the <ORG_NAME> organization.
- The <ORG_NAME> organization already exists (creating an org is GitHub-UI only;
  if it does not exist, stop and report that this is a human step).

Then follow AI-OS/Guides/federation-admin-setup.md end to end against the REAL
org. For each numbered step, state whether it is GitHub-UI-only or scriptable,
and actually perform the scriptable ones:

1. Create the company brain from the template as <COMPANY_REPO>, private, owned
   by <ORG_NAME>. Scriptable:
     gh repo create <COMPANY_REPO> --private --template Pontare25/Munin-Template-Vault
   Confirm the default branch populated (`gh repo view <COMPANY_REPO> --json defaultBranchRef`).
2. Seed shared content and empty personal folders per the guide. Clone the repo,
   remove Calendar/, Raw/, personal Efforts/ and root notes, and the worked
   example; keep Atlas/, AI-OS/SOPs/, AI-OS/Schemas/ and folder scaffolding.
   Commit with a Conventional Commit and push.
3. Enable forking, and for a private repo the org-level "Allow forking of private
   repositories". Report which parts are GitHub-UI-only; verify what you can via
   `gh api`.
4. Copy CODEOWNERS.example to .github/CODEOWNERS, replace placeholders with real
   handles/teams including <REVIEWER_TEAM>, commit and push.
5. Protect main. Try to script it with the branch-protection API, for example:
     gh api -X PUT repos/<COMPANY_REPO>/branches/main/protection \
       -H "Accept: application/vnd.github+json" \
       -f "required_pull_request_reviews[require_code_owner_reviews]=true" \
       -F "required_pull_request_reviews[required_approving_review_count]=1" \
       -F "enforce_admins=true" -F "required_status_checks=null" \
       -F "restrictions=null" -F "allow_force_pushes=false" -F "allow_deletions=false"
   If the API shape differs, report the exact error and fall back to documenting
   the UI clicks. Then PROVE it worked: attempt a direct push to main and confirm
   it is rejected.
6. Create the `governance` label:
     gh label create governance --repo <COMPANY_REPO> \
       --description "Changes a shared standard: schema or SOP. Higher review bar." \
       --color B60205
7. Confirm CI runs: check that .github/workflows/lint.yml exists in the new repo
   and that Actions are enabled, including on fork pull requests. Report anything
   that needed a UI toggle.

Constraints:
- House style: never use the em-dash character or " -- " as an em-dash in prose;
  use colons, commas, or separate sentences. English only.
- Use generic placeholders in any content you commit; no personal or real
  employer data.
- Do NOT modify the federation scripts under .github/scripts/ or any *.test.mjs.

Definition of done (reserve the word "done" for this): <COMPANY_REPO> exists,
private, owned by <ORG_NAME>; main is protected and a direct push is provably
rejected; .github/CODEOWNERS is active; the `governance` label exists; lint CI is
present and enabled. 

Report: the repo URL; a per-step list marking UI-only vs scripted with the exact
commands you ran; proof that the direct push was rejected; and every decision
that needs the repo owner (org visibility, which accounts are reviewers, the
exact <REVIEWER_TEAM> membership). Finally, grant <EMPLOYEE_HANDLE> read access
to <COMPANY_REPO> (org team with Read, or a direct collaborator invite) so the
employee dry-run can proceed, and confirm you did so.
```

---

## Prompt B: New employee on a separate account, connect and contribute

```text
You are a fresh agent with no prior context, acting as the AI assistant for a
brand-new, non-technical employee. The employee has just received a private
Munin vault template and wants to (1) read their company's shared knowledge and
(2) contribute one note back, all without ever hand-running git. Follow the
employee-facing guides exactly, narrate in plain language, and report every
point where a guide is unclear or a step fails. You are cold-testing the guides.

This is a plain code/git repository, NOT an Obsidian vault. Use normal file
tools plus git and `gh` with POSIX bash syntax.

The employee's GitHub account is <EMPLOYEE_HANDLE>. It is a SEPARATE account from
the company brain's owner, so a real fork is possible; testing that real
cross-account fork is the main point of this run.

Company brain to connect to: <COMPANY_REPO> (private; you should already have
been granted read access as <EMPLOYEE_HANDLE>).

Read these first, in full:
- AI-OS/Guides/federation-for-non-git-users.md (the plain-language employee guide)
- AI-OS/Guides/federation-rollout.md            (what the admin told the employee)
- AI-OS/SOPs/federation-setup.md                (the setup procedure you execute)
- AI-OS/SOPs/federation-pull.md
- AI-OS/SOPs/federation-contribute.md

Set up the employee's personal vault:
1. Create the employee's personal vault from the template. For a clean test,
   clone Pontare25/Munin-Template-Vault to a local working directory that is the
   employee's vault. (In real life they would click "Use this template" to make
   their own private repo; note that as the real path.)
2. Confirm the toolchain: `gh --version` (use the full Windows path if not on
   PATH), and have the EMPLOYEE run `gh auth login` themselves as
   <EMPLOYEE_HANDLE> (GitHub.com, HTTPS, browser). You cannot do this interactive
   browser step; instruct them, then verify with
   `gh auth status` showing <EMPLOYEE_HANDLE>.

Follow AI-OS/SOPs/federation-setup.md:
3. Edit AI-OS/federation.json in the employee vault: set
   "companyRepo" to "<COMPANY_REPO>", and "identity" name and handle for
   <EMPLOYEE_HANDLE>. Leave "fork" empty for now.
4. Fork the company brain (REAL cross-account fork):
     gh repo fork <COMPANY_REPO> --clone=false
   Write the resulting fork name (<EMPLOYEE_HANDLE>/<repo>) into
   federation.json "fork".
5. Clone the fork to the configured clonePath (default .federation/company-knowledge),
   then add the company repo as the `upstream` remote:
     git -C <clonePath> remote add upstream https://github.com/<COMPANY_REPO>.git
   Confirm `origin` is the fork and `upstream` is the company brain.

Pull shared knowledge (AI-OS/SOPs/federation-pull.md):
6. Run `npm install` if needed, then `npm run fed:pull`. Confirm a read-only
   Company/ mirror appears in the employee vault and narrate the added/changed
   counts. Do not edit anything inside Company/.

Contribute one note (AI-OS/SOPs/federation-contribute.md), respecting default-deny
privacy and both confirmation gates:
7. Create one personal knowledge note in the vault's Atlas/, give it a shareable
   type (for example `type: note`), add `share: company` to its frontmatter, and
   make sure it contains NO email address, no #private/#confidential tag, and no
   denylisted term. Include one Obsidian %% comment %% and one wikilink so you can
   verify sanitization.
8. Preview: `npm run fed:contribute -- --dry-run --pr`. Read back which note will
   be contributed, where it routes under Atlas/, and the git/gh commands that a
   real run would execute. Confirm nothing was written or pushed.
9. Stage and inspect: `npm run fed:contribute` (no flags). Open the staged copy in
   the clone and confirm the `share` marker is removed, the %% comment is stripped,
   the wikilink is rewritten or downgraded, and provenance fields were added.
10. Confirm-before-push, then confirm-before-PR:
      npm run fed:contribute -- --push
      npm run fed:contribute -- --pr
    The PR must go from the employee's FORK to <COMPANY_REPO> main.
11. Verify: `gh pr list --repo <COMPANY_REPO>` shows the PR; confirm its head is
    <EMPLOYEE_HANDLE>:<branch> (proving the cross-account fork path), and that the
    company repo's lint CI runs and passes on it (`gh pr checks <n> --repo <COMPANY_REPO>`).

Constraints:
- Never push anything the employee has not explicitly confirmed; narrate the two
  gates in plain language.
- House style: no em-dash character, no " -- " as an em-dash in prose. English only.
- Do NOT modify the federation scripts or any *.test.mjs.

Definition of done (reserve "done" for this): a real pull request exists from
<EMPLOYEE_HANDLE>'s fork to <COMPANY_REPO> main, containing exactly the one
sanitized note routed under Atlas/, with the company repo's CI green, opened
without the employee ever typing a git command.

Report: the PR URL; confirmation the head branch is on the employee's fork (not
the company repo), which proves the cross-account topology; the sanitization
diff (what was stripped and rewritten); every guide step that was unclear or
failed; and anything that required a human (the interactive gh sign-in, accepting
the repo invite, or a maintainer merge).
```

---

## After both runs

The admin agent's report plus the employee agent's report together tell you
whether the guides are followable by strangers and whether the real fork
topology works. Fold any "unclear or failed" findings back into the guides and
SOPs, then delete the throwaway org repo and fork.
