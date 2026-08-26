<!--
  Pull request checklist for improvements to the Munin template itself
  (templates, SOPs, guides, schema, tooling). For ordinary note-taking
  you never open a PR: you just write notes in your own vault.
-->

## What this changes

<!-- One or two lines: what you changed and why. -->

-

## Checklist

- [ ] Markdown lint is green (the Lint workflow runs `.markdownlint.jsonc` rules).
- [ ] No broken wikilinks (`node .github/scripts/check-wikilinks.mjs` from the repo root).
- [ ] If an `Atlas/` note changed, it still carries a non-empty `type:` (OKF conformance).
- [ ] Docs updated if behavior changed (README, START-HERE, or the relevant SOP/guide).
