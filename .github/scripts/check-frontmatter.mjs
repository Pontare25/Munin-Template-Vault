// Zero-dependency frontmatter check: no colon inside a text value.
// An unquoted `summary: a: b` breaks the YAML and Obsidian drops the
// note's properties; the note schema forbids a colon in any text value,
// quoted or not. Dates, times and URLs keep their colons. Templater
// lines (with a tag opener) are skipped: they are evaluated, not parsed.
// No npm deps, mirrors the style of check-types.mjs.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SKIP_DIRS = new Set([".git", ".obsidian", "node_modules", ".trash"]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(join(dir, entry.name), out);
    } else if (entry.name.endsWith(".md")) out.push(join(dir, entry.name));
  }
  return out;
}

const DATE = /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})?)?$/;

function badValue(raw) {
  let v = raw.trim();
  if (v.startsWith("#")) return false; // comment
  v = v.replace(/^["']|["']$/g, "").trim();
  if (!v.includes(":")) return false;
  if (DATE.test(v)) return false;
  if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(v)) return false; // time
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(v)) return false; // URL
  if (/^\[\[[^\]]*\]\]$/.test(v)) return false; // a lone wikilink
  return true;
}

function check(text) {
  const lines = text.split(/\r?\n/);
  if (lines[0].trim() !== "---") return [];
  const hits = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "---") break;
    if (line.includes("<%")) continue;
    let m = line.match(/^[A-Za-z0-9_-]+:\s+(\S.*)$/);
    // List items; a `- key: value` item is a mapping (TaskNotes blockedBy), not text.
    if (!m && !/^\s+-\s+[A-Za-z0-9_-]+:\s/.test(line)) m = line.match(/^\s+-\s+(\S.*)$/);
    if (m && badValue(m[1])) hits.push(`${i + 1}: ${line.trim()}`);
  }
  return hits;
}

let failures = 0;
for (const f of walk(ROOT)) {
  for (const hit of check(readFileSync(f, "utf8"))) {
    failures++;
    console.error(`${relative(ROOT, f).split(sep).join("/")}:${hit}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} frontmatter value(s) contain a colon. Rephrase with a comma, semicolon or a new sentence.`);
  process.exit(1);
}
console.log("No colons inside frontmatter text values.");
