# SOP evals

Evidence that a core SOP actually changes agent behavior. These evals are for template maintainers only. They are never shipped to users' vaults, and vault upgrades never touch `.github/`.

## Layout

One file per core SOP: `.github/evals/<sop-name>.json`, with about five prompts and about five binary assertions each.

```json
{
  "sop": "lint",
  "version": 1,
  "prompts": ["..."],
  "assertions": [{ "id": "short-id", "check": "A yes/no statement about the agent's behavior" }]
}
```

Assertions must be answerable with a plain yes or no from the transcript and the resulting files. Avoid taste judgments such as "writes a good report".

## Running by hand

1. Make a scratch copy of the vault, with a few notes that give each prompt something to find.
2. Give each prompt, one at a time, to a fresh agent session in that copy.
3. For every prompt, answer each assertion yes or no.
4. Record the pass rate (yes answers over total checks) with the date and the SOP version.

Re-run after any change to the SOP and compare with the last recorded rate.

## Role baselines

Baselines per role arrive in Phase 6. Until then, `lint.json` serves as the worked example of the format.
