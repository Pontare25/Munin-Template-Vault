// ── CONFIG ──────────────────────────────────────────────────────────────────
// Folders scanned when the "Limited folder search" toggle is on. In this vault
// every log-bearing note (daily, meeting, weekly, work-session) lives under Calendar/.
const LIMITED_FOLDERS = ["Calendar/"];
// Log markers (the "Logs" family from the tasks-and-logs guide), plus "t": task reference lines
// ("- [t] [[task - ...]]") written by New task (Ctrl+Alt+T). Only "t" lines that link a task note
// (or carry the older #task tag) count.
const STATUSES        = ["b", "i", "p", "c", "*", "t"];
const SK              = "advanced-log-search:" + dv.current().file.path;
// Statuses hidden until toggled on (task reference lines are not logs by default).
const DEFAULT_OFF     = new Set(["t"]);

// ── BOOTSTRAP ───────────────────────────────────────────────────────────────
const curLink = dv.current().file.link;
const saved   = (() => { try { return JSON.parse(localStorage.getItem(SK) || "{}"); } catch { return {}; } })();

let searchLimited = saved.searchLimited ?? true;
let sortOrder     = saved.sortOrder     ?? "desc";
const statusState = Object.fromEntries(STATUSES.map(s => [s, saved.statusState?.[s] ?? !DEFAULT_OFF.has(s)]));

// days: [{ day: "YYYY-MM-DD" or "", notes: [{ label, type, rows }] }], notes in time order
let days = [], lastGroups = [];

// ── SAVE ────────────────────────────────────────────────────────────────────
function save() {
  try { localStorage.setItem(SK, JSON.stringify({ searchLimited, sortOrder, statusState, open: details.open,
    searchText: searchIn.value, startDate: startIn.value, endDate: endIn.value })); } catch {}
}

// ── HELPERS ─────────────────────────────────────────────────────────────────
const fileName = path => path.split("/").pop().replace(/\.md$/, "");

function toISO(v) {
  if (!v) return null;
  if (typeof v === "string") { const m = v.match(/^\d{4}-\d{2}-\d{2}/); return m ? m[0] : (d => isNaN(d) ? null : d.toISOString().slice(0,10))(new Date(v)); }
  if (typeof v.toISODate === "function") return v.toISODate();
  if (v instanceof Date) return isNaN(v) ? null : v.toISOString().slice(0,10);
  if (typeof v?.ts === "number") { const d = new Date(v.ts); return isNaN(d) ? null : d.toISOString().slice(0,10); }
  return null;
}

function dateMatch(nd, s, e) {
  if (!s && !e) return true;
  if (!nd) return false;
  if (!s) return nd <= e;
  if (!e) return nd >= s;
  return nd >= s && nd <= e;
}

function plainText(text) {
  return (text || "")
    .replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, t, a) => a ?? t)
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,  (_, t, a) => a ?? t)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[ \t]+/g, " ").trim();
}

