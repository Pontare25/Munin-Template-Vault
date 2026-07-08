import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import { parseNote, buildTitleMap, sanitizeContent, toOkf } from '../okf-lib.mjs';
import {
  loadConfig, listVaultMarkdown, isShared, riskSignals, destForType,
  stampProvenance, checkGh, planGitCommands, runCommands,
} from './fed-lib.mjs';

const toRel = (root, abs) => path.relative(root, abs).split(path.sep).join('/');

function titleMapFor(root) {
  const atlas = path.join(root, 'Atlas');
  return fs.existsSync(atlas) ? buildTitleMap(atlas) : new Map();
}

// Turns every note explicitly marked `share: company` into a staged company-repo
// copy: sanitized body, OKF-normalized + provenance-stamped frontmatter, routed
// by type into the company Atlas. Notes are blocked (never silently dropped)
// when their type is not shareable knowledge or when a risk signal fires, so a
// human-applied marker can still not push a leak through.
export function planContribution(root, config = loadConfig(root), { now = new Date().toISOString(), identity = config.identity } = {}) {
  const titleMap = titleMapFor(root);
  const contributions = [];
  const blocked = [];
  const marker = config.share.marker;
  for (const abs of listVaultMarkdown(root, ['Company', '.federation'])) {
    let data; let content;
    try { ({ data, content } = parseNote(abs)); } catch { continue; }
    if (!isShared(data, config)) continue;
    const rel = toRel(root, abs);
    const dest = destForType(data?.type);
    if (!dest) { blocked.push({ path: rel, reason: `type "${data?.type ?? '(none)'}" is not shareable knowledge` }); continue; }
    const reasons = riskSignals(data, content, config);
    if (reasons.length) { blocked.push({ path: rel, reason: `risk signals: ${reasons.join('; ')}` }); continue; }

    const clean = sanitizeContent(content, titleMap);
    const stem = path.basename(abs, '.md');
    let fm = toOkf(data, { stem, gitTime: now });
    delete fm[marker];                        // the marker is personal-only
    fm = stampProvenance(fm, { sourceRel: rel, identity, now });
    const front = yaml.dump(fm, { lineWidth: -1 }).trimEnd();
    const file = `---\n${front}\n---\n${clean.content}`;
    contributions.push({
      sourceRel: rel,
      destRel: `${dest}/${path.basename(abs)}`,
      title: fm.title,
      file,
      warnings: clean.warnings,
    });
  }
  return { contributions, blocked };
}

export function writeStaged(plan, cloneRoot) {
  for (const c of plan.contributions) {
    const dest = path.join(cloneRoot, ...c.destRel.split('/'));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, c.file);
  }
}

// Independent re-check of the staged output: every staged note must parse and
// carry a non-empty type. A failure blocks the whole contribution before git.
export function validateStaged(plan) {
  const errors = [];
  for (const c of plan.contributions) {
    let data;
    try { ({ data } = matter(c.file)); }
    catch (e) { errors.push(`${c.destRel}: unparseable (${e.message})`); continue; }
    if (!data || typeof data.type !== 'string' || !data.type.trim()) {
      errors.push(`${c.destRel}: missing type`);
    }
  }
  return { errors };
}

export function buildPrBody(plan, { identity }) {
  const lines = [];
  lines.push(`Contribution from **${identity?.name || identity?.handle || 'a personal Munin vault'}**.`);
  lines.push('');
  lines.push('## Notes');
  for (const c of plan.contributions) lines.push(`- \`${c.sourceRel}\` -> \`${c.destRel}\` (${c.title})`);
  const warns = plan.contributions.flatMap((c) => c.warnings.map((w) => `${c.destRel}: ${w}`));
  lines.push('');
  lines.push('## Sanitization');
  lines.push(warns.length ? warns.map((w) => `- ${w}`).join('\n') : '- Clean: no unresolved links, Obsidian-only syntax stripped.');
  lines.push('');
  lines.push('## Validation');
  lines.push('- `okf:validate` equivalent run on staged copies: passed (every note has a non-empty type).');
  lines.push('');
  lines.push('_Opened by the Munin federation contribution flow. Review and merge at your discretion._');
  return lines.join('\n');
}

function parseFlags(argv) {
  return {
    dryRun: argv.includes('--dry-run'),
    push: argv.includes('--push') || argv.includes('--pr'),
    pr: argv.includes('--pr'),
  };
}

const invokedDirectly = process.argv[1] === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const root = path.resolve('.');
  const config = loadConfig(root);
  const flags = parseFlags(process.argv.slice(2));
  const plan = planContribution(root, config);

  if (!plan.contributions.length) {
    console.log('Nothing to contribute: no notes carry the share marker (or all were blocked).');
    for (const b of plan.blocked) console.log(`  blocked: ${b.path} (${b.reason})`);
    process.exit(0);
  }

  console.log('Planned contribution:');
  for (const c of plan.contributions) console.log(`  ${c.sourceRel} -> ${c.destRel}`);
  for (const b of plan.blocked) console.log(`  blocked: ${b.path} (${b.reason})`);

  const v = validateStaged(plan);
  if (v.errors.length) {
    console.error('Validation failed, nothing pushed:');
    for (const e of v.errors) console.error(`  ${e}`);
    process.exit(1);
  }

  const cloneRoot = path.resolve(config.clonePath);
  const branch = `contribute/${new Date().toISOString().slice(0, 10)}-${plan.contributions.length}-notes`;
  const commands = planGitCommands({
    cloneRoot, branch, base: 'main',
    commitMessage: `feat: contribute ${plan.contributions.length} note(s) to shared knowledge`,
    companyRepo: config.companyRepo,
    forkOwner: (config.fork || '').split('/')[0],
    prTitle: `Contribute ${plan.contributions.length} note(s)`,
    prBody: buildPrBody(plan, config),
    push: flags.push, pr: flags.pr,
  });

  if (flags.dryRun) {
    console.log('\nDRY RUN, nothing written or run. Would run:');
    for (const s of commands) console.log(`  ${s.cmd} ${s.args.join(' ')}   # ${s.desc}`);
    process.exit(0);
  }

  if (flags.push || flags.pr) {
    const gh = checkGh();
    if (!gh.authed) { console.error(gh.message); process.exit(1); }
  }

  if (!fs.existsSync(cloneRoot)) {
    console.error(`Fork clone not found at ${cloneRoot}. Run federation setup first.`);
    process.exit(1);
  }
  writeStaged(plan, cloneRoot);
  console.log(`\nStaged ${plan.contributions.length} note(s) into ${cloneRoot}.`);

  if (!flags.push && !flags.pr) {
    console.log('Preview only. Re-run with --push to push to your fork, or --pr to also open the pull request.');
    process.exit(0);
  }
  const res = runCommands(commands);
  if (res.failedAt) { console.error(`Step failed: ${res.failedAt.desc}`); process.exit(1); }
  console.log(flags.pr ? 'Pull request opened.' : 'Pushed to fork. Re-run with --pr to open the pull request.');
}
