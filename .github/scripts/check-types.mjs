// Zero-dependency OKF `type:` check for the Atlas knowledge layer.
// Every Atlas note must carry a non-empty top-level `type:` in its
// frontmatter. The OKF-reserved index.md and log.md files are exempt:
// they are structural, not typed notes. No npm deps, mirrors the style
// of check-wikilinks.mjs.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative, sep, basename } from "node:path";

const ROOT = process.cwd();
const ATLAS = join(ROOT, "Atlas");
const RESERVED = new Set(["index.md", "log.md"]); // OKF-reserved, untyped

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walk(join(dir, entry.name), out);
    else out.push(join(dir, entry.name));
  }
  return out;
}

// Non-empty top-level `type:` inside the leading --- frontmatter block.
function hasType(text) {
  if (!text.startsWith("---")) return false;
  const lines = text.split(/\r?\n/);
  if (lines[0].trim() !== "---") return false;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") break; // end of frontmatter
    const m = lines[i].match(/^type:\s*(.*)$/);
    if (m) {
      const value = m[1].trim().replace(/^["']|["']$/g, "").trim();
      return value.length > 0;
    }
  }
  return false;
}

if (!existsSync(ATLAS)) {
  console.log("No Atlas/ directory; nothing to check.");
  process.exit(0);
}

let failures = 0;
for (const f of walk(ATLAS).filter((f) => f.endsWith(".md"))) {
  if (RESERVED.has(basename(f))) continue;
  if (!hasType(readFileSync(f, "utf8"))) {
    failures++;
    console.error(`${relative(ROOT, f).split(sep).join("/")}: missing or empty type:`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} Atlas note(s) missing a non-empty type:.`);
  process.exit(1);
}
console.log("All Atlas notes carry a type:.");