// Title of the task note a [t] line links to (frontmatter title, as TaskNotes shows it);
// falls back to the link text without its "task - " filename prefix.
function taskTitle(task) {
  const m = (task.text || "").match(/\[\[([^\]|#]+)/);
  const f = m && app.metadataCache.getFirstLinkpathDest(m[1], task.path);
  const title = f && app.metadataCache.getFileCache(f)?.frontmatter?.title;
  return title ? String(title) : plainText(task.text).replace(/^#task\s+/, "").replace(/^task - /, "");
}

// Task reference line: "[t]" that links a task note, or is tagged #task (older lines).
// Any other [t] line is not a log.
const linksTask = task => (task.outlinks ?? []).some(l => {
  const f = app.metadataCache.getFirstLinkpathDest(l.path, task.path);
  return f && app.metadataCache.getFileCache(f)?.frontmatter?.type === "task";
});
const isTaskRef = task => task.status === "t" && ((task.tags ?? []).includes("#task") || linksTask(task));

// Results minus those nested under another result of the same note; the parent's
// bullets already include them (same as the rendered list).
function topLevel(tasks) {
  const nested = new Set();
  const walk = t => { for (const c of t.children ?? []) { nested.add(c.line); walk(c); } };
  tasks.forEach(walk);
  return tasks.filter(t => !nested.has(t.line));
}

function taskBullets(task, depth = 0) {
  // Task reference lines ([t], from New task) copy as "#task <title>"
  const text = isTaskRef(task) ? "#task " + taskTitle(task) : plainText(task.text);
  const lines = ["  ".repeat(depth) + "- " + text];
  for (const c of task.children ?? []) lines.push(...taskBullets(c, depth + 1));
  return lines;
}

function highlight(el, on) {
  el.style.background  = on ? "color-mix(in srgb, var(--interactive-accent) 12%, transparent)" : "transparent";
  el.style.boxShadow   = on ? "0 0 0 1px color-mix(in srgb, var(--interactive-accent) 28%, transparent)" : "none";
}

// ── CACHE ───────────────────────────────────────────────────────────────────
// Logs reach this note two ways (matches the vault's Dataview rule): the line
// links this note (task.outlinks), or the note declares it as parent (up).
// Logs are grouped by the day the note is about (date, else date_start, else the
// date in the filename), not date_created: a daily note can be written days later.
function buildCache() {
  const byDay = {};
  // Only notes that link this one (inline or in frontmatter) can hold a match.
  let pages = dv.pages("[[" + dv.current().file.path + "]]");
  if (searchLimited) pages = pages.where(p => LIMITED_FOLDERS.some(f => p.file.path.startsWith(f)));

  for (const page of pages) {
    const nd     = toISO(page.Date ?? page.date ?? page.date_start) ?? toISO(page.file.day) ?? "";
    const pageUp = dv.func.contains(page.up ?? page.Projects ?? page.projects, curLink);
    const rows   = [];

    for (const task of page.file?.tasks ?? []) {
      if (!pageUp && !dv.func.contains(task.outlinks, curLink)) continue;
      if (task.status === "t" && !isTaskRef(task)) continue;  // a [t] line without a task link is not a log
      rows.push({ task, status: task.status, lo: (task.text ?? "").toLowerCase() });
    }
    if (!rows.length) continue;
    // The day is already the header, so drop the filename's leading date.
    const name  = fileName(page.file.path);
    const label = page.title ? String(page.title)
      : name.replace(/^\d{4}-\d{2}-\d{2}\s*/, "") || (page.type === "daily" ? "Daily note" : name);
    const ds    = page.date_start;
    const time  = ds?.toFormat ? ds.toFormat("HH:mm") : String(ds ?? "").slice(11, 16);
    const type  = page.type === "daily" ? "" : page.type ?? "";  // "Daily note" already says it
    (byDay[nd] ??= []).push({ label, type, time, rows });
  }
  // Within a day: chronological, notes without a time (daily, weekly) first.
  days = Object.entries(byDay).map(([day, notes]) => ({
    day, notes: notes.sort((a, b) => a.time.localeCompare(b.time) || a.label.localeCompare(b.label)),
  }));
  sortDays();
}

// Undated notes always sort last.
function sortDays() {
  days.sort((a, b) => !a.day - !b.day ||
    (sortOrder === "desc" ? b.day.localeCompare(a.day) : a.day.localeCompare(b.day)));
}

// ── RENDER ──────────────────────────────────────────────────────────────────
function render() {
  results.innerHTML = "";
  lastGroups = [];
  const needle = searchIn.value.toLowerCase().trim();
  const active = new Set(STATUSES.filter(s => statusState[s]));
  const s0 = startIn.value, e0 = endIn.value;
  let count = 0;

  const old = dv.container;
  for (const { day, notes } of days) {
    if (!dateMatch(day, s0, e0)) continue;
    const shown = notes.map(n => ({ ...n, tasks: n.rows.filter(r =>
      active.has(r.status) && (!needle || r.lo.includes(needle))).map(r => r.task) }))
      .filter(n => n.tasks.length);
    if (!shown.length) continue;

    const heading = day ? window.moment(day).format("YYYY-MM-DD · dddd") : "No date";
    lastGroups.push({ heading, notes: shown });
    const daySec = results.createDiv(); daySec.style.marginBottom = "1.1em";
    daySec.createEl("h4", { text: heading }).style.margin = "0 0 .3em";

    for (const n of shown) {
      count += n.tasks.length;
      const sec = daySec.createDiv(); sec.style.cssText = "margin:0 0 .5em .9em";
      const h = sec.createEl("h5", { text: n.label }); h.style.margin = "0 0 .15em";
      if (n.type) h.createSpan({ text: " · " + n.type }).style.cssText = "color:var(--text-muted);font-weight:400;font-size:.85em";
      dv.container = sec;
      dv.taskList(n.tasks, false);
    }
  }
  dv.container = old;

  // Count label
  const base = count + " log" + (count === 1 ? "" : "s");
  countEl.textContent = !s0 && !e0 ? base
    : s0 && e0 ? base + " • " + s0 + " → " + e0
    : s0       ? base + " • since " + s0
    :            base + " • until " + e0;

  // Filter highlights
  const hasDate = !!(s0 || e0);
  highlight(startWrap, hasDate); highlight(endWrap, hasDate);
  highlight(scopeLabel, !scopeCheckbox.checked);
  highlight(searchIn, !!searchIn.value.trim());

  if (!count) {
    const el = results.createDiv({ text: "No matching logs found." });
    el.style.cssText = "color:var(--text-muted);font-style:italic;padding:.35em .1em";
  }
}

// ── COPY ────────────────────────────────────────────────────────────────────
async function doCopy() {
  const text = lastGroups.map(g => "## " + g.heading + "\n\n" + g.notes.map(n =>
    "### " + n.label + "\n" + topLevel(n.tasks).flatMap(t => taskBullets(t)).join("\n")).join("\n\n")).join("\n\n").trim();
  if (!text) { flash("Nothing to copy"); return; }
  try {
    await navigator.clipboard.writeText(text);
    flash("Copied!");
  } catch {
    try {
      const ta = Object.assign(document.createElement("textarea"), { value: text });
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      flash(ok ? "Copied!" : "Copy failed");
    } catch { flash("Copy failed"); }
  }
}
function flash(msg) {
  copyBtn.textContent = msg;
  setTimeout(() => copyBtn.textContent = "Copy results", 1200);
}

// ── VISUAL STATE ────────────────────────────────────────────────────────────
const statusEls = {};
function setStatusVisual(s) {
  const { label } = statusEls[s];
  const on = statusState[s];
  label.style.opacity  = on ? "1" : "0.55";
  label.style.background  = on ? "var(--background-modifier-hover)" : "transparent";
  label.style.border   = on
    ? "1px solid var(--interactive-accent)"
    : "1px solid var(--background-modifier-border)";
  statusEls[s].iconHost.style.filter = on ? "none" : "grayscale(0.35)";
}

// ── BUILD UI ────────────────────────────────────────────────────────────────
// Collapsible via a native <details> built here (NOT an Obsidian callout, which
// breaks interactive dataviewjs in Live Preview). Collapsed by default; the
// open/closed state persists per note.
const details = dv.container.createEl("details");
details.open = saved.open ?? false;
const summary = details.createEl("summary", { text: "Advanced log" });
summary.style.cssText = "cursor:pointer;font-weight:600;color:var(--text-accent);margin:.1em 0 .6em;user-select:none";
details.addEventListener("toggle", () => save());
const wrap   = details.createDiv();
const panel  = wrap.createDiv();
panel.style.cssText = "border:1px solid var(--background-modifier-border);border-radius:.75em;padding:.85em;background:var(--background-secondary);margin-bottom:.9em";

// Row 1: scope + reset
const topRow = panel.createDiv();
topRow.style.cssText = "display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.75em;margin-bottom:.5em";

const scopeLabel = topRow.createEl("label");
scopeLabel.style.cssText = "display:flex;align-items:center;gap:.4em;cursor:pointer;padding:.1em .35em;border-radius:.45em;transition:all 120ms ease";
const scopeCheckbox = scopeLabel.createEl("input", { attr: { type: "checkbox" } });
scopeCheckbox.checked = searchLimited;
scopeLabel.appendText("Limited folder search");

const resetBtn = topRow.createEl("button", { text: "Reset filters" });
resetBtn.style.cssText = "padding:.2em .6em;cursor:pointer";

// Row 2: status toggles
const statusRow = panel.createDiv();
statusRow.style.cssText = "display:flex;flex-wrap:wrap;gap:.45em;align-items:center;margin-bottom:.5em";

function mkBtn(parent, text, fn) {
  const b = parent.createEl("button", { text });
  b.style.cssText = "padding:.15em .5em;cursor:pointer";
  b.addEventListener("click", fn);
  return b;
}

mkBtn(statusRow, "All", () => {
  STATUSES.forEach(s => { statusState[s] = true; statusEls[s].cb.checked = true; setStatusVisual(s); });
  save(); render();
});
mkBtn(statusRow, "None", () => {
  STATUSES.forEach(s => { statusState[s] = false; statusEls[s].cb.checked = false; setStatusVisual(s); });
  save(); render();
});

const STATUS_NAMES = { b: "Log", i: "Information", p: "Positive", c: "Negative", "*": "Highlight", t: "Task reference" };
for (const s of STATUSES) {
  const label = statusRow.createEl("label", { attr: { title: STATUS_NAMES[s] + " [" + s + "]" } });
  label.style.cssText = "display:inline-flex;align-items:center;justify-content:center;cursor:pointer;user-select:none;width:2.1em;height:2.1em;padding:.2em;border-radius:.45em;border:1px solid var(--background-modifier-border);transition:all 120ms ease";

  const cb = label.createEl("input", { attr: { type: "checkbox", "aria-label": STATUS_NAMES[s] + " [" + s + "]" } });
  cb.checked = statusState[s];
  cb.style.cssText = "position:absolute;opacity:0;pointer-events:none;width:0;height:0";

  const iconHost = label.createDiv({ cls: "contains-task-list" });
  iconHost.style.cssText = "display:flex;align-items:center;justify-content:center;margin:0";

  const li = iconHost.createEl("li", { cls: "task-list-item" });
  li.setAttribute("data-task", s);
  li.style.cssText = "list-style:none;display:flex;align-items:center;margin:0;padding:0";

  const fakeBox = li.createEl("input", { attr: { type: "checkbox" }, cls: "task-list-item-checkbox" });
  fakeBox.checked = true; fakeBox.disabled = true; fakeBox.tabIndex = -1;
  fakeBox.style.cssText = "pointer-events:none;margin:0";

  statusEls[s] = { label, cb, iconHost };
  setStatusVisual(s);

  cb.addEventListener("change", () => { statusState[s] = cb.checked; setStatusVisual(s); save(); render(); });
}

// Row 3: dates + sort
const dateRow = panel.createDiv();
dateRow.style.cssText = "display:flex;flex-wrap:wrap;align-items:center;gap:.6em;margin-bottom:.55em";

const startWrap = dateRow.createEl("label", { text: "Start" });
startWrap.style.cssText = "display:flex;align-items:center;gap:.35em;font-size:.95em;padding:.1em .35em;border-radius:.45em;transition:all 120ms ease";
const startIn = startWrap.createEl("input", { attr: { type: "date" } });
startIn.value = saved.startDate ?? "";

const endWrap = dateRow.createEl("label", { text: "End" });
endWrap.style.cssText = "display:flex;align-items:center;gap:.35em;font-size:.95em;padding:.1em .35em;border-radius:.45em;transition:all 120ms ease";
const endIn = endWrap.createEl("input", { attr: { type: "date" } });
endIn.value = saved.endDate ?? "";

mkBtn(dateRow, "Clear dates", () => { startIn.value = ""; endIn.value = ""; save(); render(); });

const sortBtn = dateRow.createEl("button", { text: sortOrder === "desc" ? "Sort: Date ↓" : "Sort: Date ↑" });
sortBtn.style.cssText = "padding:.15em .5em;cursor:pointer";

// Row 4: search + count + copy
const searchRow = panel.createDiv();
searchRow.style.cssText = "display:flex;gap:.75em;align-items:center;flex-wrap:wrap;padding-top:.15em";

const searchIn = searchRow.createEl("input", { attr: { placeholder: "Filter logs..." } });
searchIn.style.cssText = "flex:1 1 20em;max-width:32em;padding:.35em .55em;border-radius:.45em;transition:all 120ms ease";
searchIn.value = saved.searchText ?? "";

const countEl = searchRow.createEl("span", { text: "0 logs" });
countEl.style.cssText = "color:var(--text-muted);font-size:.95em;font-weight:500";

const copyBtn = searchRow.createEl("button", { text: "Copy results" });
copyBtn.style.cssText = "padding:.2em .6em;cursor:pointer";

// Results area
const results = wrap.createDiv();

// ── EVENTS ──────────────────────────────────────────────────────────────────
scopeCheckbox.addEventListener("change", () => { searchLimited = scopeCheckbox.checked; buildCache(); save(); render(); });
sortBtn.addEventListener("click", () => {
  sortOrder = sortOrder === "desc" ? "asc" : "desc";
  sortBtn.textContent = "Sort: Date " + (sortOrder === "desc" ? "↓" : "↑");
  sortDays(); save(); render();
});
startIn.addEventListener("change", () => { save(); render(); });
endIn.addEventListener("change",   () => { save(); render(); });
resetBtn.addEventListener("click", () => {
  searchLimited = true; scopeCheckbox.checked = true;
  sortOrder = "desc"; sortBtn.textContent = "Sort: Date ↓";
  startIn.value = ""; endIn.value = ""; searchIn.value = "";
  STATUSES.forEach(s => { statusState[s] = !DEFAULT_OFF.has(s); statusEls[s].cb.checked = statusState[s]; setStatusVisual(s); });
  buildCache(); save(); render();
});
copyBtn.addEventListener("click", doCopy);

let searchTimer;
searchIn.addEventListener("input", () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { save(); render(); }, 120); });

// ── INIT ──────────────────────────────────────────────────────────────────
buildCache();
render();
