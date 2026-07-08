import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { refreshMirror } from './fed-pull.mjs';

function tmpTree(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fed-p-'));
  for (const [name, body] of Object.entries(files)) {
    const full = path.join(dir, name);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  }
  return dir;
}

const includes = ['Atlas', 'AI-OS/SOPs'];

test('mirror reflects included paths and ignores everything else', () => {
  const src = tmpTree({
    'Atlas/Notes/a.md': 'A',
    'AI-OS/SOPs/lint.md': 'lint',
    'AI-OS/Me.md': 'personal, not included',
    'Efforts/secret.md': 'not included',
  });
  const mirror = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'fed-m-')), 'Company');
  const res = refreshMirror(src, mirror, includes);
  assert.ok(fs.existsSync(path.join(mirror, 'Atlas', 'Notes', 'a.md')));
  assert.ok(fs.existsSync(path.join(mirror, 'AI-OS', 'SOPs', 'lint.md')));
  assert.ok(!fs.existsSync(path.join(mirror, 'AI-OS', 'Me.md')));
  assert.ok(!fs.existsSync(path.join(mirror, 'Efforts')));
  assert.equal(res.added.length, 2);
});

test('wholesale refresh removes files deleted upstream and reports changes', () => {
  const mirrorParent = fs.mkdtempSync(path.join(os.tmpdir(), 'fed-m2-'));
  const mirror = path.join(mirrorParent, 'Company');

  const v1 = tmpTree({ 'Atlas/Notes/a.md': 'A1', 'Atlas/Notes/b.md': 'B' });
  refreshMirror(v1, mirror, includes);

  const v2 = tmpTree({ 'Atlas/Notes/a.md': 'A2' }); // b.md removed upstream, a.md changed
  const res = refreshMirror(v2, mirror, includes);

  assert.ok(!fs.existsSync(path.join(mirror, 'Atlas', 'Notes', 'b.md')));
  assert.deepEqual(res.changed, ['Atlas/Notes/a.md']);
  assert.deepEqual(res.removed, ['Atlas/Notes/b.md']);
});
