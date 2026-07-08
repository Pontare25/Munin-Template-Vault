import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export const DEFAULT_CONFIG = {
  companyRepo: '',
  fork: '',
  clonePath: '.federation/company-knowledge',
  identity: { name: '', handle: '' },
  mirror: { folder: 'Company', include: ['Atlas', 'AI-OS/SOPs', 'AI-OS/Schemas'] },
  share: {
    marker: 'share',
    value: 'company',
    suggestFrom: ['Atlas', 'Efforts'],
    neverSuggestFrom: ['Raw', 'Calendar', 'AI-OS', 'Company', '.federation'],
    riskSignals: {
      tags: ['private', 'confidential'],
      patterns: ['\\b[\\w.+-]+@[\\w-]+\\.[\\w.-]+\\b'],
      denylist: [],
    },
  },
};

function deepMerge(base, override) {
  if (Array.isArray(override) || override === null || typeof override !== 'object') {
    return override === undefined ? base : override;
  }
  const out = { ...base };
  for (const key of Object.keys(override)) {
    out[key] = deepMerge(base ? base[key] : undefined, override[key]);
  }
  return out;
}

export function loadConfig(root, file = 'AI-OS/federation.json') {
  const abs = path.isAbsolute(file) ? file : path.join(root, file);
  if (!fs.existsSync(abs)) return { ...DEFAULT_CONFIG };
  const raw = JSON.parse(fs.readFileSync(abs, 'utf8'));
  return deepMerge(DEFAULT_CONFIG, raw);
}

// ---------------------------------------------------------------------------
// Type routing (also a privacy gate: non-Atlas types can never be contributed)
// ---------------------------------------------------------------------------

export const TYPE_DEST = {
  note: 'Atlas/Notes',
  topic: 'Atlas/Topics',
  moc: 'Atlas/MOCs',
  framework: 'Atlas/Frameworks',
  person: 'Atlas/Entities',
  organization: 'Atlas/Entities',
};

// Returns the company-repo destination folder for a note type, or null when the
// type is personal/transient and must never be contributed as shared knowledge.
export function destForType(type) {
  return TYPE_DEST[String(type || '').trim()] || null;
}

// ---------------------------------------------------------------------------
// Privacy predicates
// ---------------------------------------------------------------------------

export function isShared(data, config) {
  const { marker, value } = config.share;
  return data != null && String(data[marker] ?? '').trim() === value;
}

