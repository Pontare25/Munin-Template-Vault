# OKF Conformance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the `Atlas/` knowledge layer a conformant OKF v0.1 bundle that exports on demand, while the vault stays Obsidian-native (wikilinks intact).

**Architecture:** Author natively with wikilinks + OKF-aligned frontmatter and reserved files (`index.md`, `log.md`). A Node ESM exporter reads `Atlas/`, rewrites wikilinks to bundle-relative `/path.md`, normalizes frontmatter to the OKF canonical set, and writes a strict bundle to `dist/okf/`. A validator enforces conformance in CI.

**Tech Stack:** Node ESM (`.mjs`), `gray-matter` (frontmatter), `js-yaml` (emit), Node built-in `node:test` runner. Matches existing `.github/scripts/check-wikilinks.mjs`.

## Global Constraints

- Bundle boundary = `Atlas/` only. Never export Raw/Calendar/Efforts/AI-OS.
- Reserved OKF filenames: `index.md`, `log.md`. All other `.md` = concept docs needing non-empty `type`.
- Every non-reserved `.md` MUST have parseable YAML frontmatter with a non-empty `type`.
- Wikilinks stay native on disk; conversion to `/path.md` happens only in `dist/okf/`.
- OKF canonical URI field is `resource` (not `url`).
- Conventional commits (release-please active): feature work uses `feat:`, docs `docs:`, tooling `chore:`.
- Node scripts live in `.github/scripts/`, ESM, run via `npm run` scripts.
- `dist/` and `node_modules/` are gitignored.

---

### Task 1: Node scaffold + shared OKF library

**Files:**
- Create: `package.json`
- Create: `.github/scripts/okf-lib.mjs`
- Test: `.github/scripts/okf-lib.test.mjs`
- Modify: `.gitignore`

**Interfaces:**
- Produces:
  - `listMarkdown(dir) => string[]` — recursive absolute paths of `*.md`.
  - `RESERVED = new Set(['index.md','log.md'])`.
  - `parseNote(absPath) => { data: object, content: string }` (gray-matter).
  - `buildTitleMap(atlasDir) => Map<string, string>` — key = filename stem (and any `aliases`), value = bundle-relative path like `/Notes/Spaced practice beats cramming.md`.
  - `resolveWikilinks(content, titleMap) => { content: string, warnings: string[] }` — `[[X]]`/`[[X|alias]]` → `[label](/path.md)`; unresolved → plain label text + warning.
  - `stripObsidian(content) => string` — removes `![[...base]]` embeds and `%% ... %%` comments.
  - `toOkf(data, { stem, gitTime }) => object` — normalized frontmatter: `type` (required, passthrough), `title` (data.title || stem), `description`, `resource`, `tags`, `timestamp` (data['created-date'] as ISO, else gitTime), plus passthrough of unknown keys.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "munin-template-vault",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "okf:validate": "node .github/scripts/okf-validate.mjs",
    "okf:export": "node .github/scripts/okf-export.mjs",
    "test": "node --test .github/scripts/"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "js-yaml": "^4.1.0"
  }
}
```

- [ ] **Step 2: Add ignores**

Append to `.gitignore`:

```
# Node + OKF export
node_modules/
dist/
```

- [ ] **Step 3: Install**

Run: `npm install`
Expected: `node_modules/` created, `package-lock.json` written, exit 0.

- [ ] **Step 4: Write the failing test**

`.github/scripts/okf-lib.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveWikilinks, stripObsidian, toOkf } from './okf-lib.mjs';

const map = new Map([
  ['Spaced Repetition', '/Topics/Spaced Repetition.md'],
]);

test('resolveWikilinks rewrites resolved links to bundle-relative paths', () => {
  const { content } = resolveWikilinks('See [[Spaced Repetition]] now.', map);
  assert.equal(content, 'See [Spaced Repetition](/Topics/Spaced Repetition.md) now.');
});

