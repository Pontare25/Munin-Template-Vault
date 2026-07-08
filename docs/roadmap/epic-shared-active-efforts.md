# Epic: Shared Active Efforts (team-collaborative Projects and Areas)

**Status:** Future. Do NOT implement yet. Phase 2, after the LLM wiki federation
pattern is solid.
**Raised by:** repo owner, during federation dry-run review.
**Relates to:** docs/specs/2026-07-07-federation-design.md (the current, knowledge-only federation).

## The gap

Federation today shares only **distilled, permanent knowledge**: notes in
`Atlas/`, contributed one at a time as reviewed pull requests into a read-only
company mirror. That is the LLM wiki pattern, and it is deliberately single-writer
and slow-moving.

Real teams also run **active, collaborative efforts** that the current model does
not serve:

- **Projects** (time-bound, multi-person): several people in a department work
  the same client engagement and all need the live status, the meeting notes, and
  the task assignments. This is shared mutable state, edited by many, changing daily.
- **Areas** (ongoing, cross-project): people working the same company offering, or
  the same kind of client, need shared distilled best practices, playbooks, and a
  CRM-like view of clients and people that encodes how the company and its
  employees actually work.

A consultancy is the motivating case: a department where some share a project
(meeting notes, task assignment, status) and many share offerings and client
patterns (best practices, a shared project-management and CRM surface).

## Why this is a real architecture change, not just more folders

The current federation made four locked decisions that this epic pushes against:

- **Read-only wholesale mirror.** `Company/` is replaced on every pull so conflicts
  are impossible. Active efforts need many writers editing shared state, so a
  read-only mirror cannot be the vehicle; something closer to a shared, mergeable
  workspace is required.
- **Default-deny, company-wide privacy.** Contribution is a note marked
  `share: company` routed to `Atlas/`. Active efforts are **team-scoped**, not
  company-wide, and are shared by default within the team, which inverts the
  privacy default and needs a membership/access model federation does not have.
- **Contribution as a slow PR.** Knowledge contribution is a reviewed, one-at-a-time
  PR. Task assignment and meeting notes need low-friction, near-live collaboration,
  not a maintainer merge per edit.
- **Type routing to `Atlas/`.** Only knowledge types route today. Projects, Areas,
  tasks, and client/person entities are new shared types with their own homes and
  their own sync rules.

So the crux to solve in design later: the multi-writer, team-scoped, mutable,
near-live nature of active efforts is fundamentally different from the
single-writer, company-wide, immutable, review-gated knowledge flow. Do not
assume the knowledge-federation mechanics extend to it unchanged.

## Candidate feature breakdown (for the roadmap board, not commitments)

- **F1: Shared Project spaces.** A project note plus its children (status,
  participants, log) shared across a named team; a defined lifecycle.
- **F2: Shared meeting notes.** Meeting notes attached to a shared project,
  contributed and visible to the whole team, not just the author.
- **F3: Task model with assignment.** Tasks that carry an assignee and status,
  aggregated and synced across the team's vaults.
- **F4: Shared Areas.** Offerings and client-type best practices as a distinct
  shared surface beyond `Atlas/`, with its own routing.
- **F5: Multi-writer sync model.** The hard one: replace or supplement the
  read-only mirror with a team workspace that tolerates concurrent edits. This is
  the central design question the other features depend on.
- **F6: Team membership and access model.** Team-scoped sharing, default-share
  within a team, distinct from company-wide default-deny.
- **F7: CRM-like entity aggregation.** Clients and people as shared entities
  across the org, kept current as engagements evolve.

## Sequencing

1. Finish and prove the LLM wiki federation pattern (current phase).
2. Only then open design on this epic, starting with F5 (the sync model), because
   F1 to F4 cannot be built until the multi-writer question is answered.
