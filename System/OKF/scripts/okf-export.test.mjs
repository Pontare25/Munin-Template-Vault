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
