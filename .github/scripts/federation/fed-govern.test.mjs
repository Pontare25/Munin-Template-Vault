import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { planGovernance } from './fed-govern.mjs';
import { DEFAULT_CONFIG } from './fed-lib.mjs';

function tmpVault(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fed-g-'));
  for (const [name, body] of Object.entries(files)) {
    const full = path.join(dir, name);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  }
  return dir;
}

test('accepts a schema change under AI-OS and builds a governance body', () => {
  const dir = tmpVault({ 'AI-OS/Schemas/note-schema.md': '# Note Schema\nnew rule' });
  const plan = planGovernance(dir, DEFAULT_CONFIG, { file: 'AI-OS/Schemas/note-schema.md', rationale: 'add a field' });
  assert.equal(plan.ok, true);
  assert.equal(plan.kind, 'schema');
  assert.match(plan.prBody, /Compatibility/);
  assert.match(plan.prBody, /add a field/);
});

test('refuses a file outside AI-OS', () => {
  const dir = tmpVault({ 'Atlas/Notes/x.md': '---\ntype: note\n---\nx' });
  const plan = planGovernance(dir, DEFAULT_CONFIG, { file: 'Atlas/Notes/x.md' });
  assert.equal(plan.ok, false);
  assert.match(plan.reason, /must target AI-OS/);
});

test('refuses a knowledge note even if placed under AI-OS', () => {
  const dir = tmpVault({ 'AI-OS/stray.md': '---\ntype: note\n---\nknowledge, not a standard' });
  const plan = planGovernance(dir, DEFAULT_CONFIG, { file: 'AI-OS/stray.md' });
  assert.equal(plan.ok, false);
  assert.match(plan.reason, /knowledge note/);
});
