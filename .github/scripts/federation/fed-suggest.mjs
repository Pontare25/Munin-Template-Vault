import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseNote } from '../okf-lib.mjs';
import { loadConfig, listVaultMarkdown, isShared, riskSignals, destForType } from './fed-lib.mjs';

const toRel = (root, abs) => path.relative(root, abs).split(path.sep).join('/');
const inSuggestScope = (rel, suggestFrom) =>
  suggestFrom.some((f) => rel === f || rel.startsWith(`${f}/`));

// Proposes notes worth sharing without ever writing a marker. Confined to the
// configured suggestFrom folders; neverSuggestFrom folders are skipped at the
// listing level. Already-shared notes and non-contributable types drop out;
// risk-signal notes are held back with reasons rather than suggested.
export function suggestCandidates(root, config = loadConfig(root)) {
  const candidates = [];
  const heldBack = [];
  const notes = listVaultMarkdown(root, config.share.neverSuggestFrom);
  for (const abs of notes) {
    const rel = toRel(root, abs);
    if (!inSuggestScope(rel, config.share.suggestFrom)) continue;
    let data; let content;
    try { ({ data, content } = parseNote(abs)); } catch { continue; }
    if (isShared(data, config)) continue;                 // already opted in
    const dest = destForType(data?.type);
    if (!dest) continue;                                  // not shareable knowledge
    const reasons = riskSignals(data, content, config);
    if (reasons.length) { heldBack.push({ path: rel, reasons }); continue; }
    candidates.push({ path: rel, type: data.type, dest });
  }
  return { candidates, heldBack };
}

function report({ candidates, heldBack }, config) {
  const lines = [];
  const { marker, value } = config.share;
  lines.push(`Share candidates (add \`${marker}: ${value}\` to opt in):`);
  if (!candidates.length) lines.push('  (none)');
  for (const c of candidates) lines.push(`  ${c.path}  [${c.type} -> ${c.dest}]`);
  if (heldBack.length) {
    lines.push('');
    lines.push('Held back (looked shareable, but risk signals fired):');
    for (const h of heldBack) lines.push(`  ${h.path}  (${h.reasons.join('; ')})`);
  }
  return lines.join('\n');
}

const invokedDirectly = process.argv[1] === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const root = path.resolve('.');
  const config = loadConfig(root);
  console.log(report(suggestCandidates(root, config), config));
}
