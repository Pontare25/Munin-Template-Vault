# System/OKF — Open Knowledge Format notes

**You can ignore this entire folder.** Your vault works fully without it. Nothing here touches your notes, your daily workflow, or how Obsidian behaves.

## What OKF is

[Open Knowledge Format (OKF)](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) is Google's spec for representing a knowledge base as plain markdown + YAML frontmatter: readable by humans, parseable by any AI, diffable in git, portable across tools. Your `Atlas/` layer is already built to conform — **natively, with no tooling**. A single required `type:` field plus the reserved `index.md` / `log.md` files are all conformance takes. See [[okf-conformance]] for the details and the field mapping.

## No bundled exporter

Earlier versions shipped a small Node exporter/validator in this folder. It was removed to keep the template plain markdown + Obsidian, with no npm toolchain to maintain. Conformance never depended on it — it only *validated* and *exported*.

If you ever need a portable, tool-agnostic **bundle** (wikilinks rewritten to relative paths, Obsidian syntax stripped), see "Regenerating a bundle" in [[okf-conformance]].
