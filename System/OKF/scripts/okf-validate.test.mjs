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
