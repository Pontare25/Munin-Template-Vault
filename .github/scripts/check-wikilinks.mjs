// Broken-wikilink check for the vault.
// Resolves [[links]] the way Obsidian does: by basename, or by path suffix
// when the link contains a slash. Links inside fenced code blocks, inline
// code, %% comments %%, and <!-- comments --> are ignored, matching what
// Obsidian actually renders.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SKIP_DIRS = new Set([".git", ".obsidian", ".github", "node_modules"]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(join(dir, entry.name), out);
    } else {
      out.push(join(dir, entry.name));
    }
  }
  return out;
}

const files = walk(ROOT);
const targets = new Set();
for (const f of files) {
  const rel = relative(ROOT, f).split(sep).join("/");
  const noExt = rel.replace(/\.(md|base)$/, "");
  if (noExt !== rel) {
    // Obsidian accepts links with or without the extension
    // ([[Note]], [[Note.md]], ![[Dashboard.base]]), by basename or path.
    for (const form of [noExt, rel]) {
      targets.add(form);
      targets.add(form.split("/").pop());
    }
  }
}

function resolves(link) {
  if (targets.has(link)) return true;
  // Path-suffix resolution: [[Skills/README]] matches AI-OS/Skills/README
  for (const t of targets) if (t.endsWith("/" + link)) return true;
  return false;
}

let failures = 0;
for (const f of files.filter((f) => f.endsWith(".md"))) {
  let text = readFileSync(f, "utf8")
    .replace(/```[\s\S]*?```/g, "") // fenced code blocks
    .replace(/`[^`\n]*`/g, "") // inline code
    .replace(/%%[\s\S]*?%%/g, "") // Obsidian comments
    .replace(/<!--[\s\S]*?-->/g, ""); // HTML comments
  for (const m of text.matchAll(/!?\[\[([^\]|#]+)/g)) {
    const link = m[1].trim();
    if (!resolves(link)) {
      failures++;
      console.error(`${relative(ROOT, f)}: broken wikilink [[${link}]]`);
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} broken wikilink(s) found.`);
  process.exit(1);
}
console.log("All wikilinks resolve.");
