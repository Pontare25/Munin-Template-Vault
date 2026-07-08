import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseNote } from '../okf-lib.mjs';
import {
  loadConfig, TYPE_DEST, checkGh, planGitCommands, runCommands,
} from './fed-lib.mjs';

const norm = (p) => p.split(path.sep).join('/');

// The governance path: propose a change to a SHARED standard (schema or SOP)
// as its own PR against the company repo's AI-OS/. Deliberately separate from
// the knowledge flow so a stray share marker on a personal note can never reach
// the company standard, and so a knowledge note can never land in AI-OS/.
export function planGovernance(root, config = loadConfig(root), { file, rationale = '' } = {}) {
  if (!file) return { ok: false, reason: 'no target file given' };
  const rel = norm(path.isAbsolute(file) ? path.relative(root, file) : file);
  if (!(rel === 'AI-OS' || rel.startsWith('AI-OS/'))) {
    return { ok: false, reason: `governance changes must target AI-OS/ (got ${rel})` };
  }
  const abs = path.join(root, ...rel.split('/'));
  if (!fs.existsSync(abs)) return { ok: false, reason: `file not found: ${rel}` };
  const content = fs.readFileSync(abs, 'utf8');
  try {
    const { data } = parseNote(abs);
    if (data && TYPE_DEST[String(data.type || '').trim()]) {
      return { ok: false, reason: `this looks like a knowledge note (type: ${data.type}); use fed:contribute, not governance` };
    }
  } catch { /* non-frontmatter AI-OS files are fine for governance */ }
  const kind = rel.includes('/Schemas/') ? 'schema' : 'standard';
  return { ok: true, targetRel: rel, file: content, kind, prBody: buildGovernBody(rel, kind, rationale) };
}

export function buildGovernBody(rel, kind, rationale) {
  return [
    `Proposed ${kind} change to \`${rel}\`.`,
    '',
    '## Rationale',
    rationale || '_(fill in why this change is needed)_',
    '',
    '## Compatibility',
    '- Does this make any field newly required or rename/remove one? If so it is a breaking change (`feat!:`) and needs a migration note.',
    '- The shared validator (`okf:validate`) must stay green on the existing company bundle after this change.',
    '',
    '_Opened via the Munin federation governance flow. Label: governance._',
  ].join('\n');
}

export function writeStagedGovernance(plan, cloneRoot) {
  const dest = path.join(cloneRoot, ...plan.targetRel.split('/'));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, plan.file);
}

function parseArgs(argv) {
  const out = { dryRun: argv.includes('--dry-run'), push: argv.includes('--push') || argv.includes('--pr'), pr: argv.includes('--pr') };
  const fi = argv.indexOf('--file'); if (fi !== -1) out.file = argv[fi + 1];
  const ri = argv.indexOf('--rationale'); if (ri !== -1) out.rationale = argv[ri + 1];
  return out;
}

const invokedDirectly = process.argv[1] === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const root = path.resolve('.');
  const config = loadConfig(root);
  const args = parseArgs(process.argv.slice(2));
  const plan = planGovernance(root, config, { file: args.file, rationale: args.rationale });
  if (!plan.ok) { console.error(`Cannot open governance PR: ${plan.reason}`); process.exit(1); }
  console.log(`Governance ${plan.kind} change: ${plan.targetRel}`);

  const cloneRoot = path.resolve(config.clonePath);
  const branch = `govern/${plan.targetRel.replace(/[^\w-]+/g, '-')}-${Date.now().toString().slice(-6)}`;
  const commands = planGitCommands({
    cloneRoot, branch, base: 'main',
    commitMessage: `feat: propose ${plan.kind} change to ${plan.targetRel}`,
    companyRepo: config.companyRepo,
    forkOwner: (config.fork || '').split('/')[0],
    prTitle: `Governance: ${plan.kind} change to ${plan.targetRel}`,
    prBody: plan.prBody,
    push: args.push, pr: args.pr,
  });

  if (args.dryRun) {
    console.log('DRY RUN, nothing written or run. Would run:');
    for (const s of commands) console.log(`  ${s.cmd} ${s.args.join(' ')}   # ${s.desc}`);
    process.exit(0);
  }
  if (args.push || args.pr) {
    const gh = checkGh();
    if (!gh.authed) { console.error(gh.message); process.exit(1); }
  }
  if (!fs.existsSync(cloneRoot)) { console.error(`Fork clone not found at ${cloneRoot}. Run federation setup first.`); process.exit(1); }
  writeStagedGovernance(plan, cloneRoot);
  if (!args.push && !args.pr) { console.log('Staged. Re-run with --push then --pr to open the governance PR.'); process.exit(0); }
  const res = runCommands(commands);
  if (res.failedAt) { console.error(`Step failed: ${res.failedAt.desc}`); process.exit(1); }
  console.log(args.pr ? 'Governance PR opened (label: governance).' : 'Pushed. Re-run with --pr to open the PR.');
}
