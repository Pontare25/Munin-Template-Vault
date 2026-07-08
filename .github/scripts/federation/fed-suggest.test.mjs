import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { suggestCandidates } from './fed-suggest.mjs';
import { DEFAULT_CONFIG } from './fed-lib.mjs';

function tmpVault(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fed-sg-'));
  for (const [name, body] of Object.entries(files)) {
    const full = path.join(dir, name);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  }
  return dir;
}

test('suggests a clean Atlas note, holds back risky ones, ignores non-scope', () => {
  const dir = tmpVault({
    'Atlas/Notes/clean.md': '---\ntype: note\n---\nA tidy idea worth sharing.',
    'Atlas/Notes/risky.md': '---\ntype: note\n---\nreach me at me@example.com',
    'Atlas/Notes/already.md': '---\ntype: note\nshare: company\n---\nalready shared',
    'Efforts/Projects/proj.md': '---\ntype: project\n---\nclient work',
    'Raw/Sources/src.md': '---\ntype: source\n---\ncaptured',
    'Calendar/Daily Notes/2026-07-07.md': '---\ntype: daily\n---\ndear diary',
  });
  const { candidates, heldBack } = suggestCandidates(dir, DEFAULT_CONFIG);
  assert.deepEqual(candidates.map((c) => c.path), ['Atlas/Notes/clean.md']);
  assert.equal(candidates[0].dest, 'Atlas/Notes');
  assert.deepEqual(heldBack.map((h) => h.path), ['Atlas/Notes/risky.md']);
});

test('never suggests from Raw or Calendar even for contributable types', () => {
  const dir = tmpVault({
    'Raw/Notes/wouldbe.md': '---\ntype: note\n---\nlives in Raw',
    'Calendar/Notes/wouldbe.md': '---\ntype: note\n---\nlives in Calendar',
  });
  const { candidates, heldBack } = suggestCandidates(dir, DEFAULT_CONFIG);
  assert.equal(candidates.length, 0);
  assert.equal(heldBack.length, 0);
});
