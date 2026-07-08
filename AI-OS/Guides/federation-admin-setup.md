# Guide: Standing Up the Company Brain (Admin Setup)

Audience: the person setting up the shared company knowledge base for a team. This is the one guide that assumes you can find your way around the GitHub website. You do not need to write code, but you do need to be a GitHub repository admin, because several of the steps below are settings only an admin can change.

The company brain is itself a Munin vault, built from this same template. Employees each build their own personal vault from the template too, then connect to the company brain: they pull shared knowledge into a read-only mirror, and they propose their own notes back as pull requests. Nobody but you and your chosen reviewers can change the company brain directly. That protection is not a matter of trust; it is a setting you turn on in step 5, and it is the heart of this whole design.

Related reading: [[federation-overview]] for the big picture, [[federation-rollout]] for onboarding employees once the brain exists, and the plain-language [[federation-for-non-git-users]] for what your employees will experience.

## Before you start

- A GitHub account that can create repositories (a personal account is fine; a GitHub organization is better for a team, because ownership survives any one person leaving).
- Decide, or note as an open question, three things: whether the company repo is private or public, which account or organization owns it, and who the reviewers are. These are the decisions this guide cannot make for you; they are called out again at the end.

## What can and cannot be scripted

Most of federation is automated by the `fed:*` scripts an employee's agent runs. The steps in THIS guide are different: they are one-time GitHub configuration. Steps 1, 3, 5, 6, 7, 8, and the reviews in 9 and 10 happen in the GitHub web interface and cannot be scripted, because they change repository settings and permissions that only a human admin may touch. Steps 2 and 4 are file edits you (or an agent) can make in a local clone. Each step below says which kind it is.

## Steps

### 1. Create the company repo from this template (GitHub UI only)

1. Open this template repository on GitHub.
2. Click the green **Use this template** button, then **Create a new repository**.
3. Choose the owner (your organization, ideally), name it something plain like `company-brain`. Throughout this guide the placeholder `org/company-brain` stands in for whatever you pick.
4. Set visibility. **Private** keeps the knowledge internal; **Public** exposes it to the world. This is a real decision, not a default: pick Private unless you have a reason to publish. See the open questions at the end.
5. Click **Create repository from template**.

Why a template and not a fork: **Use this template** gives you a clean repository with no shared history, which is what you want for the canonical company brain. Employees will fork THIS company repo later; that is a different action, covered in the rollout guide.

### 2. Seed the shared content, empty the personal folders (file edit)

The template ships with example personal content. The company brain should hold only shared material. In a local clone of `org/company-brain`, or directly through the GitHub web editor:

- **Keep and curate:** `Atlas/` (the shared knowledge that employees will pull), `AI-OS/SOPs/` (the shared procedures), and `AI-OS/Schemas/` (the canonical note schema; this is the source of truth every personal vault validates against).
- **Empty the personal folders:** clear out `Calendar/`, `Raw/`, and any personal notes under `Efforts/` and the vault root. These are per-person surfaces and have no place in a shared brain. Leave the folder structure and any `index.md` or `README.md` in place so the layout still reads as a Munin vault.
- Remove the worked example note if the template still carries it.

Why: the company brain is the destination that employee contributions route into, always under `Atlas/`. Shipping personal example content would pollute the shared knowledge and confuse the first pull.

### 3. Enable forking, and set up private access (GitHub UI only)

1. In `org/company-brain`, open **Settings**, then the **General** tab.
2. Under **Features**, make sure **Allow forking** is checked.
3. **If the repo is private, this is not enough.** Forking a private repo also requires an organization owner to turn on the org-level setting: open the organization's **Settings**, then **Member privileges**, and enable **Allow forking of private repositories**. The repo-level checkbox in step 2 is greyed out or ineffective until this org setting is on.

Why: the entire topology is fork-per-employee. Each employee forks the company brain to their own account and opens pull requests from that fork. If forking is off, no employee can contribute.

#### How access works for a private repo

Employees need read access to the company brain before they can fork it, and each one authenticates as themselves. Do not create or hand out shared tokens: a shared secret is hard to revoke, impossible to attribute to a person, and one leak exposes the whole brain.

The recommended model is grant access, then let each person sign in:

1. **Grant read access through a team.** Create an organization team (for example `@org/brain-readers`), give it **Read** on `org/company-brain`, and add employees to that team. Read is enough: they fork and open pull requests, they never push to `main`. A team beats per-person collaborator invites because you add and remove people in one place, and removal instantly revokes access.
2. **Each employee signs in themselves.** During their setup, the employee's agent has them run `gh auth login` (browser sign-in, one time per machine). No secret changes hands; `gh` stores the credential in its own keychain. Every fork and pull request is then attributable to a real GitHub account.
3. **Forks of a private repo stay private.** An employee's fork inherits the private visibility, so nothing about the brain becomes public by forking.

You grant the access here (or per new hire in [[federation-rollout]]); the employee does the sign-in. That split is the point: you control who is in the team, they hold their own credentials.

> Fallback only where browser sign-in cannot run (a locked-down machine, some SAML setups): a per-person fine-grained personal access token, scoped to just this repo, rotated on a schedule, and never committed to any vault. It is still one token per human, never a shared one. Reach for this only if `gh auth login` genuinely cannot complete; the team-plus-sign-in path above is the default.

### 4. Add CODEOWNERS (file edit)

1. Copy [CODEOWNERS.example](../../CODEOWNERS.example) from the repo root to `.github/CODEOWNERS`.
2. Replace the placeholder handles with your real reviewers (see the comments inside the file).

Why: a CODEOWNERS file tells GitHub who must review changes to which paths. Combined with the branch protection in the next step, it means a pull request touching `AI-OS/Schemas/` or `AI-OS/SOPs/` cannot merge without a named owner approving it. This is how you hold the schema and the shared procedures to a higher bar than ordinary knowledge notes.