test('resolveWikilinks honors alias and warns on unresolved', () => {
  const r1 = resolveWikilinks('[[Spaced Repetition|spacing]]', map);
  assert.equal(r1.content, '[spacing](/Topics/Spaced Repetition.md)');
  const r2 = resolveWikilinks('[[Nonexistent]]', map);
  assert.equal(r2.content, 'Nonexistent');
  assert.equal(r2.warnings.length, 1);
});

test('stripObsidian removes base embeds and comments', () => {
  assert.equal(stripObsidian('a\n![[Topics.base]]\n%% hi %%\nb').trim(), 'a\n\nb');
});

test('toOkf emits timestamp from created-date and defaults title to stem', () => {
  const out = toOkf({ type: 'note', 'created-date': '2026-01-15' }, { stem: 'My Note', gitTime: '2026-07-07T00:00:00Z' });
  assert.equal(out.type, 'note');
  assert.equal(out.title, 'My Note');
  assert.equal(out.timestamp, '2026-01-15T00:00:00.000Z');
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `node --test .github/scripts/okf-lib.test.mjs`
Expected: FAIL — cannot find module `./okf-lib.mjs`.

- [ ] **Step 6: Implement `okf-lib.mjs`**

```javascript
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const RESERVED = new Set(['index.md', 'log.md']);

export function listMarkdown(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMarkdown(full));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

export function parseNote(absPath) {
  const raw = fs.readFileSync(absPath, 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}

export function buildTitleMap(atlasDir) {
  const map = new Map();
  for (const abs of listMarkdown(atlasDir)) {
    const rel = '/' + path.relative(atlasDir, abs).split(path.sep).join('/');
    const stem = path.basename(abs, '.md');
    if (RESERVED.has(path.basename(abs))) continue;
    map.set(stem, rel);
    const { data } = parseNote(abs);
    for (const a of [].concat(data.aliases || [])) map.set(String(a), rel);
  }
  return map;
}

export function resolveWikilinks(content, titleMap) {
  const warnings = [];
  const out = content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target, alias) => {
    const label = (alias || target).trim();
    const dest = titleMap.get(target.trim());
    if (!dest) { warnings.push(`unresolved wikilink: [[${target.trim()}]]`); return label; }
    return `[${label}](${dest})`;
  });
  return { content: out, warnings };
}

export function stripObsidian(content) {
  return content
    .replace(/!\[\[[^\]]*?\.base\]\]/g, '')
    .replace(/%%[\s\S]*?%%/g, '');
}

export function toOkf(data, { stem, gitTime }) {
  const out = { ...data };
  delete out['created-date'];
  out.type = data.type;
  out.title = data.title || stem;
  if (data.description) out.description = data.description;
  const created = data['created-date'];
  out.timestamp = created ? new Date(`${created}T00:00:00Z`).toISOString() : gitTime;
  return out;
}
```

- [ ] **Step 7: Run test to verify it passes**

Run: `node --test .github/scripts/okf-lib.test.mjs`
Expected: PASS (4 tests).

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json .gitignore .github/scripts/okf-lib.mjs .github/scripts/okf-lib.test.mjs
git commit -m "feat: add OKF export library and node scaffold"
```

---

### Task 2: Conformance validator + CI wiring

**Files:**
- Create: `.github/scripts/okf-validate.mjs`
- Test: `.github/scripts/okf-validate.test.mjs`
- Modify: `.github/workflows/lint.yml`

**Interfaces:**
- Consumes: `listMarkdown`, `parseNote`, `RESERVED` from `okf-lib.mjs`.
- Produces: `validateBundle(atlasDir) => { errors: string[] }`; CLI exits 1 when errors exist.

- [ ] **Step 1: Write the failing test**

`.github/scripts/okf-validate.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { validateBundle } from './okf-validate.mjs';

function tmpBundle(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'okf-'));
  for (const [name, body] of Object.entries(files)) {
    const full = path.join(dir, name);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  }
  return dir;
}

