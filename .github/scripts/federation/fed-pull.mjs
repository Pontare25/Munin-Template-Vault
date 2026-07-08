import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadConfig, checkGh, defaultRun } from './fed-lib.mjs';

function listFilesRel(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const walk = (d, prefix) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(path.join(d, entry.name), rel);
      else out.push(rel);
    }
  };
  walk(dir, '');
  return out;
}

function snapshot(dir, includes) {
  const map = new Map();
  for (const inc of includes) {
    const base = path.join(dir, ...inc.split('/'));
    for (const rel of listFilesRel(base)) {
      const full = path.join(base, ...rel.split('/'));
      map.set(`${inc}/${rel}`, fs.readFileSync(full, 'utf8'));
    }
  }
  return map;
}

// Wholesale-replaces the read-only mirror from a fetched company checkout.
// Only the configured include paths are copied; anything else in the source is
// ignored. Because the mirror is fully rebuilt, there is never a merge and never
// a conflict. Returns added / changed / removed relative paths for narration.
export function refreshMirror(sourceDir, mirrorDir, includes) {
  const before = snapshot(mirrorDir, includes);
  fs.rmSync(mirrorDir, { recursive: true, force: true });
  for (const inc of includes) {
    const src = path.join(sourceDir, ...inc.split('/'));
    if (!fs.existsSync(src)) continue;
    const dest = path.join(mirrorDir, ...inc.split('/'));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
  }
  const after = snapshot(mirrorDir, includes);
  const added = []; const changed = []; const removed = [];
  for (const [k, v] of after) {
    if (!before.has(k)) added.push(k);
    else if (before.get(k) !== v) changed.push(k);
  }
  for (const k of before.keys()) if (!after.has(k)) removed.push(k);
  return { added: added.sort(), changed: changed.sort(), removed: removed.sort() };
}

// Fetches the company repo into a throwaway temp dir (shallow) so refreshMirror
// can copy from it. Needs gh auth + a configured companyRepo.
function fetchCompany(config, run = defaultRun) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'munin-company-'));
  const url = `https://github.com/${config.companyRepo}.git`;
  const res = run('git', ['clone', '--depth', '1', url, tmp]);
  if (res.status !== 0) throw new Error(`clone failed: ${res.stderr}`);
  return tmp;
}

const invokedDirectly = process.argv[1] === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const root = path.resolve('.');
  const config = loadConfig(root);
  const argv = process.argv.slice(2);
  const fromIdx = argv.indexOf('--from');
  const mirrorDir = path.join(root, config.mirror.folder);
  const includes = config.mirror.include;

  let sourceDir;
  let cleanup = false;
  if (fromIdx !== -1) {
    sourceDir = path.resolve(argv[fromIdx + 1]);          // refresh from a local checkout
  } else {
    if (!config.companyRepo) { console.error('No companyRepo configured. Run federation setup, or pass --from <dir>.'); process.exit(1); }
    const gh = checkGh();
    if (!gh.authed) { console.error(gh.message); process.exit(1); }
    sourceDir = fetchCompany(config); cleanup = true;
  }

  const { added, changed, removed } = refreshMirror(sourceDir, mirrorDir, includes);
  if (cleanup) fs.rmSync(sourceDir, { recursive: true, force: true });
  console.log(`Company mirror refreshed at ${config.mirror.folder}/`);
  console.log(`  added ${added.length}, changed ${changed.length}, removed ${removed.length}`);
  for (const p of changed) console.log(`  ~ ${p}`);
  for (const p of added) console.log(`  + ${p}`);
  for (const p of removed) console.log(`  - ${p}`);
  console.log('This folder is read-only. To build on a company note, copy it into your own Atlas.');
}