// Returns a list of human-readable reasons a note is risky to share. Empty list
// means no signal fired. Checks frontmatter tags, inline #tags, regex patterns
// (email by default), and a configurable denylist of terms.
export function riskSignals(data, content, config) {
  const reasons = [];
  const rs = config.share.riskSignals || {};
  const fmTags = []
    .concat(data?.tags || [])
    .map((t) => String(t).replace(/^#/, '').toLowerCase());
  const inlineTags = (content.match(/(?:^|\s)#([\w/-]+)/g) || [])
    .map((t) => t.trim().replace(/^#/, '').toLowerCase());
  const allTags = new Set([...fmTags, ...inlineTags]);
  for (const tag of rs.tags || []) {
    if (allTags.has(String(tag).toLowerCase())) reasons.push(`risk tag: #${tag}`);
  }
  const haystack = `${JSON.stringify(data ?? {})}\n${content}`;
  for (const pat of rs.patterns || []) {
    if (new RegExp(pat).test(haystack)) reasons.push(`matched pattern: ${pat}`);
  }
  for (const term of rs.denylist || []) {
    if (term && haystack.toLowerCase().includes(String(term).toLowerCase())) {
      reasons.push(`denylisted term: ${term}`);
    }
  }
  return reasons;
}

// ---------------------------------------------------------------------------
// Provenance
// ---------------------------------------------------------------------------

// Stable per-source identifier so re-contributing the same note keeps one id.
export function originId(sourceRel) {
  return crypto.createHash('sha1').update(sourceRel).digest('hex').slice(0, 12);
}

export function stampProvenance(data, { sourceRel, identity, now }) {
  return {
    ...data,
    'contributed-by': identity?.name || identity?.handle || 'unknown',
    'contributed-from': sourceRel,
    'contributed-at': now,
    'origin-id': originId(sourceRel),
  };
}

// ---------------------------------------------------------------------------
// Vault-wide markdown listing (skips machinery + the read-only mirror)
// ---------------------------------------------------------------------------

const ALWAYS_IGNORE = new Set(['.git', 'node_modules', 'dist', '.obsidian']);

export function listVaultMarkdown(root, ignoreDirs = []) {
  const ignore = new Set([...ALWAYS_IGNORE, ...ignoreDirs]);
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (ignore.has(entry.name)) continue;
        walk(path.join(dir, entry.name));
      } else if (entry.name.endsWith('.md')) {
        out.push(path.join(dir, entry.name));
      }
    }
  };
  walk(root);
  return out;
}

// ---------------------------------------------------------------------------
// Command execution (injectable runner so tests never shell out)
// ---------------------------------------------------------------------------

export function defaultRun(cmd, args, opts = {}) {
  try {
    const stdout = execFileSync(cmd, args, { encoding: 'utf8', ...opts });
    return { status: 0, stdout, stderr: '' };
  } catch (e) {
    return { status: e.status ?? 1, stdout: e.stdout?.toString() ?? '', stderr: e.stderr?.toString() ?? e.message };
  }
}

// Detects whether the GitHub CLI is installed and authenticated. Returns a
// structured result with a ready-to-show message instead of throwing, so the
// agent can narrate the fix (gh auth login) in plain language.
export function checkGh(run = defaultRun) {
  const ver = run('gh', ['--version']);
  if (ver.status !== 0) {
    return { installed: false, authed: false, message: 'GitHub CLI (gh) is not installed. Install it from https://cli.github.com/ then run `gh auth login`.' };
  }
  const auth = run('gh', ['auth', 'status']);
  if (auth.status !== 0) {
    return { installed: true, authed: false, message: 'GitHub CLI is installed but not signed in. Run `gh auth login` once, then retry.' };
  }
  return { installed: true, authed: true, message: 'GitHub CLI ready.' };
}

// Builds the ordered git + gh command plan for a contribution. Pure: returns a
// list of { cmd, args, desc } without running anything. The caller decides
// whether to execute (and how far: push vs PR) via runCommands.
export function planGitCommands({
  cloneRoot, branch, commitMessage, base = 'main',
  companyRepo, forkOwner, prTitle, prBody, push, pr,
}) {
  const plan = [];
  const git = (args, desc) => plan.push({ cmd: 'git', args: ['-C', cloneRoot, ...args], desc });
  // origin = the employee's fork; upstream = the company repo (set up at setup time)
  git(['fetch', 'upstream'], 'Fetch latest company state');
  git(['checkout', '-B', branch, `upstream/${base}`], `Start branch ${branch} from upstream/${base}`);
  git(['add', '-A'], 'Stage the sanitized contribution');
  git(['commit', '-m', commitMessage], 'Commit the contribution');
  if (push || pr) {
    git(['push', '-u', 'origin', branch, '--force-with-lease'], 'Push the branch to your fork');
  }
  if (pr) {
    const head = forkOwner ? `${forkOwner}:${branch}` : branch;
    plan.push({
      cmd: 'gh',
      args: ['pr', 'create', '--repo', companyRepo, '--base', base, '--head', head,
        '--title', prTitle, '--body', prBody],
      desc: 'Open the pull request against the company repo',
    });
  }
  return plan;
}

// Executes (or, in dry-run, just returns) a command plan sequentially. Stops on
// the first non-zero exit and reports which step failed.
export function runCommands(plan, { dryRun = false, run = defaultRun } = {}) {
  if (dryRun) return { dryRun: true, plan, results: [] };
  const results = [];
  for (const step of plan) {
    const res = run(step.cmd, step.args);
    results.push({ ...step, status: res.status, stderr: res.stderr });
    if (res.status !== 0) return { dryRun: false, plan, results, failedAt: step };
  }
  return { dryRun: false, plan, results };
}
