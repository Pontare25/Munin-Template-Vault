import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import matter from 'gray-matter';
import { planContribution, writeStaged, validateStaged, buildPrBody } from './fed-contribute.mjs';
import { DEFAULT_CONFIG } from './fed-lib.mjs';

const now = '2026-07-07T00:00:00.000Z';
const identity = { name: 'Pat', handle: 'pat' };

function tmpVault(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fed-c-'));
  for (const [name, body] of Object.entries(files)) {
    const full = path.join(dir, name);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  }
  return dir;
}

test('marked note is sanitized, provenance-stamped, and type-routed', () => {
  const dir = tmpVault({
    'Atlas/Topics/Spaced Repetition.md': '---\ntype: topic\n---\nHub.',
    'Efforts/Areas/idea.md': '---\ntype: framework\nshare: company\ncreated-date: 2026-01-15\n---\n%% private aside %%\nBuilds on [[Spaced Repetition]].',
  });
  const { contributions, blocked } = planContribution(dir, DEFAULT_CONFIG, { now, identity });
  assert.equal(blocked.length, 0);
  assert.equal(contributions.length, 1);
  const c = contributions[0];
  assert.equal(c.destRel, 'Atlas/Frameworks/idea.md');           // routed by type, not source folder
  const { data, content } = matter(c.file);
  assert.equal(data.type, 'framework');
  assert.equal(data['contributed-by'], 'Pat');
  assert.equal(data['origin-id'].length, 12);
  assert.equal(data.share, undefined);                            // marker stripped
  assert.equal(data.timestamp, '2026-01-15T00:00:00.000Z');
  assert.doesNotMatch(content, /private aside/);                 // comment stripped
  assert.match(content, /\[Spaced Repetition\]\(\/Topics\/Spaced Repetition\.md\)/); // link rewritten
});

test('unmarked notes are ignored', () => {
  const dir = tmpVault({ 'Atlas/Notes/x.md': '---\ntype: note\n---\nnot shared' });
  assert.equal(planContribution(dir, DEFAULT_CONFIG, { now, identity }).contributions.length, 0);
});

test('marked non-Atlas type is blocked, not contributed', () => {
  const dir = tmpVault({ 'Efforts/Projects/p.md': '---\ntype: project\nshare: company\n---\nclient work' });
  const { contributions, blocked } = planContribution(dir, DEFAULT_CONFIG, { now, identity });
  assert.equal(contributions.length, 0);
  assert.equal(blocked.length, 1);
  assert.match(blocked[0].reason, /not shareable/);
});

test('marked note with a risk signal is blocked even though the marker is present', () => {
  const dir = tmpVault({ 'Atlas/Notes/leak.md': '---\ntype: note\nshare: company\n---\nping me at a@b.com' });
  const { contributions, blocked } = planContribution(dir, DEFAULT_CONFIG, { now, identity });
  assert.equal(contributions.length, 0);
  assert.match(blocked[0].reason, /risk signals/);
});

test('validateStaged catches a typeless staged note', () => {
  const plan = { contributions: [{ destRel: 'Atlas/Notes/x.md', file: '---\ndescription: no type\n---\nbody' }] };
  assert.equal(validateStaged(plan).errors.length, 1);
});

test('writeStaged writes routed files into the clone tree', () => {
  const dir = tmpVault({ 'Atlas/Notes/x.md': '---\ntype: note\nshare: company\n---\nbody' });
  const plan = planContribution(dir, DEFAULT_CONFIG, { now, identity });
  const clone = fs.mkdtempSync(path.join(os.tmpdir(), 'fed-clone-'));
  writeStaged(plan, clone);
  assert.ok(fs.existsSync(path.join(clone, 'Atlas', 'Notes', 'x.md')));
});

test('buildPrBody lists notes, sanitization, and validation sections', () => {
  const plan = { contributions: [{ sourceRel: 'Atlas/Notes/x.md', destRel: 'Atlas/Notes/x.md', title: 'x', warnings: [] }] };
  const body = buildPrBody(plan, { identity });
  assert.match(body, /## Notes/);
  assert.match(body, /## Sanitization/);
  assert.match(body, /## Validation/);
  assert.match(body, /Pat/);
});
