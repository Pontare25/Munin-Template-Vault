import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { listMarkdown, parseNote, RESERVED } from './okf-lib.mjs';

export function validateBundle(atlasDir) {
  const errors = [];
  for (const abs of listMarkdown(atlasDir)) {
    if (RESERVED.has(path.basename(abs))) continue;
    let data;
    try { ({ data } = parseNote(abs)); }
    catch (e) { errors.push(`${abs}: unparseable frontmatter (${e.message})`); continue; }
    if (!data || typeof data.type !== 'string' || data.type.trim() === '') {
      errors.push(`${abs}: missing or empty required "type"`);
    }
  }
  return { errors };
}

const invokedDirectly = process.argv[1] === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const atlas = path.resolve('Atlas');
  const { errors } = validateBundle(atlas);
  if (errors.length) { console.error(`OKF validation failed:\n- ${errors.join('\n- ')}`); process.exit(1); }
  console.log('OKF validation passed.');
}
