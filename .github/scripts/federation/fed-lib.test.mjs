import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  DEFAULT_CONFIG, loadConfig, destForType, isShared, riskSignals,
  originId, stampProvenance, listVaultMarkdown, checkGh,
  planGitCommands, runCommands,
} from './fed-lib.mjs';

const cfg = DEFAULT_CONFIG;

function tmpTree(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fed-'));
  for (const [name, body] of Object.entries(files)) {
    const full = path.join(dir, name);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  }
  return dir;
}

test('destForType routes Atlas types and blocks personal types', () => {
  assert.equal(destForType('note'), 'Atlas/Notes');
  assert.equal(destForType('framework'), 'Atlas/Frameworks');
  assert.equal(destForType('organization'), 'Atlas/Entities');
  assert.equal(destForType('project'), null);
  assert.equal(destForType('daily'), null);
  assert.equal(destForType(''), null);
});

test('isShared honors the configured marker and value', () => {
  assert.equal(isShared({ share: 'company' }, cfg), true);
  assert.equal(isShared({ share: 'private' }, cfg), false);
  assert.equal(isShared({}, cfg), false);
  assert.equal(isShared(null, cfg), false);
});

test('riskSignals flags email, risk tag, denylist; passes clean notes', () => {
  assert.deepEqual(riskSignals({ type: 'note' }, 'plain body', cfg), []);
  assert.ok(riskSignals({ type: 'note' }, 'contact me at a@b.com', cfg).length >= 1);
  assert.ok(riskSignals({ type: 'note', tags: ['private'] }, 'body', cfg).length >= 1);
  assert.ok(riskSignals({ type: 'note' }, 'has #confidential inline', cfg).length >= 1);
  const withDeny = { ...cfg, share: { ...cfg.share, riskSignals: { ...cfg.share.riskSignals, denylist: ['AcmeCorp'] } } };
  assert.ok(riskSignals({ type: 'note' }, 'about acmecorp deal', withDeny).length >= 1);
});

test('originId is stable and stampProvenance injects the four fields', () => {
  assert.equal(originId('Atlas/Notes/x.md'), originId('Atlas/Notes/x.md'));
  assert.notEqual(originId('Atlas/Notes/x.md'), originId('Atlas/Notes/y.md'));
  const out = stampProvenance({ type: 'note' }, {
    sourceRel: 'Atlas/Notes/x.md', identity: { name: 'Pat' }, now: '2026-07-07T00:00:00.000Z',
  });
  assert.equal(out['contributed-by'], 'Pat');
  assert.equal(out['contributed-from'], 'Atlas/Notes/x.md');
  assert.equal(out['contributed-at'], '2026-07-07T00:00:00.000Z');
  assert.equal(out['origin-id'], originId('Atlas/Notes/x.md'));
  assert.equal(out.type, 'note');
});

test('listVaultMarkdown collects notes but skips machinery and mirror', () => {
  const dir = tmpTree({
    'Atlas/Notes/a.md': 'x',
    'Efforts/b.md': 'x',
    'Company/Atlas/c.md': 'x',
    'node_modules/pkg/d.md': 'x',
    '.git/e.md': 'x',
  });
  const found = listVaultMarkdown(dir, ['Company', '.federation']).map((p) => path.basename(p)).sort();
  assert.deepEqual(found, ['a.md', 'b.md']);
});

test('loadConfig merges overrides onto defaults', () => {
  const dir = tmpTree({ 'AI-OS/federation.json': JSON.stringify({ companyRepo: 'org/kb', identity: { name: 'Pat' } }) });
  const loaded = loadConfig(dir);
  assert.equal(loaded.companyRepo, 'org/kb');
  assert.equal(loaded.identity.name, 'Pat');
  assert.equal(loaded.share.marker, 'share'); // default preserved
});

test('checkGh reports installed/authed states via an injectable runner', () => {
  const authed = checkGh(() => ({ status: 0, stdout: '', stderr: '' }));
  assert.equal(authed.authed, true);
  const noGh = checkGh((c) => c === 'gh' ? { status: 1, stdout: '', stderr: 'not found' } : { status: 0 });
  assert.equal(noGh.installed, false);
  const noAuth = checkGh((c, a) => a[0] === '--version' ? { status: 0 } : { status: 1, stderr: 'not logged in' });
  assert.equal(noAuth.installed, true);
  assert.equal(noAuth.authed, false);
  assert.match(noAuth.message, /gh auth login/);
});

test('planGitCommands gates push and PR behind their flags', () => {
  const previewOnly = planGitCommands({ cloneRoot: '/c', branch: 'b', commitMessage: 'm' });
  assert.equal(previewOnly.some((s) => s.args.includes('push')), false);
  assert.equal(previewOnly.some((s) => s.cmd === 'gh'), false);

  const pushed = planGitCommands({ cloneRoot: '/c', branch: 'b', commitMessage: 'm', push: true });
  assert.equal(pushed.some((s) => s.args.includes('push')), true);
  assert.equal(pushed.some((s) => s.cmd === 'gh'), false);

  const pr = planGitCommands({
    cloneRoot: '/c', branch: 'b', commitMessage: 'm', pr: true,
    companyRepo: 'org/kb', forkOwner: 'pat', prTitle: 't', prBody: 'body',
  });
  const ghStep = pr.find((s) => s.cmd === 'gh');
  assert.ok(ghStep);
  assert.deepEqual(ghStep.args.slice(0, 3), ['pr', 'create', '--repo']);
  assert.ok(ghStep.args.includes('pat:b'));
});

test('runCommands dry-run returns the plan without executing', () => {
  let calls = 0;
  const plan = [{ cmd: 'git', args: ['status'], desc: 'x' }];
  const res = runCommands(plan, { dryRun: true, run: () => { calls++; return { status: 0 }; } });
  assert.equal(res.dryRun, true);
  assert.equal(calls, 0);
  assert.equal(res.plan.length, 1);
});

test('runCommands stops at the first failing step', () => {
  const plan = [
    { cmd: 'git', args: ['a'], desc: '1' },
    { cmd: 'git', args: ['b'], desc: '2' },
    { cmd: 'git', args: ['c'], desc: '3' },
  ];
  const res = runCommands(plan, {
    run: (c, a) => a[0] === 'b' ? { status: 1, stderr: 'boom' } : { status: 0, stderr: '' },
  });
  assert.ok(res.failedAt);
  assert.equal(res.failedAt.desc, '2');
  assert.equal(res.results.length, 2);
});
