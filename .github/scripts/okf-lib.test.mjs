import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveWikilinks, stripObsidian, toOkf, sanitizeContent } from './okf-lib.mjs';

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

test('stripObsidian removes base embeds, obsidian and html comments', () => {
  assert.equal(stripObsidian('a\n![[Topics.base]]\n%% hi %%\nb').trim(), 'a\n\nb');
  assert.equal(stripObsidian('x <!-- [[Topic Name]] --> y'), 'x  y');
});

test('toOkf emits timestamp from created-date and defaults title to stem', () => {
  const out = toOkf({ type: 'note', 'created-date': '2026-01-15' }, { stem: 'My Note', gitTime: '2026-07-07T00:00:00Z' });
  assert.equal(out.type, 'note');
  assert.equal(out.title, 'My Note');
  assert.equal(out.timestamp, '2026-01-15T00:00:00.000Z');
});

test('sanitizeContent strips comments, rewrites links, trims leading blank lines', () => {
  const r = sanitizeContent('%% AI %%\n\nSee [[Spaced Repetition]] and [[Missing]].', map);
  assert.equal(r.content, 'See [Spaced Repetition](/Topics/Spaced Repetition.md) and Missing.');
  assert.equal(r.warnings.length, 1);
});