### 5. Protect `main`, which is what removes write access (GitHub UI only)

This is the most important step. It is what makes "employees never have write access to company main" true.

1. In **Settings**, open **Branches** (or **Rules**, then **Rulesets**, on newer GitHub).
2. Add a branch protection rule (or ruleset) targeting `main`.
3. Turn on:
   - **Require a pull request before merging.** No commit can land on `main` except through a reviewed pull request.
   - **Require approvals** (set at least 1). A pull request needs a human sign-off before it can merge.
   - **Require review from Code Owners.** This activates the CODEOWNERS file from step 4.
   - **Do not allow bypassing the above settings**, and leave force pushes and branch deletions blocked (these are blocked by default under a ruleset; confirm they are).
4. Save.

Why this removes write access: with `main` protected this way, even a collaborator cannot push directly. Everyone, including contributors from forks, must open a pull request, and that pull request must pass review before merge. Employees are never added as collaborators at all; they work from forks and have exactly zero write paths to `main`. The protection rule is the structural guarantee behind the whole "propose, a human accepts" promise your employees read about.

### 6. Create the `governance` label (GitHub UI only)

1. Open the **Issues** tab (or **Pull requests**), then **Labels**, then **New label**.
2. Name it `governance`. Give it a distinct color and a description like "Changes a shared standard: schema or SOP. Higher review bar."

Why: contributions come in two kinds. An ordinary knowledge note routes into `Atlas/` and is reviewed for content and privacy. A change to the schema or a shared SOP travels a separate path (the agent runs `fed:govern`, not `fed:contribute`) and its pull request is labelled `governance`. The label is how you spot, at a glance, a pull request that changes the rules for everyone and therefore deserves the stricter review described in step 10. Create the label before the first governance pull request arrives, because the `fed:govern` flow expects it to exist.

### 7. Confirm Actions and CI run on pull requests (GitHub UI only)

1. Open the **Actions** tab. On a new repository created from a template, GitHub may ask you to confirm before workflows run; approve it.
2. In **Settings**, then **Actions**, then **General**, make sure Actions are allowed and that they are permitted to run on pull requests, including pull requests from forks. For a private repo, "Run workflows from fork pull requests" may be off by default; turn it on so a contributor's pull request actually gets checked.
3. Confirm the workflow `.github/workflows/lint.yml` is present. It runs three checks on every pull request: markdown lint, the broken-wikilink check (`check-wikilinks.mjs`), and OKF conformance (`npm run okf:validate`).

Why: these checks are your automated first reviewer. Before you read a contribution by hand, CI already confirms the note is well-formed, its links resolve, and it conforms to the shared schema. If CI is not running on fork pull requests, you lose that safety net and have to validate every contribution manually.

### 8. Optional: require the checks to pass before merge (GitHub UI only)

Back in the branch protection rule from step 5, you can add **Require status checks to pass before merging** and select the lint job. This makes a red CI run block the merge button outright. Recommended once you have seen the checks run green at least once, so you know the job name to select.

## Reviewing an incoming contribution pull request

When an employee contributes a note, their agent opens a pull request from their fork. You review it on the company repo.

### 9. Ordinary knowledge contribution

The pull request body is auto-generated. It shows: the list of notes being contributed, the contributor, the source paths in their personal vault, a sanitization report (what was stripped: Obsidian comments, `.base` embeds, the `share` marker), and the validation result.

Check, in order:

1. **CI is green.** The lint and OKF checks must pass. If `okf:validate` is red, the note does not conform; request changes rather than fixing it yourself.
2. **No personal data.** Scan the diff for names, email addresses, client identifiers, or anything private that slipped past the risk linter. The linter is a safety net, not a guarantee; you are the final gate. If you find personal data, request changes and ask the contributor to sanitize and re-contribute.
3. **Routing is right.** The note should land under `Atlas/`, in the folder its `type` maps to. A note that landed somewhere else, or outside `Atlas/`, is a red flag.
4. **It belongs.** Is this genuinely shared knowledge, or something personal marked by mistake? Content judgment is yours.

If all four pass, approve and merge (a squash merge keeps the company history clean). If any fail, use **Request changes** with a plain-language note; the contributor's agent walks them through fixing and re-contributing. Employees cannot merge their own pull request; only you and the reviewers can.

### 10. Governance pull request (schema or SOP change), at a higher bar

A pull request carrying the `governance` label changes a shared standard, so hold it to more than the checks above:

1. **CODEOWNERS approval is mandatory.** Because it touches `AI-OS/`, the branch rule requires a code owner to sign off. Do not bypass this.
2. **Compatibility.** The pull request body states the compatibility impact. Confirm the change does not make any schema field newly required, renamed, or removed without a migration. A breaking change should be committed as `feat!:` and must spell out the migration path.
3. **Validator stays green.** `okf:validate` must still pass on the existing company bundle. A schema change that invalidates existing notes is not ready to merge.
4. **Wider review.** A rule change affects everyone; involve whoever owns the standard, not just yourself.

Only merge a governance pull request when the standard genuinely should change for the whole company. When in doubt, a personal-only frontmatter field does NOT need this path at all: the format tolerates unknown keys, so a personal extension travels with a contributed note without any schema change. Governance is for fields and rules that should bind everyone.

## What only you can decide

These need a call from the repo owner and are not documented here because they are yours to make:

- **Private or public** company repo (step 1).
- **Which account or organization** owns `org/company-brain`.
- **Who the reviewers and code owners are** (steps 4 and 5).

Fill those in, and the runbook above takes you from an empty account to a protected, CI-checked company brain ready for the [[federation-rollout]].
