// Zero-dependency check of shipped templates under System/Templates/.
// a) Every tracked template has frontmatter (or is allowlisted).
// b) Every frontmatter key is in .obsidian/types.json and in the
//    "## Field registry" table of AI-OS/Schemas/note-schema-reference.md.
// c) Literal `type:` values are in the type table of note-schema.md.
// d) Every ![[X.base#View]] embed in tracked markdown points at an
//    existing base that defines that view.
// Run from the repo root. Exits 1 on any failure.
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { basename } from "node:path";

// Templates that legitimately carry no frontmatter (command scripts,
// startup scripts, body-only snippets). Anything else without it fails.
const NO_FRONTMATTER_ALLOWLIST = [
  "System/Templates/Templater/Commands/log-bullet.md",
  "System/Templates/Templater/Commands/new-task.md",
  "System/Templates/Templater/Commands/promote-note.md",
  "System/Templates/Templater/Commands/close-project.md",
  "System/Templates/Templater/Startup/command-icons.md",
  "System/Templates/Templater/Effort-templates/task-note-template.md",
  "System/Templates/Templater/Sub-templates/Dataview queries/Advanced log template.md",
];

// Delimiters built by concatenation so this source never holds the literal tag.
const OPEN = "<" + "%";
const CLOSE = "%" + ">";
const TEMPLATER = new RegExp(OPEN + "[\\s\\S]*?" + CLOSE, "g");

const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
    .split(/\r?\n/)
    .filter(Boolean);
const read = (p) => readFileSync(p, "utf8").replace(/^﻿/, "");

const errors = [];
const fail = (msg) => errors.push(msg);
const backticked = (s) => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1]);

// ---- reference data ------------------------------------------------------
const typesJson = JSON.parse(read(".obsidian/types.json")).types ?? {};

// First-column cells of the table(s) under a "## " heading.
function registryColumn(text, heading) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((l) => l.trim() === heading);
  if (start === -1) return null;
  const cells = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##?\s/.test(lines[i])) break; // next h1/h2 ends the section
    const m = lines[i].match(/^\|\s*(.*?)\s*\|/);
    if (m) cells.push(m[1]);
  }
  return cells;
}

const refPath = "AI-OS/Schemas/note-schema-reference.md";
let registry = null;
const regCells = registryColumn(read(refPath), "## Field registry");
if (regCells === null) {
  fail(`${refPath}: no "## Field registry" heading found (add the registry table).`);
} else {
  registry = new Set(regCells.flatMap(backticked));
}

// Type table in note-schema.md: first column, backticked values.
const allowedTypes = new Set();
for (const line of read("AI-OS/Schemas/note-schema.md").split(/\r?\n/)) {
  const m = line.match(/^\s*\|\s*(.*?)\s*\|/);
  if (!m) continue;
  const cell = m[1];
  if (/^`daily`\s+to\s+`yearly`$/.test(cell)) {
    for (const t of ["daily", "weekly", "monthly", "quarterly", "yearly"]) allowedTypes.add(t);
  } else if (/^(`[^`]+`)(\s*,\s*`[^`]+`)*$/.test(cell)) {
    // one or more comma-separated backticked values, e.g. `note`, `framework`
    for (const t of backticked(cell)) allowedTypes.add(t);
  }
}
if (allowedTypes.size === 0) fail("AI-OS/Schemas/note-schema.md: no type table found.");

// ---- a/b/c: template frontmatter ----------------------------------------
const templates = git("ls-files", "System/Templates").filter((f) => f.endsWith(".md"));
for (const f of templates) {
  const stripped = read(f).replace(TEMPLATER, "").replace(/^\s+/, "");
  if (!stripped.startsWith("---")) {
    if (!NO_FRONTMATTER_ALLOWLIST.includes(f)) {
      fail(`${f}: no frontmatter and not in the allowlist.`);
    }
    continue;
  }
  const lines = stripped.split(/\r?\n/);
  const end = lines.findIndex((l, i) => i > 0 && l.trim() === "---");
  if (end === -1) {
    fail(`${f}: frontmatter is not closed with ---.`);
    continue;
  }
  const keys = [];
  let typeValue = null;
  for (const line of lines.slice(1, end)) {
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/); // top-level keys only
    if (!m) continue;
    keys.push(m[1]);
    if (m[1] === "type") typeValue = m[2].trim().replace(/^["']|["']$/g, "").trim();
  }
  const noTypes = keys.filter((k) => !(k in typesJson));
  if (noTypes.length) fail(`${f}: key(s) missing from .obsidian/types.json: ${noTypes.join(", ")}`);
  if (registry) {
    const noReg = keys.filter((k) => !registry.has(k));
    if (noReg.length) fail(`${f}: key(s) missing from the Field registry: ${noReg.join(", ")}`);
  }
  // A Templater-generated value is stripped to empty above, so only literals are checked.
  if (typeValue && !allowedTypes.has(typeValue)) {
    fail(`${f}: type "${typeValue}" is not in the note-schema type table.`);
  }
}

// ---- d: embedded Base views ----------------------------------------------
const bases = new Map(); // basename -> [paths]
for (const b of git("ls-files", "*.base")) {
  const k = basename(b);
  bases.set(k, [...(bases.get(k) ?? []), b]);
}
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const seen = new Set();
for (const f of git("ls-files", "*.md")) {
  if (!existsSync(f)) continue;
  // Embeds inside code are documentation examples, not rendered embeds.
  const prose = read(f)
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]*`/g, "");
  for (const m of prose.matchAll(/!\[\[([^\]|#]+\.base)#([^\]|]+)/g)) {
    const base = m[1].trim().split("/").pop();
    const view = m[2].trim();
    const key = `${f}|${base}|${view}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const paths = bases.get(base);
    if (!paths) {
      fail(`${f}: embed ![[${base}#${view}]]: base file not found.`);
      continue;
    }
    const re = new RegExp(`^\\s*(?:-\\s+)?name:\\s*["']?${escapeRe(view)}["']?\\s*$`, "m");
    if (!paths.some((p) => re.test(read(p)))) {
      fail(`${f}: embed ![[${base}#${view}]]: no view named "${view}" in ${paths.join(", ")}.`);
    }
  }
}

if (errors.length) {
  for (const e of errors) console.error(e);
  console.error(`\n${errors.length} template check failure(s).`);
  process.exit(1);
}
console.log(`Template checks passed (${templates.length} templates).`);
