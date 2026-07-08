import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import {
  listMarkdown, parseNote, buildTitleMap, sanitizeContent,
  toOkf, RESERVED,
} from './okf-lib.mjs';

export function exportBundle(atlasDir, outDir) {
  const titleMap = buildTitleMap(atlasDir);
  const warnings = [];
  fs.rmSync(outDir, { recursive: true, force: true });
  for (const abs of listMarkdown(atlasDir)) {
    const rel = path.relative(atlasDir, abs);
    const dest = path.join(outDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const base = path.basename(abs);
    const { data, content } = parseNote(abs);
    const clean = sanitizeContent(content, titleMap);
    warnings.push(...clean.warnings.map((w) => `${rel}: ${w}`));
    if (RESERVED.has(base)) {
      fs.writeFileSync(dest, clean.content);
      continue;
    }
    const fm = toOkf(data, { stem: path.basename(abs, '.md'), gitTime: new Date().toISOString() });
    const front = yaml.dump(fm, { lineWidth: -1 }).trimEnd();
    fs.writeFileSync(dest, `---\n${front}\n---\n${clean.content}`);
  }
  return { warnings };
}

const invokedDirectly = process.argv[1] === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const atlas = path.resolve('Atlas');
  const out = path.resolve('dist/okf');
  const { warnings } = exportBundle(atlas, out);
  for (const w of warnings) console.warn(`warn: ${w}`);
  console.log(`Exported OKF bundle to ${out} (${warnings.length} link warning(s)).`);
}
