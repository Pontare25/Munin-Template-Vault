---
type: dashboard
date_created: 2026-09-15
summary: Areas-of-responsibility review — every Area with health signals in one sweep. The GTD 20k-ft check the weekly/monthly digest doesn't cover.
---
# Areas of Responsibility — Review

Every Area you're responsible for, in one sweep. Run this monthly (the [[monthly-template|monthly note]] links here). Read the flags top-down, then work the checklist below.

## Project health

Per Area: active projects and any past their due date. 🔴 = no active project **or** something past due · 🟢 = clear.

![[AoR Review.base]]

## Task loops

Areas carrying overdue or unscheduled tasks: task notes whose `up:` is the Area or one of its projects. Overdue = a past due date; needs a due date = no due date (new tasks are scheduled for today by default, so the scheduled date says little). (Counting per Area is a rollup Bases can't do, so this strip is Dataview; the vault-wide view lives in [[Tasks]].)

```dataviewjs
const areas = dv.pages('"Efforts/Areas"').where(p => p.type === "area");
const today = dv.date("today");
const rows = [];
for (const a of areas) {
  // The Area plus every project below it (up: chain: sub-project -> project -> Area).
  const homes = new Set([a.file.path]);
  const allProjs = dv.pages('"Efforts/Projects"').where(p => p.type === "project");
  for (let grew = true; grew; ) {
    grew = false;
    for (const p of allProjs) {
      if (homes.has(p.file.path)) continue;
      if ([].concat(p.up ?? []).some(u => u?.path && homes.has(dv.page(u.path)?.file.path))) { homes.add(p.file.path); grew = true; }
    }
  }
  // TaskNotes tasks whose up: is the Area or a project below it; open statuses only.
  const tasks = dv.pages('"Efforts/TaskNotes/Tasks"')
    .where(t => t.type === "task" && !["done", "dropped"].includes(t.status))
    .where(t => [].concat(t.up ?? []).some(u => u?.path && homes.has(dv.page(u.path)?.file.path)));
  let overdue = 0, noDue = 0;
  for (const t of tasks) {
    const due = t.date_due;
    if (due && dv.date(due) < today) overdue++;
    else if (!due) noDue++;
  }
  if (overdue || noDue) rows.push([a.file.link, overdue || "", noDue || ""]);
}
rows.sort((x, y) => (Number(y[1]) || 0) - (Number(x[1]) || 0));
if (rows.length) dv.table(["Area", "Overdue", "Needs a due date"], rows);
else dv.paragraph("*No overdue or unscheduled tasks in any Area.*");
```