test('passes when every note has non-empty type', () => {
  const dir = tmpBundle({ 'Notes/a.md': '---\ntype: note\n---\nbody' });
  assert.equal(validateBundle(dir).errors.length, 0);
});

test('fails on missing type', () => {
  const dir = tmpBundle({ 'Notes/b.md': '---\ndescription: x\n---\nbody' });
  assert.equal(validateBundle(dir).errors.length, 1);
});

test('ignores reserved index.md and log.md', () => {
  const dir = tmpBundle({ 'index.md': '# Listing', 'log.md': '# Log' });
  assert.equal(validateBundle(dir).errors.length, 0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test .github/scripts/okf-validate.test.mjs`
Expected: FAIL — cannot find module `./okf-validate.mjs`.

- [ ] **Step 3: Implement `okf-validate.mjs`**

```javascript
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { listMarkdown, parseNote, RESERVED } from './okf-lib.mjs';

export function validateBundle(atlasDir) {
  const errors = [];
  for (const abs of listMarkdown(atlasDir)) {
    if (RESERVED.has(path.basename(abs))) continue;
    let data;
    try { ({ data } = parseNote(abs)); }
    catch (e) { errors.push(`${abs}: unparseable frontmatter (${e.message})`); continue; }
    if (!data || typeof data.type !== 'string' || data.type.trim() === '') {
      errors.push(`${abs}: missing or empty required "type"`);
    }
  }
  return { errors };
}

const invokedDirectly = process.argv[1] === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const atlas = path.resolve('Atlas');
  const { errors } = validateBundle(atlas);
  if (errors.length) { console.error(`OKF validation failed:\n- ${errors.join('\n- ')}`); process.exit(1); }
  console.log('OKF validation passed.');
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test .github/scripts/okf-validate.test.mjs`
Expected: PASS (3 tests).

- [ ] **Step 5: Run validator against the real vault**

Run: `npm run okf:validate`
Expected: `OKF validation passed.` (all current Atlas notes carry `type`).

- [ ] **Step 6: Wire into CI**

In `.github/workflows/lint.yml`, after the existing wikilink-check step, add a step (match the file's existing indentation, Node setup, and `working-directory` if any):

```yaml
      - name: Validate OKF conformance
        run: |
          npm ci
          npm run okf:validate
```

If `lint.yml` has no Node setup step, add `actions/setup-node@v4` with `node-version: 20` before this step. Confirm against the file's current structure.

- [ ] **Step 7: Commit**

```bash
git add .github/scripts/okf-validate.mjs .github/scripts/okf-validate.test.mjs .github/workflows/lint.yml
git commit -m "feat: add OKF conformance validator and CI gate"
```

---

### Task 3: Bundle exporter

**Files:**
- Create: `.github/scripts/okf-export.mjs`
- Test: `.github/scripts/okf-export.test.mjs`

**Interfaces:**
- Consumes: all of `okf-lib.mjs`.
- Produces: `exportBundle(atlasDir, outDir) => { warnings: string[] }`; CLI writes `dist/okf/`.

- [ ] **Step 1: Write the failing test**

`.github/scripts/okf-export.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import matter from 'gray-matter';
import { exportBundle } from './okf-export.mjs';

function tmp(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'okf-src-'));
  for (const [name, body] of Object.entries(files)) {
    const full = path.join(dir, name);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  }
  return dir;
}

test('exports concept with rewritten link, stripped comment, timestamp', () => {
  const src = tmp({
    'Topics/Spaced Repetition.md': '---\ntype: topic\ncreated-date: 2026-01-15\n---\n%% #AI %%\nHub.',
    'Notes/a.md': '---\ntype: note\ncreated-date: 2026-01-15\n---\nSee [[Spaced Repetition]].',
  });
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'okf-out-'));
  const { warnings } = exportBundle(src, out);
  assert.equal(warnings.length, 0);
  const noteRaw = fs.readFileSync(path.join(out, 'Notes/a.md'), 'utf8');
  const { data, content } = matter(noteRaw);
  assert.equal(data.timestamp, '2026-01-15T00:00:00.000Z');
  assert.match(content, /\[Spaced Repetition\]\(\/Topics\/Spaced Repetition\.md\)/);
  const topicRaw = fs.readFileSync(path.join(out, 'Topics/Spaced Repetition.md'), 'utf8');
  assert.doesNotMatch(topicRaw, /%%/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test .github/scripts/okf-export.test.mjs`
Expected: FAIL — cannot find module `./okf-export.mjs`.

- [ ] **Step 3: Implement `okf-export.mjs`**

```javascript
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import {
  listMarkdown, parseNote, buildTitleMap, resolveWikilinks,
  stripObsidian, toOkf, RESERVED,
} from './okf-lib.mjs';

export function exportBundle(atlasDir, outDir) {
  const titleMap = buildTitleMap(atlasDir);
  const warnings = [];
  fs.rmSync(outDir, { recursive: true, force: true });
  for (const abs of listMarkdown(atlasDir)) {
    const rel = path.relative(atlasDir, abs);
    const dest = path.join(outDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const base = path.basename(abs);
    const { data, content } = parseNote(abs);
    const stripped = stripObsidian(content);
    const linked = resolveWikilinks(stripped, titleMap);
    warnings.push(...linked.warnings.map((w) => `${rel}: ${w}`));
    if (RESERVED.has(base)) {
      fs.writeFileSync(dest, linked.content.replace(/^\n+/, ''));
      continue;
    }
    const fm = toOkf(data, { stem: path.basename(abs, '.md'), gitTime: new Date().toISOString() });
    const front = yaml.dump(fm, { lineWidth: -1 }).trimEnd();
    fs.writeFileSync(dest, `---\n${front}\n---\n${linked.content.replace(/^\n+/, '')}`);
  }
  return { warnings };
}

const invokedDirectly = process.argv[1] === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const atlas = path.resolve('Atlas');
  const out = path.resolve('dist/okf');
  const { warnings } = exportBundle(atlas, out);
  for (const w of warnings) console.warn(`warn: ${w}`);
  console.log(`Exported OKF bundle to ${out} (${warnings.length} link warning(s)).`);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test .github/scripts/okf-export.test.mjs`
Expected: PASS.

- [ ] **Step 5: Smoke-test against the real vault**

Run: `npm run okf:export`
Expected: `dist/okf/` created mirroring Atlas; message prints link-warning count. Spot-check one exported note: no `[[...]]`, has `timestamp`.

- [ ] **Step 6: Commit**

```bash
git add .github/scripts/okf-export.mjs .github/scripts/okf-export.test.mjs
git commit -m "feat: add OKF bundle exporter"
```

---

### Task 4: Rename Atlas folder notes to index.md

**Files:**
- Rename: every `Atlas/**/README.md` → `Atlas/**/index.md`
- Modify: any file that wikilinks/embeds a renamed note; `.github/scripts/check-wikilinks.mjs` allowlist if it special-cases `README`.

**Interfaces:**
- Consumes: validator from Task 2 (must still pass after rename).

- [ ] **Step 1: Enumerate the folder notes**

Run: `find Atlas -name README.md`
Expected: list includes `Atlas/Notes/README.md`, `Atlas/Topics/README.md`, `Atlas/MOCs/README.md`, `Atlas/Entities/README.md`, `Atlas/Frameworks/README.md` (and `Atlas/README.md` if present).

- [ ] **Step 2: Find inbound references**

Run: `grep -rn "README" Atlas AI-OS System README.md START-HERE.md`
Expected: note any `[[.../README]]`, `![[...README]]`, or relative `](README.md)` links. Most references are by note title (e.g. `[[note-schema]]`), so expect few or none pointing at these READMEs.

- [ ] **Step 3: Rename each file with git**

For each path from Step 1:

```bash
git mv "Atlas/Notes/README.md" "Atlas/Notes/index.md"
git mv "Atlas/Topics/README.md" "Atlas/Topics/index.md"
git mv "Atlas/MOCs/README.md" "Atlas/MOCs/index.md"
git mv "Atlas/Entities/README.md" "Atlas/Entities/index.md"
git mv "Atlas/Frameworks/README.md" "Atlas/Frameworks/index.md"
```

(Include `Atlas/README.md` → `Atlas/index.md` only if it exists.)

- [ ] **Step 4: Fix any references found in Step 2**

For each reference, update the target from `README` to `index` (wikilink) or `index.md` (relative path). If Step 2 found none, skip.

- [ ] **Step 5: Verify**

Run: `npm run okf:validate` — Expected: passes.
Run: `node .github/scripts/check-wikilinks.mjs` (or the CI command from `lint.yml`) — Expected: no broken links.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: adopt OKF reserved index.md for Atlas folder notes"
```

---

### Task 5: OKF frontmatter — schema + source template

**Files:**
- Modify: `AI-OS/Schemas/note-schema.md`
- Modify: `System/Templates/source-capture.md`
- Modify: any note using `url:` in frontmatter (search first)

**Interfaces:** none (documentation + template).

- [ ] **Step 1: Rename the field in the source template**

In `System/Templates/source-capture.md`, change the frontmatter key `url:` to `resource:` (keep it empty; Templater body unchanged).

- [ ] **Step 2: Migrate existing notes using `url:`**

Run: `grep -rln "^url:" Atlas Raw`
For each hit, rename the `url:` key to `resource:`. If none, skip.

- [ ] **Step 3: Extend note-schema.md**

In `AI-OS/Schemas/note-schema.md`, add an "OKF frontmatter" subsection documenting the canonical field set and mapping: `type` (required), `title` (optional, only when display ≠ filename), `description` (SHOULD), `resource` (canonical URI, was `url`), `tags` (optional), `timestamp` (OKF's field; the vault authors `created-date` and the exporter emits `timestamp`). Add a one-line `# Citations` convention (OKF §8) for source-backed notes. Cross-link `[[okf-conformance]]` (created in Task 7).

- [ ] **Step 4: Verify**

Run: `npm run okf:validate` — Expected: passes.
Run: markdownlint per repo config, e.g. `npx markdownlint-cli2 "AI-OS/**/*.md" "System/**/*.md"` — Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add AI-OS/Schemas/note-schema.md System/Templates/source-capture.md Atlas Raw
git commit -m "feat: adopt OKF frontmatter fields (resource, title, timestamp, citations)"
```

---

### Task 6: Changelog (log.md) + SOP hooks

**Files:**
- Create: `Atlas/log.md`
- Modify: `AI-OS/SOPs/ingest.md`, `AI-OS/SOPs/new-note.md`

**Interfaces:** none.

- [ ] **Step 1: Create `Atlas/log.md`**

```markdown
# Log

Changelog for the Atlas knowledge bundle (OKF §7). Newest entries first, ISO 8601 dates. Prefix each line with a conventional action label.

## 2026-07-07

- **Creation** Atlas adopted the OKF v0.1 changelog. New entries append above older dates.
```

- [ ] **Step 2: Add a log step to the ingest SOP**

In `AI-OS/SOPs/ingest.md`, add a step (after notes are created/updated) instructing the AI to append a dated `**Creation**`/`**Update**` line to `Atlas/log.md` describing what changed.

- [ ] **Step 3: Add the same to new-note SOP**

In `AI-OS/SOPs/new-note.md`, add a closing step: append a `**Creation**` line to `Atlas/log.md` for the new note.

- [ ] **Step 4: Verify**

Run: `npm run okf:validate` — Expected: passes (`log.md` is reserved, skipped).
Run: `npm run okf:export` — Expected: `dist/okf/log.md` present with links rewritten.

- [ ] **Step 5: Commit**

```bash
git add Atlas/log.md AI-OS/SOPs/ingest.md AI-OS/SOPs/new-note.md
git commit -m "feat: add OKF changelog (log.md) and SOP append hooks"
```

---

### Task 7: Conformance doc + README + lint SOP

**Files:**
- Create: `AI-OS/Schemas/okf-conformance.md`
- Modify: `README.md`, `AI-OS/SOPs/lint.md`

**Interfaces:** none.

- [ ] **Step 1: Write `AI-OS/Schemas/okf-conformance.md`**

Include: OKF v0.1 conformance claim for the exported `Atlas/` bundle; the field-mapping table from the spec; the native-vs-export split (wikilinks on disk, `/path.md` in `dist/okf/`); reserved files (`index.md`, `log.md`); how to run `npm run okf:validate` and `npm run okf:export`; link to the OKF SPEC. Cross-link `[[note-schema]]`.

- [ ] **Step 2: Update the README OKF credit**

In `README.md`, expand the OKF bullet under "Credits and inspirations" to note the vault now targets OKF v0.1 conformance and link `AI-OS/Schemas/okf-conformance.md`.

- [ ] **Step 3: Add export/validate to the lint SOP**

In `AI-OS/SOPs/lint.md`, add a step to run `npm run okf:validate` (and optionally `npm run okf:export` to refresh the bundle) as part of the lint pass.

- [ ] **Step 4: Verify**

Run: `npx markdownlint-cli2 "AI-OS/**/*.md" "README.md"` — Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add AI-OS/Schemas/okf-conformance.md README.md AI-OS/SOPs/lint.md
git commit -m "docs: document OKF v0.1 conformance and exporter usage"
```

---

### Task 8: Final integration check + CHANGELOG

**Files:**
- Modify: `CHANGELOG.md` (only if the repo hand-maintains it; release-please otherwise generates it — check first)

- [ ] **Step 1: Full test run**

Run: `npm test`
Expected: all `node:test` suites pass.

- [ ] **Step 2: End-to-end export**

Run: `npm run okf:validate && npm run okf:export`
Expected: validation passes; `dist/okf/` regenerated; review printed link warnings (should be zero for the example set).

- [ ] **Step 3: Obsidian sanity**

Confirm the vault still opens in Obsidian with working wikilinks and that `index.md` files render as folder notes. (Manual; Pontus confirms.)

- [ ] **Step 4: CHANGELOG**

If `CHANGELOG.md` is release-please-generated (has a release-please header), do nothing — the `feat:` commits populate it on the next release PR. If hand-maintained, add an entry summarizing OKF conformance.

- [ ] **Step 5: Final commit (if any changes)**

```bash
git add -A
git commit -m "chore: finalize OKF conformance build-out"
```

---

## Self-Review

**Spec coverage:** Bundle boundary (Task 1 constraint + Task 3), index.md (Task 4), OKF frontmatter incl. resource/title/timestamp (Task 5 + lib Task 1), log.md (Task 6), Citations (Task 5), exporter with link rewrite + Obsidian stripping (Task 3), validator + CI (Task 2), conformance doc + README (Task 7), gitignore/package.json (Task 1). All spec sections mapped.

**Placeholder scan:** Code steps carry full code. Doc-edit steps (Tasks 5-7) describe exact content to add rather than pasting full prose files — acceptable because the source-of-truth wording is the spec's mapping table, reproduced there; each step names the exact file, field, and required content.

**Type consistency:** `okf-lib.mjs` exports (`listMarkdown`, `parseNote`, `buildTitleMap`, `resolveWikilinks`, `stripObsidian`, `toOkf`, `RESERVED`) are consumed with identical names in Tasks 2 and 3. `validateBundle` (Task 2) and `exportBundle` (Task 3) signatures match their tests.
