import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const RESERVED = new Set(['index.md', 'log.md']);

export function listMarkdown(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMarkdown(full));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

export function parseNote(absPath) {
  const raw = fs.readFileSync(absPath, 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}

export function buildTitleMap(atlasDir) {
  const map = new Map();
  for (const abs of listMarkdown(atlasDir)) {
    if (RESERVED.has(path.basename(abs))) continue;
    const rel = '/' + path.relative(atlasDir, abs).split(path.sep).join('/');
    const stem = path.basename(abs, '.md');
    map.set(stem, rel);
    const { data } = parseNote(abs);
    for (const a of [].concat(data.aliases || [])) map.set(String(a), rel);
  }
  return map;
}

export function resolveWikilinks(content, titleMap) {
  const warnings = [];
  const out = content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target, alias) => {
    const label = (alias || target).trim();
    const dest = titleMap.get(target.trim());
    if (!dest) { warnings.push(`unresolved wikilink: [[${target.trim()}]]`); return label; }
    return `[${label}](${dest})`;
  });
  return { content: out, warnings };
}

export function stripObsidian(content) {
  return content
    .replace(/!\[\[[^\]]*?\.base\]\]/g, '')
    .replace(/%%[\s\S]*?%%/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\n{3,}/g, '\n\n');
}

export function toOkf(data, { stem, gitTime }) {
  const out = { ...data };
  delete out['created-date'];
  out.type = data.type;
  out.title = data.title || stem;
  if (data.description) out.description = data.description;
  const created = data['created-date'];
  if (created instanceof Date) out.timestamp = created.toISOString();
  else if (typeof created === 'string' && created.trim()) out.timestamp = new Date(`${created}T00:00:00Z`).toISOString();
  else out.timestamp = gitTime;
  return out;
}
