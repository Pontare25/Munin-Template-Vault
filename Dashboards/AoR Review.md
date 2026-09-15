---
type: dashboard
created-date: 2026-09-15
summary: Areas-of-responsibility review — every Area with health signals in one sweep. The GTD 20k-ft check the weekly/monthly digest doesn't cover.
---
# Areas of Responsibility — Review

Every Area you're responsible for, in one sweep, with health signals. Run this monthly (the [[monthly-template|monthly note]] links here). Read the flags top-down, then work the checklist below.

**Flags:** 🔴 needs attention (neglected, overdue, or stalled) · 🟡 unscheduled loops only · 🟢 clear. Rows sort worst-first.

```dataviewjs
// ── CONFIG ──────────────────────────────────────────────────────────────────
const STALE_DAYS    = 21;   // active project not updated in this many days = stalled
const QUIET_DAYS    = 45;   // Area untouched this long = quiet (⚠)
const OPEN_STATUSES = ["active", "simmering"];

// ── HELPERS ──────────────────────────────────────────────────────────────────
const NOW = Date.now();
const DAY = 86400000;

function toMs(v) {
  if (v == null) return null;
  if (typeof v.toMillis === "function") return v.toMillis();
  if (typeof v.ts === "number") return v.ts;
  if (v instanceof Date) return isNaN(v) ? null : v.getTime();
  if (typeof v === "string") { const t = Date.parse(v); return isNaN(t) ? null : t; }
  return null;
}
const ageDays = ms => ms == null ? null : Math.floor((NOW - ms) / DAY);
const links   = v => v == null ? [] : (Array.isArray(v) ? v : [v]);
// freshness of a note: its declared `updated`, else the file's last-modified time
const freshMs = p => toMs(p.updated) ?? toMs(p.file.mtime);

// ── LOAD ─────────────────────────────────────────────────────────────────────
const areas    = dv.pages('"Efforts/Areas"').where(p => p.type === "area");
const projects = dv.pages('"Efforts/Projects"').where(p => p.type === "project");

const areaByPath = {};
for (const a of areas) areaByPath[a.file.path] = a;

// Resolve which Area(s) a project rolls up to: its own `related`, else follow the
// `up:` chain to the root project and use that project's `related`.
function projectAreas(p, seen = new Set()) {
  if (seen.has(p.file.path)) return [];
  seen.add(p.file.path);
  const out = [];
  for (const l of links(p.related)) {
    const t = dv.page(l);
    if (t && t.type === "area") out.push(t.file.path);
  }
  if (out.length) return out;
  for (const l of links(p.up)) {
    const par = dv.page(l);
    if (par && par.type === "project") out.push(...projectAreas(par, seen));
  }
  return out;
}

// Map Area path -> its member projects
const membersByArea = {};
for (const a of areas) membersByArea[a.file.path] = [];
for (const p of projects) {
  for (const ap of new Set(projectAreas(p))) {
    if (membersByArea[ap]) membersByArea[ap].push(p);
  }
}

// Count open tasks in a note by category
function taskCounts(page) {
  let overdue = 0, needsSched = 0;
  for (const t of page.file?.tasks ?? []) {
    if (t.completed) continue;
    const due = toMs(t.due), sched = toMs(t.scheduled), start = toMs(t.start);
    if (due != null && due < NOW) overdue++;
    if (due == null && sched == null && start == null) needsSched++;
  }
  return { overdue, needsSched };
}

// ── BUILD ROWS ───────────────────────────────────────────────────────────────
const rows = [];
for (const a of areas) {
  const members = membersByArea[a.file.path] ?? [];
  const open    = members.filter(p => OPEN_STATUSES.includes(p.status));
  const stalled = open.filter(p => { const f = freshMs(p); return f != null && ageDays(f) > STALE_DAYS; });

  let overdue = 0, needsSched = 0;
  for (const p of [a, ...members]) { const c = taskCounts(p); overdue += c.overdue; needsSched += c.needsSched; }

  // last touched = most recent freshness across the Area note and its projects
  const touchMs = Math.max(freshMs(a) ?? 0, ...members.map(freshMs).filter(x => x != null), 0);
  const touchAge = touchMs ? ageDays(touchMs) : null;
  const quiet = touchAge != null && touchAge > QUIET_DAYS;

  let flag, sev;
  if ((open.length === 0 && quiet) || overdue > 0 || stalled.length > 0) { flag = "🔴"; sev = 0; }
  else if (needsSched > 0) { flag = "🟡"; sev = 1; }
  else { flag = "🟢"; sev = 2; }

  rows.push({
    sev, touchAge,
    cells: [
      flag,
      a.file.link,
      open.length,
      stalled.length || "",
      overdue || "",
      needsSched || "",
      touchAge == null ? "—" : `${touchAge}d${quiet ? " ⚠" : ""}`,
    ],
  });
}

// worst first, then most-stale first
rows.sort((x, y) => x.sev - y.sev || (y.touchAge ?? -1) - (x.touchAge ?? -1));

if (rows.length) {
  dv.table(["", "Area", "Open", "Stalled", "Overdue", "Needs sched", "Last touched"], rows.map(r => r.cells));
} else {
  dv.paragraph("*No Areas found in `Efforts/Areas`. Create an Area note (`type: area`) to see it here.*");
}
```
