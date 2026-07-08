<!--
  Contribution pull request checklist for the company knowledge base.
  When the agent opens a contribution via `fed:contribute`, it fills the
  body automatically (notes list, contributor, source paths, sanitization
  report, validation result). This template is the checklist a reviewer,
  or a person opening a PR by hand, confirms before requesting review.
  A schema or SOP change is different: use the governance path
  (`fed:govern`) and add the `governance` label instead.
-->

## What this contributes

<!-- The notes being added, and the folders under Atlas/ they route into.
     The auto-generated body lists these; leave them here for the reviewer. -->

- Note(s):
- Routes into: `Atlas/`

## Contributor checklist

- [ ] Every note carries `share: company` and a shareable `type` (note, topic, moc, framework, person, organization).
- [ ] Sanitization confirmed: Obsidian comments, `.base` embeds, and the `share` marker are stripped in the contributed copy.
- [ ] `okf:validate` is green (the Lint workflow confirms this on the PR).
- [ ] No personal data: no names, email addresses, client identifiers, or private asides in the diff.
- [ ] Each contributed note lands under `Atlas/`, in the folder its `type` maps to; nothing lands in `AI-OS/`.
- [ ] This is knowledge, not a rule change. Schema or SOP changes use the governance path, not this template.

## Reviewer notes

<!-- Optional: anything the reviewer should know. Leave blank if nothing. -->
