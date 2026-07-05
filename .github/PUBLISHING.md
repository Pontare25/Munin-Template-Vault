# Publishing checklist (maintainer only)

One-time steps to take the repository live, in order:

1. **Push `main`** with all four layers committed. Verify the Lint workflow passes on the push.
2. **Flip visibility to public:** repository Settings, General, Danger Zone, "Change visibility", Public.
3. **Mark as template:** Settings, General, check **Template repository**. This enables the "Use this template" button.
4. **Verify Actions are enabled** for the repository (Settings, Actions, General: allow all actions).
5. **Merge the release PR.** The Release workflow opens a `chore(release): 1.0.0` PR after the first push (the version is pinned via `release-as` in `.github/release-please-config.json`). Merging it tags `v1.0.0` and publishes the release.
6. **Unpin the version:** remove the `"release-as": "1.0.0"` line from `.github/release-please-config.json` (commit as `chore:`). From now on, release-please computes versions from commit types.
7. **Polish the repo page:** add a description ("AI-maintained Obsidian vault template: LLM wiki, idea compass, daily-note-first") and topics (`obsidian`, `obsidian-vault`, `template`, `ai`, `pkm`, `zettelkasten`).
8. **Smoke-test the clone path:** click "Use this template", create a scratch repo, open it in Obsidian, confirm zero errors and that only Templater needs installing. Delete the scratch repo.
